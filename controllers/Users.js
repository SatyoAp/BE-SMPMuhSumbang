import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  findUsersById,
  removeUsersById,
  updateUsersById,
} from "../services/ServUsers.js";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const users = await findUsersById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "users tidak found" });
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Passsword tidak sesuai" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // const refreshToken = jwt.sign(
    //   { userId, name, email },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   {
    //     expiresIn: "1d",
    //   }
    // );
    // await Users.update(
    //   { refresh_token: refreshToken },
    //   {
    //     where: {
    //       id: userId,
    //     },
    //   }
    // );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure: true,
    // });
    res.json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(404).json({ msg: "Email Salah...!!" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const deleteUsersById = async (req, res, next) => {
  try {
    await removeUsersById(req.params.id);
    res.status(200).json({
      message: "Data Berhasil dihapus",
    });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const putUsersById = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await updateUsersById(req.params.id, name, email, password);
    const Users = await findUsersById(req.params.id);
    res.json(Users);
  } catch (error) {
    console.log(error);
  }
};

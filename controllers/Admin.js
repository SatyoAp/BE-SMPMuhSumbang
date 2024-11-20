import Admin from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  findAdminById,
  removeAdminById,
  updateAdminById,
} from "../services/ServAdmin.js";

dotenv.config();

export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      attributes: ["id", "name", "email"],
    });
    res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await findAdminById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "admin tidak tersedia" });
    }
    res.json(admin);
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
    await Admin.create({
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
    const admin = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password Salah" });
    const adminId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { adminId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { adminId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Admin.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: adminId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email Salah...!!" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const admin = await Admin.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!admin[0]) return res.sendStatus(204);
  const adminId = admin[0].id;
  await Admin.update(
    { refresh_token: null },
    {
      where: {
        id: adminId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

export const deleteAdminById = async (req, res, next) => {
  try {
    await removeAdminById(req.params.id);
    res.status(200).json({
      message: "Data Berhasil dihapus",
    });
  } catch (e) {
    console.error("Error deleting kritik:", e);
    next(e);
  }
};

export const putAdminById = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await updateAdminById(req.params.id, name, email, password);
    const Admin = await findAdminById(req.params.id);
    res.json(Admin);
  } catch (error) {
    console.log(error);
  }
};

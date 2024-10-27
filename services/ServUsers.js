import Users from "../model/usersModel.js";

export const findUsersById = async (id) => {
  return await Users.findOne({
    where: { id },
  });
};

export const removeUsersById = async (id) => {
  await Users.destroy({
    where: { id },
  });
};

export const updateUsersById = async (id, name, email, password) => {
  return await Users.update(
    {
      name,
      email,
      password,
    },
    {
      where: { id },
    }
  );
};

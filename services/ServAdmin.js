import Admin from "../model/adminModel.js";

export const findAdminById = async (id) => {
  return await Admin.findOne({
    where: { id },
  });
};

export const removeAdminById = async (id) => {
  await Admin.destroy({
    where: { id },
  });
};

export const updateAdminById = async (id, name, email, password) => {
  return await Admin.update(
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

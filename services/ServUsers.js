import Users from "../model/usersModel.js";

export const findUsersById = async (id) => {
  return await Users.findOne({
    where: { id },
  });
};

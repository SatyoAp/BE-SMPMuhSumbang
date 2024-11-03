import Kritik from "../model/kritikModel.js";

export const findKritikById = async (id) => {
  return await Kritik.findOne({
    where: { id },
  });
};

export const removeKritikById = async (id) => {
  await Kritik.destroy({
    where: { id },
  });
};

export const updateKritikById = async (id, nama, email, kritik) => {
  return await Kritik.update(
    {
      nama,
      email,
      kritik,
    },
    {
      where: { id },
    }
  );
};

export const createKritik = async (nama, email, kritik) => {
  await Kritik.create({
    nama,
    email,
    kritik,
  });
};

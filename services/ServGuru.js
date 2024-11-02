import Guru from "../model/guruModel.js";

export const findGuruById = async (id_guru) => {
  return await Guru.findOne({
    where: { id_guru },
  });
};

export const removeGuruById = async (id_guru) => {
  await Guru.destroy({
    where: { id_guru },
  });
};

export const updateGuruById = async (
  id_guru,
  nama,
  jabatan,
  no_hp,
  email,
  mapel
) => {
  return await Guru.update(
    {
      nama,
      jabatan,
      no_hp,
      email,
      mapel,
    },
    {
      where: { id_guru },
    }
  );
};

export const createGuru = async (nama, jabatan, no_hp, email, mapel) => {
  await Guru.create({
    nama,
    jabatan,
    no_hp,
    email,
    mapel,
  });
};

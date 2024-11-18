import Pendaftaran from "../model/pendaftaranModel.js";

export const findPendaftaranById = async (id) => {
  return await Pendaftaran.findOne({
    where: { id },
  });
};

export const removePendaftaranById = async (id) => {
  await Pendaftaran.destroy({
    where: { id },
  });
};

export const updatePendaftaranById = async (
  id,
  nama,
  tempat_lahir,
  tanggal_lahir,
  nama_ortu,
  alamat,
  no_hp,
  nik,
  jenis_kelamin,
  asal_sekolah,
  nilai_IPA,
  nilai_Matematika,
  nilai_Bhs_Indonesia,
  nilai_rata_rata,
  status,
  image,
  url
) => {
  return await Pendaftaran.update(
    {
      nama,
      tempat_lahir,
      tanggal_lahir,
      nama_ortu,
      alamat,
      no_hp,
      nik,
      jenis_kelamin,
      asal_sekolah,
      nilai_IPA,
      nilai_Matematika,
      nilai_Bhs_Indonesia,
      nilai_rata_rata,
      status,
      image,
      url,
    },
    {
      where: { id },
    }
  );
};

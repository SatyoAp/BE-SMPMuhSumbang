import Pendaftaran from "../model/pendaftaranModel.js";

export const getPendaftaran = async (req, res) => {
  try {
    const pendaftaran = await Pendaftaran.findAll();
    res.json(pendaftaran);
  } catch (error) {
    console.log(error);
  }
};

export const postPendaftaran = async (req, res) => {
  const {
    nama,
    tempat_lahir,
    tanggal_lahir,
    nama_ortu,
    alamat,
    no_hp,
    nik,
    asal_sekolah,
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    total,
  } = req.body;
  try {
    await Pendaftaran.create({
      nama,
      tempat_lahir,
      tanggal_lahir,
      nama_ortu,
      alamat,
      no_hp,
      nik,
      asal_sekolah,
      nilai_IPA,
      nilai_Matematika,
      nilai_Bhs_Indonesia,
      total,
    });
    res.json({ msg: "Input Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

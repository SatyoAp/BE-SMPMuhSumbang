import Nilai from "../model/nilaiModel.js";
import {
  createNilai,
  findNilaiById,
  removeNilaiById,
  updateNilaiById,
} from "../services/ServNilai.js";

export const getNilai = async (req, res) => {
  try {
    const nilai = await Nilai.findAll();
    res.json(nilai);
  } catch (error) {
    console.log(error);
  }
};

export const getNilaiById = async (req, res) => {
  try {
    const nilai = await findNilaiById(req.params.id_nilai);
    if (!nilai) {
      return res.status(404).json({ message: "nilai not found" });
    }
    res.json(nilai);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNilaiById = async (req, res, next) => {
  try {
    await removeNilaiById(req.params.id_nilai);
    res.json({
      message: httpStatusMessages[res.statusCode],
    });
  } catch (e) {
    next(e);
    res.json({ msg: "Data Berhasil di Hapus" });
  }
};

export const postNilai = async (req, res) => {
  const { nilai_IPA, nilai_Matematika, nilai_Bhs_Indonesia, rata_rata_nilai } =
    req.body;
  const nilai = await createNilai(
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    rata_rata_nilai
  );
  res.json(nilai);
};

export const putNilaiById = async (req, res) => {
  const { nilai_IPA, nilai_Matematika, nilai_Bhs_Indonesia, rata_rata_nilai } =
    req.body;
  await updateNilaiById(
    req.params.id_nilai,
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    rata_rata_nilai
  );
  const nilai = await findNilaiById(req.params.id_nilai);
  res.json(nilai);
};

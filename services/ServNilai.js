import Nilai from "../model/nilaiModel.js";

export const findNilaiById = async (id_nilai) => {
  return await Nilai.findOne({
    where: { id_nilai },
  });
};

export const removeNilaiById = async (id_nilai) => {
  await Nilai.destroy({
    where: { id_nilai },
  });
};

export const updateNilaiById = async (
  id_nilai,
  nilai_IPA,
  nilai_Matematika,
  nilai_Bhs_Indonesia,
  rata_rata_nilai
) => {
  return await Nilai.update(
    {
      nilai_IPA,
      nilai_Matematika,
      nilai_Bhs_Indonesia,
      rata_rata_nilai,
    },
    {
      where: { id_nilai },
    }
  );
};

export const createNilai = async (
  nilai_IPA,
  nilai_Matematika,
  nilai_Bhs_Indonesia,
  rata_rata_nilai
) => {
  await Nilai.create({
    nilai_IPA,
    nilai_Matematika,
    nilai_Bhs_Indonesia,
    rata_rata_nilai,
  });
};

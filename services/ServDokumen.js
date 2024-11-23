// services/dokumenService.js
import Dokumen from "../model/dokumenModel.js";

export const findDokumenById = async (id) => {
  return await Dokumen.findOne({
    where: { id },
  });
};

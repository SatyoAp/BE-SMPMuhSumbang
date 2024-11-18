import Pendaftaran from "../model/pendaftaranModel.js";
import {
  findPendaftaranById,
  removePendaftaranById,
  updatePendaftaranById,
} from "../services/ServPendaftaran.js";
import path from "path";
import fs from "fs";

export const getPendaftaran = async (req, res) => {
  try {
    const pendaftaran = await Pendaftaran.findAll();
    res.json(pendaftaran);
  } catch (error) {
    console.log(error);
  }
};

export const getPendaftaranById = async (req, res) => {
  try {
    const daftar = await findPendaftaranById(req.params.id);
    if (!daftar) {
      return res.status(404).json({ message: "Data tidak ada" });
    }
    res.json(daftar);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const postPendaftaran = async (req, res) => {
//   const {
//     nama,
//     tempat_lahir,
//     tanggal_lahir,
//     nama_ortu,
//     alamat,
//     no_hp,
//     nik,
//     jenis_kelamin,
//     asal_sekolah,
//     nilai_IPA,
//     nilai_Matematika,
//     nilai_Bhs_Indonesia,
//     nilai_rata_rata,
//     status,
//   } = req.body;
//   const allowedType = [".png", ".jpg", ".jpeg", ".pdf"];
//   const maxFileSize = 5000000; // 5 MB
//   const images = [];
//   const urls = [];

//   // Loop untuk memeriksa file dari file1 hingga file5
//   for (let i = 1; i <= 5; i++) {
//     const files = req.files[`file${i}`]; // Mengambil file berdasarkan nama field
//     const fileSize = files.size;
//     const ext = path.extname(files.originalname);
//     const fileName = files.md5 + ext; // Ganti dengan cara penamaan yang diinginkan
//     const Url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

//     // Validasi tipe file dan ukuran
//     if (!allowedType.includes(ext.toLowerCase())) {
//       return res.status(422).json({ msg: `Salah Extensi file untuk file${i}` });
//     }
//     if (fileSize > maxFileSize) {
//       return res.status(422).json({ msg: `File maksimal 5 MB untuk file${i}` });
//     }

//     // Pindahkan file ke direktori yang diinginkan
//     await files.mv(`./public/images/${fileName}`); // Ganti dengan direktori yang sesuai

//     // Simpan nama file dan URL
//     images.push(fileName);
//     urls.push(Url);
//   }

//   // Simpan data ke database
//   try {
//     await Pendaftaran.create({
//       nama,
//       tempat_lahir,
//       tanggal_lahir,
//       nama_ortu,
//       alamat,
//       no_hp,
//       nik,
//       jenis_kelamin,
//       asal_sekolah,
//       nilai_IPA,
//       nilai_Matematika,
//       nilai_Bhs_Indonesia,
//       nilai_rata_rata,
//       status,
//       image_1: images[0] || null,
//       url_1: urls[0] || null,
//       image_2: images[1] || null,
//       url_2: urls[1] || null,
//       image_3: images[2] || null,
//       url_3: urls[2] || null,
//       image_4: images[3] || null,
//       url_4: urls[3] || null,
//       image_5: images[4] || null,
//       url_5: urls[4] || null,
//     });
//     res.json({ msg: "Pendaftaran Berhasil" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: "Terjadi kesalahan saat menyimpan data" });
//   }
// };

export const postPendaftaran = async (req, res) => {
  const {
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
  } = req.body;

  if (req.file === null)
    return res.status(400).json({ msg: "Tidak ada file ter upload" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const Url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".pdf"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Salah Extensi file" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "file maksimal 5 mb" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Pendaftaran.create({
        nama: nama,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        nama_ortu: nama_ortu,
        alamat: alamat,
        no_hp: no_hp,
        nik: nik,
        jenis_kelamin: jenis_kelamin,
        asal_sekolah: asal_sekolah,
        nilai_IPA: nilai_IPA,
        nilai_Matematika: nilai_Matematika,
        nilai_Bhs_Indonesia: nilai_Bhs_Indonesia,
        nilai_rata_rata: nilai_rata_rata,
        status: status,
        image: fileName,
        url: Url,
      });
      res.json({ msg: "Pendaftaran Berhasil" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const deletePendaftaranById = async (req, res, next) => {
  const daftar = await Pendaftaran.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!daftar) return res.status(404).json({ msg: "data image tidak ada" });
  try {
    const filepath = `./public/images/${daftar.image}`;
    fs.unlinkSync(filepath);
    await Pendaftaran.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      msg: "Data berhasil di hapus",
    });
  } catch (e) {
    next(e);
    // console.log(error.message);
  }
};

export const putPendaftaranById = async (req, res) => {
  const {
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
  } = req.body;
  await updatePendaftaranById(
    req.params.id,
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
  );
  const daftar = await findPendaftaranById(req.params.id);
  res.json(daftar);
};

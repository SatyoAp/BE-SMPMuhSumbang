import fs from "fs";

// Baca file credentials.json
const filePath = "./serviceAccountKey.json"; // Path ke file Anda
const fileContent = fs.readFileSync(filePath, "utf8");

// Encode ke Base64
const base64String = Buffer.from(fileContent).toString("base64");

// Tampilkan hasil atau simpan ke file lain
console.log("Encoded Base64 String:", base64String);

// (Opsional) Simpan hasil ke file teks
fs.writeFileSync("./credentials_base64.txt", base64String);

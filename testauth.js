// const crypto = require("crypto");

// // Encrypt the message
// const message = Date.now().toString();
// const secret = "uap";
// const key = crypto.scryptSync(message, secret, 16);

// // Defininf iv
// const iv = Buffer.alloc(16, 0);
// const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
// const encrypted = cipher.update(message, "utf8", "hex") + cipher.final("hex");
// console.log("Encrypted message:", hexToBase1024(encrypted));

// // Decrypt the message
// const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
// const decrypted =
//   decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
// console.log("Decrypted message:", decrypted);

// function hexToBase1024(hex) {
//   // Convert the hexadecimal string to an array of bytes
//   const bytes = Buffer.from(hex, "hex");

//   // Convert the array of bytes to a base-1024 string
//   const base1024 = bytes.toString("base64");

//   // Convert the base-1024 string to base-1024 encoding
//   const base1024Encoded = base1024
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");

//   return base1024Encoded;
// }

// function base1024ToHex(base1024) {
//   // Convert the base-1024 encoded string to a base-1024 string
//   const base1024Decoded =
//     base1024.replace(/-/g, "+").replace(/_/g, "/") +
//     "==".substring(0, (3 * base1024.length) % 4);

//   // Convert the base-1024 string to an array of bytes
//   const bytes = Buffer.from(base1024Decoded, "base64");

//   // Convert the array of bytes to a hexadecimal string
//   const hex = bytes.toString("hex");

//   return hex;
// }

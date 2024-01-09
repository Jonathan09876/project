 //const multer = require('multer');
import multer from 'multer';
import asyncHandler from 'express-async-handler'
// const MIME_TYPE_MAP = {
//   'txt/xls': 'xls',
//   'txt/xlsx': 'xlsx',
// };


const uploadFile = asyncHandler(async (req, res) => {
  
})
// const uploadFile = multer({
//   limits: 50000,
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/images');
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE_MAP[file.mimetype];
//     }
//   }),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype];
//     let error = isValid ? null : new Error('Invalid Mime Type');

//     cb(error, isValid);
//   }
// });

export {
  uploadFile
}

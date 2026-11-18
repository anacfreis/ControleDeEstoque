
import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination: './uploads',

  filename: (req, file, callback) => {
    const fileName = `${randomUUID()}${path.extname(file.originalname)}`;

    callback(null, fileName);
  },
});

const upload = multer({
  storage,
});

export default upload;

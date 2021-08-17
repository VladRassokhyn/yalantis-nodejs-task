import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { usersService } from './users.service';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
  }
});

const upload = multer({ storage }).single('photo');

router.route('/').post(upload, async (req: Request, res: Response) => {

  if (req.file) {
    const { id } = await usersService.postUser({
      ...req.body,
      photo: `/uploads/${req.file.filename}`
    });

    res.json(id);
  } else {
    res.statusCode = 401;
    res.json({ message: 'request must contain a photo' });
  }
});

router.route('/:userId').get(async (req: Request, res: Response) => {
  const user = await usersService.getUserById(req.params['userId']!);
  if (user) {
    res.json(user);
  } else {
    res.statusCode = 404;
    res.json({ message: 'user not found' });
  }
});

export const usersRouter = router;


import express, { Request, Response } from 'express';
import { usersService } from './users.service';
import { multerUpload } from '../middlewares/multerUpload/multerUpload';

const router = express.Router();

router.route('/').post(multerUpload, async (req: Request, res: Response) => {

  if (req.file) {
    const { id } = await usersService.postUser({
        ...req.body,
        photo: `/uploads/${req.file.filename}`
      }
    );
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


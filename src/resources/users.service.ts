import fs from 'fs';
import bmp from 'bmp-js';
import sharp from 'sharp';
import path from 'path';
import { User } from '../entities/User.model';
import { usersRepo } from './users.repository';

const postUser = async (dto: User) => {

  try {
    const bufferImage = fs.readFileSync(path.join(__dirname, '../', dto.photo));
    const bitmap = bmp.decode(bufferImage);

    const sharpImage = sharp(bitmap.data, {
      raw: {
        height: bitmap.height,
        width: bitmap.width,
        channels: 4
      }
    }).extract({
      width: 200,
      height: 200,
      top: bitmap.height / 2 - 100,
      left: bitmap.width / 2 - 100
    });

    sharpImage.toFormat('jpg');
    await sharpImage.toFile(path.join(__dirname, '../', dto.photo));

  } catch (e) {
    console.log(e);
  }

  return usersRepo.postUser(dto);
};

const getUserById = (id: string) => usersRepo.getUserById(id);

export const usersService = { postUser, getUserById };
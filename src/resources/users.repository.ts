import { getRepository } from 'typeorm';
import { User } from '../entities/User.model';

const postUser = async (dto: User) => {
  const usersRepository = getRepository(User);
  const user = usersRepository.create(dto);
  return usersRepository.save(user);
};

const getUserById = async (id: string) => {
  const usersRepository = getRepository(User);
  const user = await usersRepository.findOne(id);
  if (user) {
    return user;
  }
  return undefined;

};

export const usersRepo = { postUser, getUserById };
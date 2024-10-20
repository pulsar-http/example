import type { User } from "../ports/user.ts";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../domain/userRepository';

export const getUsers = async () => {
  return getAllUsers();
};

export const getUser = async (id: string) => {
  return getUserById(id);
};

export const addUser = async (user: User) => {
  return createUser(user);
};

export const modifyUser = async (id: string, user: Partial<User>) => {
  return updateUser(id, user);
};

export const removeUser = async (id: string) => {
  return deleteUser(id);
};

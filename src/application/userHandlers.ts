import { error, json, type RouterHandler } from "@pulsar-http/core";
import type { User } from "../ports/user";
import { getUsers, getUser, addUser, modifyUser, removeUser } from '../core/userService';

export const handleGetUsers = async () => {
  try {
    const users = await getUsers();
    return json(users);
  } catch (e) {
    return error(500, "Failed to fetch users");
  }
};

export const handleGetUser: RouterHandler = async ({ pathParams }) => {
  try {
    const user = await getUser(pathParams.id);
    if (!user) {
      return error(404, 'User not found');
    } else {
      return json(user);
    }
  } catch (e) {
    return error(500, 'Failed to fetch user');
  }
};

export const handleAddUser: RouterHandler<User> = async ({ body }) => {
  try {
    const user = await addUser(body);
    return json(user);
  } catch (e) {
    return error(500, 'Failed to add user');
  }
};

export const handleModifyUser: RouterHandler<Partial<User>> = async ({ pathParams, body }) => {
  try {
    const user = await modifyUser(pathParams.id, body);
    if (!user) {
        return error(404, 'User not found');
    } else {
        return json(user);
    }
  } catch (e) {
    return error(500, 'Failed to update user');
  }
};

export const handleRemoveUser: RouterHandler = async ({ pathParams }) => {
  try {
    const user = await removeUser(pathParams.id);
    if (!user) {
      return error(404, 'User not found');
    } else {
      return json(user);
    }
  } catch (e) {
    return error(500, 'Failed to remove user');
  }
};

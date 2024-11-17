import { router } from '@pulsar-http/core';
import { userSchema } from "../ports/user";
import { withAuth } from "../adapters/wrappers/withAuth";
import { handleGetHome } from "../application/homeHandlers";
import { handleGetUsers, handleGetUser, handleAddUser, handleModifyUser, handleRemoveUser } from '../application/userHandlers';

const { get, post, patch, delete: del } = router;

export const routes = [
  get('/', handleGetHome),
  get('/users', handleGetUsers),
  get('/users/:id', handleGetUser),
  post('/users', withAuth(handleAddUser), { bodySchema: userSchema }),
  patch('/users/:id', withAuth(handleModifyUser), { bodySchema: userSchema.partial() }),
  del('/users/:id', withAuth(handleRemoveUser))
];
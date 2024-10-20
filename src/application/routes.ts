import { router } from '@pulsar-http/core';
import { userSchema } from "../ports/user.ts";
import { withAuth } from "../adapters/wrappers/withAuth.ts";
import { handleGetHome } from "../application/homeHandlers.ts";
import { handleGetUsers, handleGetUser, handleAddUser, handleModifyUser, handleRemoveUser } from '../application/userHandlers.ts';

const { get, post, patch, delete: del } = router;

export const routes = [
  get('/', handleGetHome),
  get('/users', handleGetUsers),
  get('/users/:id', handleGetUser),
  post('/users', withAuth(handleAddUser), userSchema),
  patch('/users/:id', withAuth(handleModifyUser), userSchema.partial()),
  del('/users/:id', withAuth(handleRemoveUser))
];
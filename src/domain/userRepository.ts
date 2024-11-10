import type { User } from "../ports/user";
import { getClient } from '../adapters/db';

export const getAllUsers = async () => {
  const client = getClient();
  const result = await client.query('SELECT * FROM users');
  return result.rows;
};

export const getUserById = async (id: string) => {
  const client = getClient();
  const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createUser = async (fields: User) => {
  const client = getClient();
  const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [fields.name, fields.email]);
  return result.rows[0];
};

export const updateUser = async (id: string, fields: Partial<User>) => {
  const client = getClient();
  const fieldUpdates = Object.keys(fields).map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(fields);
  values.push(id);
  const result = await client.query(`UPDATE users SET ${fieldUpdates} WHERE id = $${values.length} RETURNING *`, values);
  return result.rows[0] || null;
};

export const deleteUser = async (id: string) => {
  const client = getClient();
  const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
};

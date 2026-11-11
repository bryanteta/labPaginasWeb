import { pool } from '../db.js';

import bcrypt from 'bcryptjs';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM  usuarios');
    return result.rows;
};

export const getUserByApellido= async (apellido) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE apellido = $1', [apellido]);
    return result.rows;
 
};

export const getUserByRol= async (rol) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE rol = $1', [rol]);
    return result.rows;
 
};

export const getBuscarNombre= async (nombre) => {
  const buscar = `%${nombre}%`
 const result = await pool.query('SELECT * FROM usuarios WHERE nombre LIKE $1', [buscar]);
 return result.rows;
};

export const postCrearUsuario = async (rolId, nombreUsuario, clave, nombre, apellido) => {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const claveHashed = bcrypt.hashSync(clave, salt);

    const query = `INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido) VALUES ($1, $2, $3, $4, $5) RETURNING *;`

    const result = await pool.query(query, [rolId, nombreUsuario, claveHashed, nombre, apellido]);
    return result.rows[0];
};

export const actualizarUsuario = async (usuario) => {
  const query = `UPDATE usuarios SET rolId = $1, nombreUsuario = $2, clave = $3, nombre = $4, apellido = $5 WHERE usuarioId = $6 RETURNING *;`;

    const result = await pool.query(query, usuario);
    if (result.rowCount === 0) throw new Error('Usuario no encontrado');
    return result.rows[0];
};

export const eliminarUsuario = async (usuarioId) => {
    const usuarioAEliminar = await pool.query('SELECT * FROM usuarios WHERE usuarioId = $1', [usuarioId]);
    if (usuarioAEliminar.rowCount === 0) throw new Error('Usuario no encontrado'); 
     await pool.query('DELETE FROM usuarios WHERE usuarioId = $1', [usuarioId]);
  return { message: 'Usuario eliminado correctamente', usuario: usuarioAEliminar.rows[0] };
  
  };
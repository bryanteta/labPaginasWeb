import { pool } from '../db.js';

import bcrypt from 'bcryptjs';

export const getAllpublicaciones = async () => {
  const result = await pool.query('SELECT * FROM  publicaciones');
    return result.rows;
};

export const postCrearPublicacion = async (titulo, descripcion, usuarioId) => {
    const query = `INSERT INTO publicaciones (titulo, descripcion, usuarioId) VALUES ($1, $2, $3) RETURNING *;`
    const result = await pool.query(query, [titulo, descripcion, usuarioId]);
    return result.rows[0];
};

export const actualizarPublicacion = async (usuario) => {
  const query = `UPDATE publicaciones SET titulo = $1, descripcion = $2, usuarioId = $3 WHERE publicacionId = $4 RETURNING *;`;

    const result = await pool.query(query, usuario);
    if (result.rowCount === 0) throw new Error('Publicacion no encontrada');
    return result.rows[0];
};

export const eliminarPublicacion = async (publicacionId) => {
    const publicacionAEliminar = await pool.query('SELECT * FROM publicaciones WHERE publicacionId = $1', [publicacionId]);
    if (publicacionAEliminar.rowCount === 0) throw new Error('Publicacion no encontrada');
    await pool.query('DELETE FROM publicaciones WHERE publicacionId = $1', [publicacionId]);
    return { message: 'Publicacion eliminada correctamente', usuario: publicacionAEliminar.rows[0] };
};
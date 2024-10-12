/**
 * @swagger
 * components:
 *   schemas:
 *     Artista:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - nationality
 *         - albums
 *       properties:
 *         id:
 *           type: string
 *           description: El ID del artista.
 *         name:
 *           type: string
 *           description: Nombre del artista.
 *         albums:
 *           type: array
 *           items: 
 *              type: string
 *           description: _Id del album asociado.
 *       example:
 *         id: "1"
 *         nombre: "Juanes"
 *         nationality: "Colombian"
 *         album: "670a79764efb31a8ff685805"
 *         
 */
/**
 * @swagger
 * /artistas:
 *   get:
 *     summary: Obtiene todos los artistas
 *     responses:
 *       200:
 *         description: Lista de artistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'l#/components/schemas/Artista'
 *
 *   post:
 *     summary: Crea un nuevo artista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artista'
 *     responses:
 *       201:
 *         description: Artista agregado
 *       400:
 *         description: Datos faltantes requeridos
 * /artist/{id}:
 *   put:
 *     summary: Actualiza un artista existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: dato del artista a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Artista'
 *     responses:
 *       200:
 *         description: datos de artista actualizado actualizado
 *       404:
 *         description: datos de artista no encontrado
 *       400:
 *         description: Datos inválidos
 *
 *   delete:
 *     summary: Elimina los datos de un artista existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del artista a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Artista eliminado
 *       404:
 *         description: Artista no encontrado
 */

const express = require('express')

const router = express.Router()
const artistController = require('../controllers/artistController')

router.get('/artist', artistController.getAll);
router.post('/artist', artistController.create);
router.put('/artist/:id', artistController.update)
router.delete('/artist/:id', artistController.delete)

module.exports = router
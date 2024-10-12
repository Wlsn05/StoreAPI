/**
 * @swagger
 * components:
 *   schemas:
 *     Album:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - releaseDate
 *         - genre
 *         - artists
 *       properties:
 *         id:
 *           type: string
 *           description: El ID del álbum.
 *         title:
 *           type: string
 *           description: El título del álbum.
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: La fecha de lanzamiento del álbum.
 *         genre:
 *           type: string
 *           description: El genero musical del álbum
 *         artists:
 *           type: string
 *           description: Id del artista asociado.
 *       example:
 *         id: "1"
 *         title: "Origen"
 *         releaseDate: "2021-05-28"
 *         genre: "Rock en español"
 *         
 */
/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Obtiene todos los álbumes
 *     responses:
 *       200:
 *         description: Lista de álbumes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Album'
 *
 *   post:
 *     summary: Crea un nuevo álbum
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       201:
 *         description: Álbum creado
 *       400:
 *         description: Datos faltantes requeridos
 * /albums/{id}:
 *   put:
 *     summary: Actualiza un álbum existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del álbum a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Album'
 *     responses:
 *       200:
 *         description: Álbum actualizado
 *       404:
 *         description: Álbum no encontrado
 *       400:
 *         description: Datos inválidos
 *
 *   delete:
 *     summary: Elimina un álbum existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del álbum a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Álbum eliminado
 *       404:
 *         description: Álbum no encontrado
 */


const express = require('express')

const router = express.Router()
const albumController = require('../controllers/albumController')

router.get('/albums', albumController.getAll)
router.post('/albums', albumController.create)
router.put('/albums/:id', albumController.update)
router.delete('/albums/:id', albumController.delete)
//router.get('/artists/:id/albums', albumController.getByArtistId)

module.exports = router
const artistModel = require('../models/artistModel');
const albumModel = require('../models/albumModel');

const artistController = {
  getAll: async (req, res) => {
    // Esto ahora incluye los álbumes
    try {
      const data = await artistModel.find().populate('albums')
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  create: async (req, res) => {

    try {
      const { id, name, nationality, albums } = req.body; 

      if (!id || !name || !nationality) {
        return res.status(400).json({ error: 'datos faltantes requeridos' })
      }
      const artist = new artistModel({ id, name, nationality, albums: albums || [] })
      await artist.save();
      res.json(artist)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  addAlbumToArtist: async (req, res) => {
    const { artistId, albumsId } = req.params
    //console.log(req.params)
    if(!artistId || !albumsId){
      return res.status(400).json({error:'Faltan datos obligatorios'})
    }

    try {
      const artist = await artistModel.findById(artistId)
      if(!artist) {
        return res. status(404).json({message: 'Artista no encontrado'})
      }
      const album = await albumModel.findById(albumsId)
      if(!album){
        return res.status(404).json({message: 'Album no encontrado'})
      } 
      //verificar si el album ya está en el objeto de artista
      if(artist.albums.includes(albumsId)) {
        return res.status(400).json({message:'El album ya está asociado al artista'})
      }
      //agregar el album al artista
      artist.albums.push(albumsId)
      await artist.save()
      res.json(artist)
    }catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { name, nationality } = req.body;

    // Validar que el ID del artita exista
    if (!id) {
      return res.status(400).json({ error: 'ID del artista no proporcionado' });
    }

    try {
      const updated = await artistModel.findByIdAndUpdate(
        id,
        { name, nationality },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ message: 'Artista no encontrado' });
      }

      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  delete:  async (req, res) => {
    const { id } = req.params;

    // Validar que el ID del artista exista
    if (!id) {
      return res.status(400).json({ error: 'ID del artista no proporcionado' });
    }

    try {
      const deleted = await artistModel.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: 'artista no encontrada' });
      }

      // Eliminar la referencia a este artista en los albums asociados
      await albumModel.updateMany(
        { artists: id },
        { $pull: { artists: id } }
      );

      res.json({ message: 'Artista eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}

module.exports = artistController;
const album = require('../models/albumModel')

const albumController = {
  getAll : async( req, res ) => {
    try{
      const data = await album.find()
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  },
  create: async (req, res) => {
    try {
      const { id, name, nationality, albums } = req.body; // Cambiar albumsId a albums

      if (!id || !name || !nationality) {
        return res.status(400).json({ error: 'datos faltantes requeridos' });
      }
      // Asegúrate de que albums sea un arreglo de ObjectId
      const artist = new artistModel({ id, name, nationality, albums });
      await artist.save();
      res.json(artist);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    const {id} = req.params

    if(!id){
      return res.status(400).json({error:'Id no encontrado'})
    }

    try {
       
      const update = await album.findByIdAndUpdate(id, req.body, {
        new: true,
        validators: true
      })

      if(!update) {
        return res.status(404).json({message:'album no encontrado'})
      }

      res.json(update)
    }catch(error) {
      res.status(400).json({error:error.message})
    }
  },

  delete:  async (req, res) => {
    const {id} = req.params

    if(!id) {
      console.log(err)
      return res.status(400).json({error: 'id no proporcionado'})
    }

    try {
      const albums = await album.findByIdAndDelete(id)

      if(!albums){
        return res.status(404).json({message:'album no encontrado'})
      }
      res.json(({message:'Album eliminado'}))
    } catch (error) {
      res.status(500).json({error:error.message})
    }
  }
}

module.exports = albumController
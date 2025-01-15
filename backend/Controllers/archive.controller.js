const Archive = require("../models/archive.model.js")

const getArchives = async(req, res) => {
    try{
        const archives = await Archive.find({});
        res.status(200).json(archives)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// const getArchive = async(req, res) => {
//     try{
//         const {id} = req.params;
//         const archive = await Archive.findById(id);
//         res.status(200).json(archive)
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// }

const getArchive = async (req, res) => {
    try {
      const { id } = req.params; // User id
      console.log(id);
    const archives = await Archive.find({ id }); 
      if (archives.length === 0) {
        return res.status(404).json({ message: `No records found for user ID: ${id}` });
      }
      // Send back all records for the user
      res.status(200).json(archives);
    } catch (error) {
      console.error("Error fetching archives:", error);
      res.status(500).json({ message: error.message });
    }
  };
  

const createArchive = async (req, res) => {
    try {
        console.log(req.body);
        
        const { id, topic, label } = req.body;
        const existingEntry = await Archive.findOne({ id, topic, label });
        if (existingEntry) {
            return res.status(400).json({ message: "Same label exists for this topic, choose a new label" });
        } else {
            const archive = await Archive.create(req.body);
            return res.status(200).json(archive);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateArchive = async (req, res) => {
    try {
        const { id, topic, label } = req.params;
        const updatedArchive = await Archive.findOneAndUpdate(
            { id, topic, label },  // Query to match the document
            req.body,               // Data to update
            { new: true }           // Return the updated document
        );
        if (!updatedArchive) return res.status(404).json({ message: "Archive not found" });
        res.status(200).json(updatedArchive);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteArchive = async (req, res) => {
    try {
        const { id, topic, label } = req.params;
        const deletedArchive = await Archive.findOneAndDelete({ id, topic, label });
        if (!deletedArchive) return res.status(404).json({ message: "Archive not found" });
        res.status(200).json({ message: "Archive deleted successfully", deletedArchive });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getSingle = async (req, res) => {
    try {
        const { id, topic, label } = req.params;
        const archive = await Archive.findOne({ id, topic, label });
        if (!archive) return res.status(404).json({ message: "Archive not found" });
        res.status(200).json(archive);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getArchive,
    getArchives,
    createArchive,
    updateArchive,
    deleteArchive,
    getSingle
};
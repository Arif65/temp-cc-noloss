const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs");

const getUsers = async(req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createUser = async (req, res) => {
    try {
        const { id } = req.body; 
        // console.log(id); 
        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({ message: "This ID already exists. Please use a different ID." });
        }
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body)
        if(!user){
            return res.status(400).json({message: "N/A"})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id)
        res.status(200).json(user)
        if(!user){
            return res.status(400).json({message: "N/A"})
        }
        res.status(200).json(updatedUser)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//

const registerUser = async (req, res) => {
    try {
        const { id, password, name } = req.body; 
        const existingUser = await User.findOne( { id } );
        if (existingUser) {
            return res.status(400).json({ message: "This ID already exists. Please use a different ID." });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = await User.create({
            id,
            name,
            password: hashedPassword, 
        });
        res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { id, password } = req.body;
        const user = await User.findOne( { id } );
        if (!user) {
            return res.status(404).json({ message: "ID not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Wrong Password" });
        }
        return res.status(200).json({ id: user.id, name: user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,

    registerUser,
    loginUser
};
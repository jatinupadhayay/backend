const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const addUser = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    if (!mobile || !name || !password || !email)
        return res.status(409).json({ message: "All fields are required" });
    
    // Check for duplicate mobile number
    const duplicate = await User.selectWhere("mobile", mobile);    
    if (duplicate.length > 0) return res.status(409).json({ message: "Mobile number already exists" });

    

    // Insert the new user
    await User.insert(name, email, mobile, password);

    // Respond with success
    res.status(201).json("User created successfully!");
};



module.exports ={addUser}

const User = require('../models/user-model.js')

const createUser = async (req, res) => {
    try {
        console.log("req.body ===>", req.body);
        let existingUser = await User.findOne({username: req.body.username});

        if (existingUser){
            return res.send({message: 'User already exists'});
        }

        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            res.send({success: true});
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        res.send("Something Went Wrong");
    }
}


const signIn = async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({username: req.body.username});

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        if (user.password === req.body.password){
            return res.status(200).json({ success: true});
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
 
    } catch (e) {
        console.error(e); // Log the actual error
        res.status(500).json({ message: `Something went wrong in sign in` });
    }
}

module.exports = {
    createUser,
    signIn
}
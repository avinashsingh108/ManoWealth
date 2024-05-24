const { notifyPsy } = require("../mailService");
const supAdminModel = require("../models/superAdminModel");
const userModel = require("../models/userSchema")
const jwt  = require('jsonwebtoken')

const submitReport = async (req, res) => {
    try {
        const { user, message ,admin } = req.body;
        // console.log(usermessage);
        // console.log(admin);
        if (!user || !message) {
            return res.status(400).json({ error: "User and message are required fields." });
        }

        const user1 = await userModel.findOne({ email: user });
        if (!user1) {
            return res.status(404).json({ error: "User not found." });
        }

        const userId = user1._id;

        const report = await supAdminModel.create({ user: userId, message: message ,admin:admin });

        res.status(200).json({ message: "Report submitted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

const getAdminWiseData = async (req, res) => {
    try {
        const { admin } = req.body;
       // console.log("Received admin:", admin);

        const data = await supAdminModel.find({ admin: admin });
       // console.log("Found data:", data);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        return res.send(data);
    } catch (error) {
        console.error("Error in getAdminWiseData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
const getUserAdmin = async (req, res) => {
    try {
        const { admin } = req.params;
        //console.log("Received admin:", admin);
     
        const data = await userModel.find({ assigned_admin: admin });
        //console.log("Found data:", data);

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Data not found" });
        }

        return res.send(data);
    } catch (error) {
        console.error("Error in getAdminWiseData:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const notifyAdmin = async (req,res) => {
    try{
        const user = req.body.user;
       const resp=  notifyPsy(user,"report@gmail.com");
        return res.send(resp).status(200);
    }catch(err){
        res.send(err.message).status(500);
    }
}

const getReportedUsers = async (req, res) => {
    try {
        const supAdminUsers = await supAdminModel.find({}).lean();
     
        const mergedUsers = [];

        for (const supAdminUser of supAdminUsers) {
            const userModelData = await userModel.findById(supAdminUser.user, 'username email score contactNumber ').lean(); 

            const mergedUser = { ...supAdminUser, ...userModelData };
            mergedUsers.push(mergedUser);
        }

        return res.send(mergedUsers).status(200);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Error');
    }
}



const getAdminReportedUsers = async (req, res) => {
    try {
        const email = req.params.id;
      
        const reports = await supAdminModel.find({ admin: email }).lean();

      
        const mergedUsers = [];

      
        for (const report of reports) {
  
            const userModelData = await userModel.findById(report.user, 'username email score contactNumber').lean(); 
     
            const mergedUser = { ...report, ...userModelData };
            mergedUsers.push(mergedUser);
        }

        return res.status(200).send(mergedUsers);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error');
    }
}




const authorityLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(404).send('Invalid email or password.');
    }

    if (password !== user.password) {
        return res.status(401).send('Invalid password.');
    }

    const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, 'H@rsh123', { expiresIn: '1h' });
    res.json({ user, token });
}






module.exports ={submitReport ,getUserAdmin ,authorityLogin, getReportedUsers ,getAdminWiseData ,notifyAdmin  ,getAdminReportedUsers};
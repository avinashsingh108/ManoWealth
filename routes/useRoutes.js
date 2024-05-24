const express = require("express");
const userModel = require("../models/userSchema");
const {
  login,
  signup,
  sendOtp,
  clearAll,
  updateProfile,
  getuserInfo,
  resetPassword,
  editProfile,
} = require("../controllers/userController");
const { validationResult } = require('express-validator');
const {
  getQuestions,
  getAllQuestions,
} = require("../controllers/QuestionController");
const jwt = require("jsonwebtoken");
const {upload,uploadImage} = require('../middlewares/fileUpload')
const { auth } = require("../middlewares/authMiddleware");
const { setAnswers } = require("../controllers/AnswerController");
const router = express.Router();
const {
  insertQuestions,
  getUsers,
  getAllAnswers,
} = require("../controllers/newController");
const {
  promoteToAdmin,
  adminLogin,
  getalladmins,
  createAdmin,
  deleteAdmin,
} = require("../controllers/adminController");
const {
  submitReport,
  getReportedUsers,
  getAdminWiseData,
  getAdminReportedUsers,
  notifyAdmin,
  authorityLogin,
  getUserAdmin
} = require("../controllers/supAdminController");
const Profile = require("../models/profileModel");
const { sendSos, getAllSoS } = require("../controllers/SoScontroller");
const verifyToken = require("../middlewares/authenticateToken");
const supAdminModel = require("../models/superAdminModel");
// const uploadImage = require("../middlewares/fileUpload");

router.post("/signup", signup);
router.post("/login",  login);
router.post("/promote-to-admin", verifyToken, promoteToAdmin);
router.post("/send-sos", verifyToken, sendSos);
router.get("/get-all-sos/:id", verifyToken, getAllSoS);
// router.get('/get-user/:id',findUser);
// router.get('/', (req,res)=>{
//     res.send('hel;lo woprld');
//     console.log('object')
// })
// Assuming your userModel file is located in '../models/userModel'

// router.get('/getdata' , async (req,res) => {
//   res.send('hi').status(200);
// })

router.post("/update-tnc", verifyToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    // console.log(userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { has_accepted_tnc: true },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/upload', upload.single('image'), uploadImage, function(req, res) {
  res.json({ imageUrl: req.imageUrl });
});


router.post("/super-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user's role is "super admin"
    if (user.role !== "super admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized. Only super admins can access." });
    }

    // Check if the password is correct
    // Note: You should use a secure password comparison method like bcrypt here
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, "H@rsh123", {
      expiresIn: "1h",
    });

    // Send the token in the response
    console.log(user);
    res
      .status(200)
      .json({ message: "Super admin login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/check-email",  async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const userEmail = await userModel.findOne({ email: email });
    if (!userEmail) {
      return res.send("user doesnt exist").status(404);
    } else return res.status(200).send("user found please send otp");
  } catch (err) {
    return res.send("internal server error").status(500);
  }
});

router.delete("/clear", verifyToken, clearAll);
router.post("/Doit",verifyToken,  insertQuestions);
router.get("/getAllUsers", verifyToken, getUsers);
router.post("/setAnswer", verifyToken, setAnswers);
router.post("/sendOtp", verifyToken, sendOtp);
router.post("/reset-password", resetPassword);
router.get("/getQ",verifyToken, getAllQuestions);
router.get("/getAllData", verifyToken, getAllAnswers);
router.post("/adminLogin", adminLogin);

router.get('/pfp/:id' , verifyToken , async (req,res)=>{
  try {
    const user =  await  userModel.findOne({_id:req.params.id});
    return res.send(user?.profile_pic).status(200);
  }
  catch(err){
    return res.send('error').status(500);
  }
} )

router.get('/get-user-with-info', verifyToken, async (req, res) => {
  try {

    const userData = await userModel.find({});

    const profileData = await Profile.find({});

    const mergedData = userData.map(user => {
      const profile = profileData.find(profile => String(profile.user) === String(user._id));
      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        assigned_admin:user.assigned_admin,
        profile: profile || {} 
      };
    });

    // console.log('Merged Data:', mergedData);
    res.status(200).json(mergedData);
  } catch (error) {
    console.error('Error merging user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.post('/edit-profile' ,upload.single('image'),uploadImage ,verifyToken ,editProfile)

router.post("/update-profile", upload.single('image'),uploadImage,  verifyToken, updateProfile);
router.get("/get-profile/:id", verifyToken, async (req, res) => {
  try {


    const { id } = req.params;
    // console.log(id);
    const userProfile = await Profile.findById(id);
    if (!userProfile) {
      return res.status(403).send("Profile not updated");
    } else {
      return res.status(201).send("Profile already updated");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});
router.post('/report-to-psych',verifyToken, async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const id = req.body.userID;
    
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    // console.log(id)
   const super_admin = await userModel.find({role:'super admin'});
  //  console.log(super_admin)
   const supadminId= super_admin[0]?._id || '6633b695e302c9a413f4a578';

    let userExists = await supAdminModel.exists({ user: id });

    if (!userExists) {

        await supAdminModel.create({ user: id,admin:supadminId,message:'reported by super admin directly', reported_psych: true });
    }
    

    const update = await supAdminModel.findOneAndUpdate(
      { user: id },
      { reported_psych: true },
      { new: true }
  );

  const userMess = await supAdminModel.findOne({user:id});
  const userMessage = userMess.message;

  

  if (!update) {
      return res.status(404).json({ error: "User not found" });
  }
  

  if (update.password) {
      delete update.password;
  }
  

  update.message= userMessage;
  return res.status(200).json(update);
  
  
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});





router.post('/add-users',  async (req, res) => {
  try {
      // Extract user data array from form data
      // console.log(req.body)
      const parsedUserDataArray = req.body;
    //  console.log(JSON.parse(req.body['formData']))
      // Parse each user object in the array
    
      // console.log(usersData)

      // Process each user and save to the database
      for (const userData of parsedUserDataArray) {
          userData.role = 'user'; // Set role to 'user'
          await userModel.create(userData); // Create user in the database
      }

      // Respond with success message
      res.status(201).json({ message: 'Users added successfully' });
  } catch (error) {
      console.error('Error adding users:', error);
      res.status(500).json({ error: 'Error adding users' });
  }
});




router.post('/upload-summary' ,verifyToken, async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.body.userID;
    const sum = req.body.summary;
    console.log(sum);
  
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const summ = JSON.parse(sum)

    const update = await supAdminModel.findOneAndUpdate(
      { user: id },
      { actionSummary:summ},
      { new: true }
    );

    if (!update) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(update);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
})


router.get('/get-summary/:id',verifyToken, async (req,res) => {
  try{
    const { id }= req.params;
    const summary = await supAdminModel.find({user:id});
    if(!summary){
      return res.send('user not found').status(404);
    }

    return res.send(summary).status(201);
    

  }catch(err){
    return res.send('error').status(500);  }
})
router.post("/create-admin", verifyToken, createAdmin);
router.delete("/delete-admin/:id", verifyToken, deleteAdmin);
// router.get('/getQuestions' , getQuestions);
router.get('/assigned-admin/:id' ,async (req,res)=>{
  try {
    const id = req.params.id;
    const admin = await userModel.findOne({_id:id});
    console.log(admin);
    return res.send(admin.assigned_admin).status(200);
  }catch(err){
    return res.send(err).status(500)
  }

})

router.get('/user/get-score/:id' , async (req,res)=>{
  try {
    const {id} = req.params;
    const user = await userModel.findOne({_id:id});
    // console.log(user)
    const score = {
      score:user.score,
      date:user.score_date,
    }
    // console.log(score)
    return res.send(score).status(201);
  }catch(err){
    return res.send(err).status(500);
  }
})
router.post("/submit-report", verifyToken, submitReport);
router.get("/get-reported-users",verifyToken,  getReportedUsers);
router.get("/get-admin-reported-users/:id",  getAdminReportedUsers);
router.get("/get-user-info/:id",verifyToken ,getuserInfo);
router.post("/getAdminwisedata", getAdminWiseData);
router.get('/user-admin-data/:admin',getUserAdmin)
router.get("/getAllAdmins", verifyToken, getalladmins);
router.post("/reportpsy", verifyToken, notifyAdmin);

router.post('/single-login' , authorityLogin)
module.exports = router;

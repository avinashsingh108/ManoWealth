const {NotificationModel} = require("../models/notificationModel");

const sendSos = async (req, res) => {
  const { userId, admin, message, username } = req.body;
  // console.log(userId, admin, message, username )
  try {
    const notification = await NotificationModel.create({
      user: userId,
      admin:admin,
      message:message,
      userName: username,
    });

    return res
      .status(201)
      .json({ message: "Notification sent successfully"});
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
};

const getAllSoS = async (req,res)=> {
  try{
    const {id}= req.params;
    // console.log(id);
    const notifications = await NotificationModel.find({admin:id});
    // console.log(notifications)
    if(!notifications){
      return  res.send('no messages').status(404);
    }
    return res.send(notifications).status(201);
  }
  catch(err){
    return res.send(err).status(500);
  }
}

module.exports = {sendSos,getAllSoS};

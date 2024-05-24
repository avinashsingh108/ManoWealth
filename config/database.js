const mongoose = require('mongoose');
require('dotenv').config();

// mongodb+srv://harshvchawla996:ZeKEWIzV0BgDxxJz@cluster0.ehvlcx1.mongodb.net/manthan
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
const dbConnect  = async () =>{
    mongoose.connect('mongodb+srv://harshvchawla996:ZeKEWIzV0BgDxxJz@cluster0.ehvlcx1.mongodb.net/manthan',options).then(()=>{
        //console.log('database connected');

    }).catch((err) => {
        console.log(err);
    })
}

module.exports ={dbConnect};



const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');
require("dotenv").config();

app.use(express.json())
app.use(cors());
app.use("/api/users" ,userRoute); 
app.use("/api/chats" ,chatRoute);
app.use("/api/messages" ,messageRoute);

app.get('/', (req , res) => {
    res.send("Welcome our chat app APIs..")
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) =>{
    console.log(`server listening on port : ${port}`);
}
);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.log("MongoDb connection failed",error.message));



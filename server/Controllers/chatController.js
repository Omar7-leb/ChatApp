//create chat
const chatModel = require("../Models/chatModel")

const createChat = async(req, res) => {
    const {firstId, secondId} = req.body;

try{
    const chat = await chatModel.findOne({
        members: {$all: [firstId, secondId]}
    });

    if(chat) return res.status(200).json(chat);

    const newChat = new chatModel({
        members: [firstId, secondId]
    });

    const response = await newChat.save();

    res.status(200).json(response);
} catch(error){
        console.log(error)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

// find userchat

const findUserChats = async(req, res) => {
    const userId = req.params.userId;

    try{
        const chats = await chatModel.find({
            members: {$in: [userId]}
        });

        if(chats) return res.status(200).json(chats);

        res.status(404).json({
            error: true,
            message: "Chat not found"
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
}

const findChat = async(req, res) => {
    const {firstId , secondId} = req.params;

    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

        res.status(404).json({
            error: true,
            message: "Chat not found"
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
};

module.exports = {createChat, findUserChats , findChat };

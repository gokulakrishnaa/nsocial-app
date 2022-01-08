import express from "express";
import { Conversation } from "../models/conversation.js";

const router = express.Router();

//New Conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Conversation of a User
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const conversationRouter = router;

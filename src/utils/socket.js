const { Server } = require("socket.io");
const { Chat } = require("../models/chat");
const crypto = require("crypto");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://www.your-live-app-domain.com"
          : "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinChat", ({ userId, targetUserId }) => {
      const ids = [userId, targetUserId].sort();
      const roomName = crypto
        .createHash("sha256")
        .update(ids.join(""))
        .digest("hex");
      socket.join(roomName);
      console.log(`User ${userId} joined room: ${roomName}`);
    });

    socket.on("sendMessage", async ({ senderId, targetUserId, text }) => {
      try {
        if (!senderId || !targetUserId || !text) {
          return console.error("sendMessage event received with missing data.");
        }

        let chat = await Chat.findOne({
          participants: { $all: [senderId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [senderId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({ senderId: senderId, text: text });
        await chat.save();

        const ids = [senderId, targetUserId].sort();
        const roomName = crypto
          .createHash("sha256")
          .update(ids.join(""))
          .digest("hex");

        socket.broadcast
          .to(roomName)
          .emit("messageReceived", { senderId, text });
      } catch (err) {
        console.error("Error in sendMessage:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;

const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect(
    "mongodb+srv://yashnirwan18:sWyHBiYVoSe1SnOK@cluster0.otsof4g.mongodb.net/Dev-tinder?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = connectDB;





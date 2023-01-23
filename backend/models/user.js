// import mongoose from "mongoose";
// import autoIncrement from "mongoose-auto-increment";

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
// how our document look like
const userSchema = mongoose.Schema({
  Heading: String,
  Content: String,
  Category: String,
  CreatorId: String,
  CreatorName: String,
  ImageLink: String,
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "articles");
// we need to turn it into a model
const postArticles = mongoose.model("articles", userSchema);

module.exports = postArticles;

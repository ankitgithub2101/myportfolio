import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      default: null,
    },

    fav_food: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      default: "local",
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;

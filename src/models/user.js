import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullname: {
    type: String,
        required: [true, "Nama lengkap harus diisi"],
  },
  email: {
    type: String,
        required: [true, "Email harus diisi"],
    unique: true,
        match: [/^\S+@\S+\.\S+$/, "Format email tidak valid"]
  },
  password: {
    type: String,
        required: [true, "Password harus diisi"],
  },
  image: {
    type: String,
    default: "https://www.gravatar.com/avatar/?d=mp",
  },
  watchlist: [{
    animeId: String,
    title: String,
    image: String,
    progress: Number,
    status: {
      type: String,
      enum: ['watching', 'completed', 'plan_to_watch', 'dropped'],
      default: 'plan_to_watch'
    }
  }],
  provider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User 
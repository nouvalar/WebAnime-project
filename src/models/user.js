import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
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
}, {
    timestamps: true
})

const User = models.User || model("User", userSchema)

export default User 
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokensEarned: { type: Number, default: 0 },
  wasteCollected: { type: Number, default: 0 },
  rank: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   name: { type: String },
//   email: { type: String, unique: true },
//   emailVerified: Date,
//   image: String,
//   password: { type: String, required: true },
//   tokensEarned: { type: Number, default: 0 },
//   wasteCollected: { type: Number, default: 0 },
//   rank: Number,
//   tokens: { type: Number, default: 0 }
// }, { timestamps: true });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;
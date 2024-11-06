import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  tokensEarned: {
    type: Number,
    default: 0
  },
  wasteCollected: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Remove any existing indexes
export const cleanupIndexes = async () => {
  try {
    if (mongoose.connection.readyState === 1) { // If connected
      await mongoose.connection.collections['users']?.dropIndexes();
    }
  } catch (error) {
    console.log('No indexes to clean up');
  }
};

// Create new indexes
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User

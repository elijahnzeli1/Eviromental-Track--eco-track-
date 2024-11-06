import mongoose from 'mongoose'

const projectParticipantSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
})

// Ensure unique participation
projectParticipantSchema.index({ projectId: 1, userId: 1 }, { unique: true })

export default mongoose.models.ProjectParticipant || 
  mongoose.model('ProjectParticipant', projectParticipantSchema)

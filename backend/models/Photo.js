import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    country: String,
    coordinates: {
      lat: Number,
      lon: Number
    }
  },
  imagePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient location-based queries
photoSchema.index({ 'location.city': 1 });
photoSchema.index({ 'location.coordinates.lat': 1, 'location.coordinates.lon': 1 });

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;

import Photo from '../models/Photo.js';
import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload a photo
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { city, country, lat, lon, description } = req.body;

    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }

    // Get user info
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create photo document
    const photo = await Photo.create({
      userId: req.user.id,
      userName: user.name,
      location: {
        city,
        country: country || '',
        coordinates: {
          lat: parseFloat(lat) || null,
          lon: parseFloat(lon) || null
        }
      },
      imagePath: req.file.filename,
      description: description || ''
    });

    res.status(201).json({
      message: 'Photo uploaded successfully',
      photo: {
        id: photo._id,
        userName: photo.userName,
        location: photo.location,
        imageUrl: `/uploads/${photo.imagePath}`,
        description: photo.description,
        uploadedAt: photo.uploadedAt
      }
    });
  } catch (error) {
    console.error('Upload photo error:', error);
    
    // Delete uploaded file if database save fails
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};

// Get photos by city
export const getPhotosByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    // Case-insensitive search
    const photos = await Photo.find({
      'location.city': new RegExp(`^${city}$`, 'i')
    })
      .sort({ uploadedAt: -1 })
      .limit(50);

    const photosWithUrls = photos.map(photo => ({
      id: photo._id,
      userName: photo.userName,
      location: photo.location,
      imageUrl: `/uploads/${photo.imagePath}`,
      description: photo.description,
      uploadedAt: photo.uploadedAt
    }));

    res.json({ photos: photosWithUrls });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

// Get photos by coordinates (within radius)
export const getPhotosByCoordinates = async (req, res) => {
  try {
    const { lat, lon, radius = 50 } = req.query; // radius in km

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const radiusKm = parseFloat(radius);

    // Simple bounding box search (for more accuracy, use MongoDB geospatial queries)
    const latDelta = radiusKm / 111; // 1 degree lat ≈ 111 km
    const lonDelta = radiusKm / (111 * Math.cos(latitude * Math.PI / 180));

    const photos = await Photo.find({
      'location.coordinates.lat': {
        $gte: latitude - latDelta,
        $lte: latitude + latDelta
      },
      'location.coordinates.lon': {
        $gte: longitude - lonDelta,
        $lte: longitude + lonDelta
      }
    })
      .sort({ uploadedAt: -1 })
      .limit(50);

    const photosWithUrls = photos.map(photo => ({
      id: photo._id,
      userName: photo.userName,
      location: photo.location,
      imageUrl: `/uploads/${photo.imagePath}`,
      description: photo.description,
      uploadedAt: photo.uploadedAt
    }));

    res.json({ photos: photosWithUrls });
  } catch (error) {
    console.error('Get photos by coordinates error:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

// Delete a photo (only by owner)
export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Check if user owns the photo
    if (photo.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this photo' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '../uploads', photo.imagePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await Photo.findByIdAndDelete(id);

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};

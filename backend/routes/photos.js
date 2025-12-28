import express from 'express';
import { uploadPhoto, getPhotosByCity, getPhotosByCoordinates, deletePhoto } from '../controllers/photoController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Upload photo (protected)
router.post('/upload', authenticateToken, upload.single('photo'), uploadPhoto);

// Get photos by city (public)
router.get('/city/:city', getPhotosByCity);

// Get photos by coordinates (public)
router.get('/coordinates', getPhotosByCoordinates);

// Delete photo (protected, owner only)
router.delete('/:id', authenticateToken, deletePhoto);

export default router;

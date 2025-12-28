# Photo Sharing Feature 📸

## Overview
Users can now upload and view photos of any location when checking the weather!

## Features
✅ **Upload Photos** - Share photos of the current location
✅ **View Gallery** - See photos uploaded by other users  
✅ **Location-Based** - Photos are organized by city
✅ **User Attribution** - Each photo shows who uploaded it and when
✅ **Secure** - Only authenticated users can upload
✅ **Image Modal** - Click photos to view full size with details

## How to Use

### Upload a Photo
1. Sign in to your account
2. Search for any city's weather
3. Click the **"📸 Share Photo"** button
4. Select an image (max 5MB)
5. Add an optional description
6. Click **"Upload Photo"**

### View Photos
- Photos automatically appear below the forecast
- Click any photo to view it full screen
- See who uploaded it and when
- View the photo description

## Technical Details

### Backend (New Files)
- `backend/models/Photo.js` - MongoDB schema for photos
- `backend/controllers/photoController.js` - Upload/fetch logic
- `backend/routes/photos.js` - Photo API routes
- `backend/middleware/upload.js` - Multer config for file uploads
- `backend/uploads/` - Storage for uploaded images

### Frontend (New Files)
- `src/components/PhotoUpload.jsx` - Upload modal component
- `src/components/PhotoUpload.css` - Upload UI styles
- `src/components/PhotoGallery.jsx` - Photo grid display
- `src/components/PhotoGallery.css` - Gallery styles

### API Endpoints
- `POST /api/photos/upload` - Upload a photo (protected)
- `GET /api/photos/city/:city` - Get photos by city name
- `GET /api/photos/coordinates?lat=X&lon=Y` - Get nearby photos
- `DELETE /api/photos/:id` - Delete own photo (protected)

### Database Schema
```javascript
{
  userId: ObjectId,
  userName: String,
  location: {
    city: String,
    country: String,
    coordinates: { lat: Number, lon: Number }
  },
  imagePath: String,
  description: String,
  uploadedAt: Date
}
```

## File Specifications
- **Allowed types**: JPEG, JPG, PNG, GIF, WebP
- **Max size**: 5MB per image
- **Naming**: `timestamp-userid-originalname.ext`
- **Storage**: Local filesystem (`backend/uploads/`)

## Security
- Authentication required for uploads
- File type validation
- File size limits
- Only image files allowed
- Users can only delete their own photos

## Future Enhancements
- Cloud storage (AWS S3, Cloudinary)
- Image compression
- Multiple photos per upload
- Photo moderation system
- Likes and comments
- User photo galleries

import { useState, useEffect } from 'react';
import './PhotoGallery.css';

const PhotoGallery = ({ city, lat, lon }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    if (city) {
      fetchPhotos();
    }
  }, [city]);

  const fetchPhotos = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/photos/city/${encodeURIComponent(city)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch photos');
      }

      setPhotos(data.photos || []);
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="photo-gallery">
        <h3>📸 Photos from {city}</h3>
        <div className="loading-photos">Loading photos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="photo-gallery">
        <h3>📸 Photos from {city}</h3>
        <div className="photo-error">{error}</div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="photo-gallery">
        <h3>📸 Photos from {city}</h3>
        <div className="no-photos">
          No photos yet. Be the first to share one! 📷
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="photo-gallery">
        <h3>📸 Photos from {city}</h3>
        <div className="photo-grid">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="photo-card"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={`${BACKEND_URL}${photo.imageUrl}`}
                alt={photo.description || `Photo by ${photo.userName}`}
                className="photo-thumbnail"
              />
              <div className="photo-info">
                <div className="photo-user">👤 {photo.userName}</div>
                <div className="photo-date">{formatDate(photo.uploadedAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <div className="photo-modal-overlay" onClick={closeModal}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <img
              src={`${BACKEND_URL}${selectedPhoto.imageUrl}`}
              alt={selectedPhoto.description || 'Photo'}
              className="modal-image"
            />
            <div className="modal-details">
              <div className="modal-user">
                <strong>👤 {selectedPhoto.userName}</strong>
              </div>
              {selectedPhoto.description && (
                <p className="modal-description">{selectedPhoto.description}</p>
              )}
              <div className="modal-location">
                📍 {selectedPhoto.location.city}
                {selectedPhoto.location.country && `, ${selectedPhoto.location.country}`}
              </div>
              <div className="modal-date">{formatDate(selectedPhoto.uploadedAt)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;

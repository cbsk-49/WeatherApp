import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './PhotoUpload.css';

const PhotoUpload = ({ city, country, lat, lon, onUploadSuccess }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !city) {
      setError('Please select an image and ensure location is set');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('city', city);
      if (country) formData.append('country', country);
      if (lat) formData.append('lat', lat);
      if (lon) formData.append('lon', lon);
      if (description) formData.append('description', description);

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/photos/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Success!
      setIsOpen(false);
      setSelectedFile(null);
      setPreview(null);
      setDescription('');
      if (onUploadSuccess) {
        onUploadSuccess(data.photo);
      }
    } catch (err) {
      setError(err.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
    setPreview(null);
    setDescription('');
    setError('');
  };

  if (!user) {
    return null; // Only show to logged-in users
  }

  return (
    <div className="photo-upload-container">
      <button className="upload-trigger-btn" onClick={() => setIsOpen(true)}>
        📸 Share Photo
      </button>

      {isOpen && (
        <div className="upload-modal-overlay" onClick={handleClose}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="upload-modal-header">
              <h3>Share a Photo of {city}</h3>
              <button className="close-btn" onClick={handleClose}>×</button>
            </div>

            <div className="upload-modal-body">
              {error && <div className="upload-error">{error}</div>}

              {!preview ? (
                <div className="file-input-area">
                  <label htmlFor="photo-input" className="file-input-label">
                    <div className="file-input-icon">📷</div>
                    <div>Click to select an image</div>
                    <div className="file-input-hint">Max 5MB • JPG, PNG, GIF, WebP</div>
                  </label>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="preview-area">
                  <img src={preview} alt="Preview" className="preview-image" />
                  <button className="change-photo-btn" onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                  }}>
                    Change Photo
                  </button>
                </div>
              )}

              <div className="description-area">
                <label htmlFor="description">Description (optional)</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  maxLength={500}
                  rows={3}
                />
                <div className="char-count">{description.length}/500</div>
              </div>

              <button
                className="upload-btn"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

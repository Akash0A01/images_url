import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Image uploaded successfully');
      setError(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
    }
  };

  return (
    <div className="App">
      <h1>Upload your image</h1>
      <input type="file" onChange={handleFileChange} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;

import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setUploading(true);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
        setUploading(false);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className='container'>
      <div className='background-pattern'></div>
      <div className='wrapper'>
        <div className='header'>
          <div className='icon'>📁</div>
          <h1>File Share</h1>
          <p>Upload and share files instantly</p>
        </div>

        <div className='upload-section'>
          <div className={`upload-area ${file ? 'has-file' : ''}`}>
            <div className='upload-icon'>☁️</div>
            <button className='upload-btn' onClick={onUploadClick} disabled={uploading}>
              {uploading ? (
                <><span className='spinner'></span> Uploading...</>
              ) : (
                <>📤 Choose File</>
              )}
            </button>
            <p className='upload-text'>or drag and drop your file here</p>
            {file && <p className='file-name'>📄 {file.name}</p>}
          </div>
          
          <input 
            type="file"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {result && (
          <div className='result-section'>
            <h3>✅ File uploaded successfully!</h3>
            <div className='link-container'>
              <div className='link-box'>
                <span className='link-icon'>🔗</span>
                <a href={result} target="_blank" rel="noopener noreferrer" className='download-link'>
                  {result.length > 50 ? `${result.substring(0, 50)}...` : result}
                </a>
              </div>
              <button className='copy-btn' onClick={copyToClipboard} title='Copy link'>
                📋
              </button>
            </div>
          </div>
        )}
        
        <footer className='footer'>
          <p>&copy; 2025 ShareIt. All rights reserved. | Made with ❤️ by <a href="https://hritiksingh66.github.io/portfolio-website/" target="_blank" rel="noopener noreferrer" className='author-link'>Hritik Singh</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import './index.css';  // 引入CSS文件
import FileIcon from '../../assets/icons/file';
import downloadIcon from '../../assets/icons/download.svg';

const S3FileList = ({ files }) => {
  const getFileExtension = (fileName) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'unknown';
  };

  const cleanFileName = (fileName) => {
    return fileName.replace(/\+/g, '').split('.').slice(0, -1).join('.');
  };

  const renderIcon = (fileName, fileExtension) => {
    if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
      return <img src={fileName} alt={fileName} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />;
    }

    if (fileExtension === 'pdf') {
      return <FileIcon color="#E74B3B" label="PDF" />;
    } else if (['doc', 'docx'].includes(fileExtension)) {
      return <FileIcon color="#3B97D3" label="DOC" />;
    } else if (['xls', 'xlsx'].includes(fileExtension)) {
      return <FileIcon color="#2A7B54" label="XLS" />;
    }
    return <FileIcon color="#B3B3B3" label="FILE" />;
  };

  const getFileUrl = (url) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}`;
  };

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadLink = document.createElement('a');
      const objUrl = window.URL.createObjectURL(blob);
      downloadLink.href = objUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(objUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleFileClick = (url) => {
    const newWindow = window.open(getFileUrl(url), '_blank');
    if (newWindow) {
      setTimeout(() => {
        newWindow.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="file-list-container">
      <div className="file-list">
        {files.map((file, index) => {
          const { path, url, time } = file;
          const rawFileName = path.split('/').pop() || '';
          const fileName = cleanFileName(rawFileName);
          const fileExtension = getFileExtension(rawFileName);
          return (
            <div key={index} className="file-item">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleFileClick(url);
                }}
                style={{ cursor: 'pointer' }}
              >
                {renderIcon(url, fileExtension)}
                <div className="file-info">
                  <span className="file-name">{fileName}</span>
                  <span className="file-time">
                    {new Date(time).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <img
                className="download-icon"
                src={downloadIcon}
                alt="Download file"
                onClick={(e) => {
                  e.preventDefault();
                  downloadFile(url, fileName);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default S3FileList;

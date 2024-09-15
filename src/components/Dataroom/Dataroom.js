import React, { useState } from 'react';
import { Typography } from 'antd';
import Folder from '../../components/Folder';
import S3FileList from '../../components/FileList';
import './Dataroom.css';

const { Title } = Typography;

const Dataroom = ({ title, folders, files }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderClick = (folderName) => {
    setSelectedFolder(folderName);
  };

  const filterFilesByFolder = (folder) => {
    if (folder === null) {
      return files;
    }
    return files.filter((file) => file.path.startsWith(folder));
  };

  const filteredFiles = filterFilesByFolder(selectedFolder);

  return (
    <>
      <Title level={3}>
        <span
          className={`breadcrumb-item ${selectedFolder === null ? '' : 'inactive'}`}
          onClick={() => handleFolderClick(null)}
        >
          {title}
        </span>
        {selectedFolder && (
          <>
            <span className="breadcrumb-arrow">{'>'}</span>
            <span className="breadcrumb-item active">{selectedFolder}</span>
          </>
        )}
      </Title>

      {selectedFolder === null ? (
        <div className="folder-grid">
          {folders.map((folder) => (
            <Folder key={folder} name={folder} onClick={() => handleFolderClick(folder)} />
          ))}
        </div>
      ) : (
        <S3FileList files={filteredFiles} />
      )}
    </>
  );
};

export default Dataroom;

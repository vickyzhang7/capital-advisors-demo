import React from 'react';
import './index.css';  // 引入CSS文件
import folderIcon from '../../assets/icons/folder.svg';

const Folder = ({ name, onClick }) => {
  return (
    <div className="folder-container" onClick={onClick}>
      <div className="folder-icon">
        <img src={folderIcon} alt="Folder Icon" />
      </div>
      <div className="folder-name">{name}</div>
    </div>
  );
};

export default Folder;

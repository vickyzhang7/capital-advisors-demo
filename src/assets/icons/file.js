import React from 'react';

const FileIcon = (props) => {
  const { color, label, ...rest } = props;
  return (
    <svg width={59} height={79} fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M1.225 16.085A6.275 6.275 0 0 1 7.5 9.81h44a6.275 6.275 0 0 1 6.275 6.275v55A6.275 6.275 0 0 1 51.5 77.36h-44a6.275 6.275 0 0 1-6.275-6.275v-55ZM14.049 32.335h30.904M14.049 41.035h30.904M14.049 49.734h30.904M14.049 58.434h30.904"
        stroke="#8C8C8C"
        strokeWidth={1.45}
      />
      <rect x={13.1} y={0.385} width={32.7} height={23.7} rx={2.9} fill={color} />
      <text x="20" y="16" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">
        {label}
      </text>
    </svg>
  );
};

export default FileIcon;

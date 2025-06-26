'use client';

import React from 'react';
import {
  ConnectionLineComponentProps,
  getBezierPath,
} from 'reactflow';

const CustomConnectionLine: React.FC<ConnectionLineComponentProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  connectionLineStyle,
}) => {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  return (
    <>
      <path
        fill="none"
        stroke="#4F46E5" // indigo-600
        strokeWidth={2}
        className="react-flow__connection-path"
        d={edgePath}
        style={connectionLineStyle}
      />
      <circle cx={toX} cy={toY} r={3} fill="#4F46E5" />
    </>
  );
};

export default CustomConnectionLine;

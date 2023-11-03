import React from 'react';
import styled from 'styled-components';

const PointDot = styled.div`
  border: solid 3px white;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.3),
    0 0 0 2px rgba(0,0,0,0.2),
    0 5px 4px rgba(0,0,0,0.4);
  height: 10px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 10px;
`;

function Polygon(props) {
  const { geometry } = props.annotation;

  if (!geometry || !geometry.points || geometry.points.length === 0) return null;

  // Extract points
  const points = geometry.points;

  // Create a path string for the SVG
  const pathString = generatePathString(points);

  return (
    <div
      className={`linesContainer ${props.className}`}
      style={{
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden', // Hide overflowing content
        ...props.style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d={pathString}
          stroke="red" // Customize stroke color
          strokeWidth="0.40" // Customize stroke width (adjust as needed)
          strokeDasharray="1" // Add dashed line
          fill="rgba(128, 0, 0, 0.5)"
          strokeLinecap="round" // Rounded line ends
          strokeLinejoin="round" // Rounded line joins
        />
      </svg>
      {geometry.points.map((item, i) => (
        <PointDot key={`${i}_${item.x}_${item.y}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} />
      ))}
    </div>
  );
}

// Function to generate a path string for the SVG
function generatePathString(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    if (i === 0) {
      path.push(`M ${x} ${y}`);
    } else {
      path.push(`L ${x} ${y}`);
    }
  }
  // Close the path to create a polygon
  path.push('Z');
  return path.join(' ');
}

Polygon.defaultProps = {
  className: '',
  style: {},
};

export default Polygon;

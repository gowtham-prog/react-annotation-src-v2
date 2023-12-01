import React from 'react';
import styled from 'styled-components';
import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../../utils/pointsUtils';

const Container = styled.div`
background: white;
border-radius:6px; 
box-shadow:
  0px 1px 5px 0px rgba(0, 0, 0, 0.2),
  0px 2px 2px 0px rgba(0, 0, 0, 0.14),
  0px 3px 1px -2px rgba(0, 0, 0, 0.12);
padding: 6px 10px; 
margin-top: 8px;
margin-left: 8px;
margin-bottom :8px;
margin-right :8px;
color: black; 
font-weight: bold; 
`;

function Content(props) {
  const { geometry } = props.annotation;
  if (!geometry) return null;
  const isPolygon = geometry.type === 'POLYGON';
  const x = isPolygon ? getHorizontallyCentralPoint(geometry.points) : geometry.x;
  const y = isPolygon ? (getVerticallyLowestPoint(geometry.points) + 10 * (1 / 5) + 10 * (4 / 5)*(1/10000)) : geometry.y;

  // Adjustments for better positioning near edges
  const leftPosition = x < 80 ? x + '%' : 'auto';
  const topPosition = y < 80 ? (y + geometry.height) + '%' : 'auto';
  const rightPosition = x > 80 ? (100 -x - geometry.width) + '%' : 'auto';
  const bottomPosition = (y) > 80 ? (100 -y)  + '%' : 'auto';

  return (
    <Container
      style={{
        position: 'absolute',
        // left: `${geometry.type === 'POLYGON' ? getHorizontallyCentralPoint(geometry.points) + '%' : geometry.x + '%'}`,
        // top: `${geometry.type === 'POLYGON'
        // ? `${getVerticallyLowestPoint(geometry.points) + 10 * (1 / 5) + 10 * (4 / 5)*(1/10000)}%`
        // : `${geometry.y + geometry.height}%`}`,
        left : leftPosition,
        top : topPosition,
        right : rightPosition,
        bottom : bottomPosition,
        zIndex:100,        ...props.style
      }}
      className={props.className}
      geometry={geometry}
      
    >
      {props.annotation.data &&  props.annotation.data.text }
      
    </Container>
  );
}

Content.defaultProps = {
  style: {},
  className: '',
};

export default Content;

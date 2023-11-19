import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getHorizontallyCentralPoint, getVerticallyLowestPoint } from '../../utils/pointsUtils';

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: 8rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a202c;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow:
    0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  transform-origin: top left;
`;

const Button = styled.a`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #1a202c;
  text-decoration: none;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #3699FF;
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0 0 0.375rem 0.375rem;
  }
`;

function PolygonControls(props) {
  const { geometry } = props.annotation;

  if (!geometry || !geometry.points || geometry.points.length === 0) return null;

  const zoomBetweenZeroAndOne = Math.abs((props.imageZoomAmount - 1) / 4 - 1);
  const fontSize = 0.875 / 5 + zoomBetweenZeroAndOne * (4 / 5);
  const paddingHorizontal = 0.875 / 5 * 8 + 4 / 5 * 8 * zoomBetweenZeroAndOne;
  const paddingVertical = 0.875 / 5 * 16 + 4 / 5 * 16 * zoomBetweenZeroAndOne;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${getHorizontallyCentralPoint(geometry.points)}%`,
        top: `${getVerticallyLowestPoint(geometry.points) + (10 * (1 / 5) + 10 * (4 / 5) * zoomBetweenZeroAndOne)}%`,
        zIndex: 1000,
        ...props.style,
      }}z
    >
      <Container className={props.className}>
        {geometry.points.length >= 2 && (
          <Button
            onClick={props.onSelectionUndo}
          >
            Undo
          </Button>
        )}
        <Button
          onClick={props.onSelectionClear}
        >
          Clear
        </Button>
        {geometry.points.length >= 3 && (
          <Button
            onClick={props.onSelectionComplete}
          >
            Done
          </Button>
        )}
      </Container>
    </div>
  );
}

PolygonControls.defaultProps = {
  className: '',
  style: {},
};

export default PolygonControls;

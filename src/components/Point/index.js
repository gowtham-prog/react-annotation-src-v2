import React,{useState, useLayoutEffect} from 'react'
import { Rnd as Resizable } from 'react-rnd'
import { percentageToPx, pxToPercentage } from '../../utils/offsetCoordinates';

function Point(props) {
  const { geometry, data } = props.annotation;

  if (!geometry) return null
  const [parentDimensions, setParentDimensions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateParentDimensions = () => {
      const parent = document.getElementById('container-RIA');
      const { width, height } = parent.getBoundingClientRect();
      setParentDimensions({ width, height });
    };

    const handleLoad = () => {
      updateParentDimensions();
    };
    updateParentDimensions();

    window.addEventListener('load', handleLoad);
    window.addEventListener('resize', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleLoad)
    };
  }, [props.annotation]); 
  
  if (!parentDimensions.width || !parentDimensions.height) {
    return null;
  }

  return (
    <Resizable
      style={{
        border: 'solid 4px red',
        borderRadius: '80%',
        boxSizing: 'border-box',
        pointerEvents: 'auto',
        zIndex: 1000,
        position: 'absolute',
        transform: 'translate3d(-50%, -50%, 0)'
      }}
      bounds="parent"
      size={{
        width: 16,
        height: 16
      }}
      enableResizing={false}
      onDragStop={(e, d, k) => {
        const newX = pxToPercentage(d.x, parentDimensions.width);
        const newY = pxToPercentage(d.y, parentDimensions.height);
        geometry.x = newX;
        geometry.y = newY;
        props.onChange(props.annotation);
        props.onModify(props.annotation);
      }}
      position={{
        y: percentageToPx(geometry.y,parentDimensions.height),
        x: percentageToPx(geometry.x,parentDimensions.width),
      }}
    />
  )
}

export default Point

import React, {useState,useLayoutEffect} from 'react';
import { Rnd as Resizable } from 'react-rnd';
import { percentageToPx, pxToPercentage } from '../../utils/offsetCoordinates';

function Rectangle(props) {
  const { geometry, data } = props.annotation;

  if (!geometry) return null;
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
  

  const handleDragStop = (e, d) => {
    const newX = pxToPercentage(d.x,parentDimensions.width) ;
    const newY = pxToPercentage(d.y,parentDimensions.height) ;
    geometry.x = newX;
    geometry.y = newY;
    props.onChange(props.annotation);
    props.onModify(props.annotation);
  };

  const handleResizeStop = (e, direction, ref, d) => { 
    const newWidth = parseFloat(ref.style.width);
    const newHeight = parseFloat(ref.style.height);
    geometry.width = newWidth;
    geometry.height = newHeight;
    props.onChange(props.annotation);
    props.onModify(props.annotation);
  
  };


  return (
    <Resizable
      id={data.id}
      style={{
        border: 'dashed 3px red',
        pointerEvents: 'auto',
        zIndex: 10,
        backgroundColor: 'rgba(128, 0, 0, 0.5)',
      }}
      bounds="parent"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      position={{
        y: percentageToPx(geometry.y,parentDimensions.height),
        x: percentageToPx(geometry.x,parentDimensions.width),
      }}
      
      size={{
        width: `${geometry.width}%`,
        height: `${geometry.height}%`,
      }}
    />
  );
}

Rectangle.defaultProps = {
  className: '',
  style: {},
};

export default Rectangle;

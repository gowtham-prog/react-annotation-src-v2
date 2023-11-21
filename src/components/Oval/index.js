import React, { useLayoutEffect, useState } from 'react'
import { Rnd as Resizable } from 'react-rnd'
import { percentageToPx, pxToPercentage } from '../../utils/offsetCoordinates';

function Oval(props) {
  const { geometry, data, selection } = props.annotation
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
  

  if (!geometry) return null

  return (
    <Resizable
      className={props.className}
      style={{
        border: 'dashed 3px red',
        borderRadius: '100%',
        boxSizing: 'border-box',
        transition: 'box-shadow 0.21s ease-in-out',
        position: 'absolute',
        backgroundColor: 'rgba(128, 0, 0, 0.5)',
        zIndex: 100,
        ...props.style
      }}
      bounds="parent"
      size={{
        height: `${geometry.height}%`,
        width: `${geometry.width}%`
      }}
      onDragStop={(e, d, k) => {
        const newX = pxToPercentage(d.x, parentDimensions.width);
        const newY = pxToPercentage(d.y, parentDimensions.height);
        geometry.x = newX;
        geometry.y = newY;
        props.onChange(props.annotation);
        props.onModify(props.annotation);
      }}
      enableResizing={
        !selection
          ? { bottom: true, top: true, left: true, right: true }
          : false
      }
      disableDragging = {
        !selection ? false: true
      }
      onResizeStop={(e, direction, ref, d) => {
        const newWidth = parseFloat(ref.style.width);
        const newHeight = parseFloat(ref.style.height);
        geometry.width = newWidth;
        geometry.height = newHeight;
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

Oval.defaultProps = {
  className: '',
  style: {}
}

export default Oval
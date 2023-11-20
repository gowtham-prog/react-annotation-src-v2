import React, { useLayoutEffect, useState } from 'react'
import { Rnd as Resizable } from 'react-rnd'

function Oval(props) {
  const { onChange, onSubmit, annotation } = props
  const { geometry, data, selection } = annotation
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

    return () => {
      window.removeEventListener('load', handleLoad);
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
        if (!selection) {
          props.annotation.geometry.x = Math.round((d.x / parentDimensions.width) * 100)
          props.annotation.geometry.y = Math.round((d.y / parentDimensions.height) * 100)
          props.onSubmit()
        }
      }}
      enableResizing={
        !selection
          ? { bottom: true, top: true, left: true, right: true }
          : false
      }
      disableDragging = {
        !geometry ? false: true
      }
      onResizeStop={(e, direction, ref, d) => {
        if (!selection) {
          props.annotation.geometry.width = parseFloat(ref.style.width)
          props.annotation.geometry.height = parseFloat(ref.style.height)
          props.onSubmit()
        }
      }}
      position={{
        x: Math.round((geometry.x * parentDimensions.width) / 100),
        y: Math.round((geometry.y * parentDimensions.height) / 100),
      }}
    />
  )
}

Oval.defaultProps = {
  className: '',
  style: {}
}

export default Oval
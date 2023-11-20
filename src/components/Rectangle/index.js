import React, {useState,useLayoutEffect} from 'react';
import { Rnd as Resizable } from 'react-rnd';

function Rectangle(props) {
  const { geometry, data,selection } = props.annotation;

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

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [props.annotation]); 

  if (!parentDimensions.width || !parentDimensions.height) {
    return null;
  }
  

  const handleDragStop = (e, d) => {
    if (!selection) {
      props.annotation.geometry.x = Math.round((d.x / parentDimensions.width) * 100)
      props.annotation.geometry.y = Math.round((d.y / parentDimensions.height) * 100)
      props.onSubmit()
    }
  };

  const handleResizeStop = (e, direction, ref, d) => {
    if(!selection){
      props.annotation.geometry.width = parseFloat(ref.style.width)
      props.annotation.geometry.height = parseFloat(ref.style.height)
      props.onSubmit()
    }
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
        y: Math.round((geometry.y*parentDimensions.height)/100),
        x: Math.round((geometry.x*parentDimensions.width)/100),
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

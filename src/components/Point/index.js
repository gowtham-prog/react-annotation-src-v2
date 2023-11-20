import React,{useState, useLayoutEffect} from 'react'
import { Rnd as Resizable } from 'react-rnd'

function Point(props) {
  const { geometry, data,selection } = props.annotation
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

    return () => {
      window.removeEventListener('load', handleLoad);
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
        if (!selection) {
          props.annotation.geometry.x = Math.round((d.x / parentDimensions.width) * 100)
          props.annotation.geometry.y = Math.round((d.y / parentDimensions.height) * 100)
          props.onSubmit()
        }
      }}
      position={{
        y: Math.round((geometry.y*parentDimensions.height)/100),
        x: Math.round((geometry.x*parentDimensions.width)/100),
      }}
    />
  )
}

export default Point

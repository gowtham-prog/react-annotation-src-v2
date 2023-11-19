import React from 'react';
import { Rnd as Resizable } from 'react-rnd';

function Rectangle(props) {
  const { geometry, data } = props.annotation;

  if (!geometry) return null;

  const handleDragStop = (e, d) => {
    if (
      props.annotation.geometry.xPx !== d.x ||
      props.annotation.geometry.yPx !== d.y
    ) {
      props.annotation.geometry.x =
        (d.x * props.annotation.geometry.x) / props.annotation.geometry.xPx;
      props.annotation.geometry.y =
        (d.y * props.annotation.geometry.y) / props.annotation.geometry.yPx;
      props.annotation.geometry.xPx = d.x;
      props.annotation.geometry.yPx = d.y;
      props.onChange(props.annotation);
      props.onSubmit();
    }
  };

  const handleResizeStop = (e, direction, ref, d) => {
    const newAnnotation = {
      ...props.annotation,
      geometry: {
        ...props.annotation.geometry,
        xPx: props.annotation.geometry.xPx - d.width,
        yPx: props.annotation.geometry.yPx - d.height,
        width: parseFloat(ref.style.width),
        height: parseFloat(ref.style.height),
      },
    };

    if (direction.includes('top') || direction.includes('left')) {
      newAnnotation.geometry.x =
        (props.annotation.geometry.xPx - d.width) *
        props.annotation.geometry.x /
        props.annotation.geometry.xPx;
      newAnnotation.geometry.y =
        (props.annotation.geometry.yPx - d.height) *
        props.annotation.geometry.y /
        props.annotation.geometry.yPx;
    }

    props.onChange(newAnnotation);
    props.onSubmit();
  };

  return (
    <Resizable
      id={data.id}
      style={{
        border: 'dashed 2px red',
        pointerEvents: 'auto',
        zIndex: 10,
        backgroundColor: 'rgba(128, 0, 0, 0.5)',
      }}
      bounds="parent"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      position={{
        x: geometry.xPx,
        y: geometry.yPx,
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

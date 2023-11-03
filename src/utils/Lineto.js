import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const defaultAnchor = { x: 0.5, y: 0.5 };
const defaultBorderColor = '#f00';
const defaultBorderStyle = 'solid';
const defaultBorderWidth = 1;

const optionalStyleProps = {
  borderColor: PropTypes.string,
  borderStyle: PropTypes.string,
  borderWidth: PropTypes.number,
  className: PropTypes.string,
  zIndex: PropTypes.number,
};

function LineTo(props) {
  const fromAnchor = useRef(defaultAnchor);
  const toAnchor = useRef(defaultAnchor);
  const delay = useRef(null);
  const t = useRef(null);

  const parseDelay = (value) => {
    if (typeof value === 'undefined') {
      return value;
    } else if (typeof value === 'boolean' && value) {
      return 0;
    }
    const parsedDelay = parseInt(value, 10);
    if (isNaN(parsedDelay) || !isFinite(parsedDelay)) {
      throw new Error(`LineTo could not parse delay attribute "${value}"`);
    }
    return parsedDelay;
  };

  const parseAnchorPercent = (value) => {
    const percent = parseFloat(value) / 100;
    if (isNaN(percent) || !isFinite(percent)) {
      throw new Error(`LineTo could not parse percent value "${value}"`);
    }
    return percent;
  };

  const parseAnchorText = (value) => {
    switch (value) {
      case 'top':
        return { y: 0 };
      case 'left':
        return { x: 0 };
      case 'middle':
        return { y: 0.5 };
      case 'center':
        return { x: 0.5 };
      case 'bottom':
        return { y: 1 };
      case 'right':
        return { x: 1 };
      default:
        return null;
    }
  };

  const parseAnchor = (value) => {
    if (!value) {
      return defaultAnchor;
    }
    const parts = value.split(' ');
    if (parts.length > 2) {
      throw new Error('LineTo anchor format is "<x> <y>"');
    }
    const [x, y] = parts;
    return {
      ...defaultAnchor,
      ...(x ? parseAnchorText(x) || { x: parseAnchorPercent(x) } : {}),
      ...(y ? parseAnchorText(y) || { y: parseAnchorPercent(y) } : {}),
    };
  };

  useEffect(() => {
    fromAnchor.current = parseAnchor(props.fromAnchor);
    toAnchor.current = parseAnchor(props.toAnchor);
    delay.current = parseDelay(props.delay);
  }, [props.fromAnchor, props.toAnchor, props.delay]);

  useEffect(() => {
    delay.current = parseDelay(props.delay);
    if (typeof delay.current !== 'undefined') {
      t.current = setTimeout(() => forceUpdate(), delay.current);
    }
    return () => {
      if (t.current) {
        clearTimeout(t.current);
        t.current = null;
      }
    };
  }, [props.delay]);

  const detect = () => {
    const { from, to, within = '' } = props;
    const a = findElement(from);
    const b = findElement(to);

    if (!a || !b) {
      return null;
    }

    const anchor0 = fromAnchor.current;
    const anchor1 = toAnchor.current;

    const box0 = a.getBoundingClientRect();
    const box1 = b.getBoundingClientRect();

    let offsetX = window.pageXOffset;
    let offsetY = window.pageYOffset;

    if (within) {
      const p = findElement(within);
      const boxp = p.getBoundingClientRect();

      offsetX -= boxp.left + (window.pageXOffset || document.documentElement.scrollLeft) - p.scrollLeft;
      offsetY -= boxp.top + (window.pageYOffset || document.documentElement.scrollTop) - p.scrollTop;
    }

    const x0 = box0.left + box0.width * anchor0.x + offsetX;
    const x1 = box1.left + box1.width * anchor1.x + offsetX;
    const y0 = box0.top + box0.height * anchor0.y + offsetY;
    const y1 = box1.top + box1.height * anchor1.y + offsetY;

    return { x0, y0, x1, y1 };
  };

  const findElement = (className) => {
    return document.getElementsByClassName(className)[0];
  };

  const forceUpdate = () => {
    // Use a forceUpdate function to trigger a re-render
    setForceUpdate({});
  };

  const points = detect();
  return points ? <LineElement {...points} {...props} /> : null;
}

LineTo.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  within: PropTypes.string,
  fromAnchor: PropTypes.string,
  toAnchor: PropTypes.string,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  ...optionalStyleProps,
};

export default LineTo;

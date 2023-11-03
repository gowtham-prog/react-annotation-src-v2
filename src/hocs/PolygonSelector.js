import * as turf from '@turf/turf';
import { getCoordPercentage } from '../utils/offsetCoordinates';

export const TYPE = 'POLYGON';

function isPointOnEdge(point, polygonPoints) {
  if (!polygonPoints || polygonPoints.length < 3 || !point.x || !point.y) {
    return false;
  }

  for (let i = 0; i < polygonPoints.length; i++) {
    const currentPoint = polygonPoints[i];
    const nextPoint = polygonPoints[(i + 1) % polygonPoints.length];
    const dist = turf.distance(turf.point([point.x, point.y]), turf.lineString([[currentPoint.x, currentPoint.y], [nextPoint.x, nextPoint.y]]));

    if (dist < 1e-5) {
      return true; // Point is on the edge
    }
  }

  return false;
}

export function intersects(point, geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return false;

  const polygonPoints = geometry.points.map((point) => ({ x: point.x, y: point.y }));

  if (isPointOnEdge(point, polygonPoints)) {
    return true;
  }

  const polygon = turf.polygon([polygonPoints]);
  const pointFeature = turf.point([point.x, point.y]);

  return turf.booleanPointInPolygon(pointFeature, polygon);
}

export function area(geometry) {
  if (!geometry || !geometry.points || geometry.points.length < 3) return 0;

  const polygonPoints = geometry.points.map((point) => [point.x, point.y]);
  const polygon = turf.polygon([polygonPoints]);

  return turf.area(polygon);
}

export const methods = {
  onSelectionComplete: (annotation) => ({
    ...annotation,
    selection: {
      ...annotation.selection,
      showEditor: true,
      mode: 'EDITING',
    },
  }),

  onSelectionClear: (annotation) => ({
    ...annotation,
    geometry: {
      ...annotation.geometry,
      points: [],
    },
  }),

  onSelectionUndo: (annotation) => ({
    ...annotation,
    geometry: {
      ...annotation.geometry,
      points: annotation.geometry.points.slice(0, -1),
    },
  }),

  onClick: (annotation, e) => {
    const coordOfClick = getCoordPercentage(e);

    return {
      ...annotation,
      geometry: {
        ...annotation.geometry,
        type: TYPE,
        points: !annotation.geometry ? [coordOfClick] : [...annotation.geometry.points, coordOfClick],
      },
      selection: {
        ...annotation.selection,
        mode: 'SELECTING',
      },
    };
  },
};

export default {
  TYPE: TYPE,
  intersects: intersects,
  area: area,
  methods: methods,
};

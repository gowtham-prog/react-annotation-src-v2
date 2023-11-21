import React from 'react'

import Point from './Point'
import Editor from './Editor'
import FancyRectangle from './FancyRectangle'
import Rectangle from './Rectangle'
import Oval from './Oval'
import Content from './Content'
import Overlay from './Overlay'
import FreeHand from './FreeHand'
import Polygon from './Polygon'
import PolygonControls from './PolygonControls'
import {
  RectangleSelector,
  PointSelector,
  FreeHandSelector,
  OvalSelector,
  PolygonSelector
} from '../selectors'

export default {
  ref: () => {},
  onChange: () => {},
  onSubmit: () => {},
  type: PolygonSelector.TYPE,
  selectors: [
    RectangleSelector,
    PointSelector,
    OvalSelector,
    PolygonSelector,
    FreeHandSelector
  ],
  disableAnnotation: false,
  disableSelector: false,
  disableEditor: false,
  imageZoomAmount: 1,
  disableOverlay: false,
  activeAnnotationComparator: (a, b) => a === b,
  renderSelector: ({ annotation}) => {
    switch (annotation.geometry.type) {
      case RectangleSelector.TYPE:
        return <FancyRectangle annotation={annotation} />
      case PointSelector.TYPE:
        return <Point annotation={annotation} />
      case FreeHandSelector.TYPE:
        return <FreeHand annotation={annotation} />
      case PolygonSelector.TYPE:
        return <Polygon annotation={annotation} />
      case OvalSelector.TYPE:
        return <Oval annotation={annotation} />
      default:
        return null
    }
  },
  renderEditor: ({ annotation, onChange, onSubmit }) => (
    <Editor annotation={annotation} onChange={onChange} onSubmit={onSubmit} />
  ),
  renderPolygonControls: ({
    annotation,
    onSelectionComplete,
    onSelectionClear,
    onSelectionUndo,
    imageZoomAmount
  }) => (
    <PolygonControls
      annotation={annotation}
      onSelectionComplete={onSelectionComplete}
      onSelectionClear={onSelectionClear}
      onSelectionUndo={onSelectionUndo}
      imageZoomAmount={imageZoomAmount}
    />
  ),
  renderHighlight: ({ key, annotation, onChange, onModify }) => {
    if (annotation && annotation.geometry && annotation.geometry.type) {
      switch (annotation.geometry.type) {
        case RectangleSelector.TYPE:
          return (
            <Rectangle
              key={key}
              annotation={annotation}
              onChange={onChange}
              onModify={onModify}            
            />
          );
  
        case FreeHandSelector.TYPE:
          return (
            <FreeHand
              key={key}
              annotation={annotation}
              onChange={onChange}
              onModify={onModify}
            />
          );
        case PointSelector.TYPE:
          return (
            <Point
              key={key}
              annotation={annotation}
              onChange={onChange}
              onModify={onModify}
            />
          );
        case OvalSelector.TYPE:
          return (
            <Oval
              key={key}
              annotation={annotation}
              onChange={onChange}
              onModify={onModify}
            />
          );
        case PolygonSelector.TYPE:
          return (
            <Polygon
              key={key}
              annotation={annotation}
              onChange={onChange}
              onModify={onModify}  
            />
          );
        default:
          return null;
      }
    } else {
     
      return null;
    }
  },
  
  renderContent: ({ key, annotation }) => (
    <Content key={key} annotation={annotation} />
  ),
  renderOverlay: ({ type, annotation }) => {
    switch (type) {
      case PolygonSelector.TYPE:
        return <Overlay>Click to Add Points to Annotation</Overlay>
      case PointSelector.TYPE:
        return <Overlay>Click to Annotate</Overlay>
      default:
        return <Overlay>Click and Drag to Annotate</Overlay>
    }
  }
}

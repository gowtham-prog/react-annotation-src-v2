import React, { Component } from 'react'
import Annotation from '../../../../../src'
import {
  PointSelector,
  RectangleSelector,
  OvalSelector,
  PolygonSelector
} from '../../../../../src/selectors'

import Button from '../../Button'

import mocks from '../../../mocks'
import img from '../../../img.jpeg'

export default class Multiple extends Component {
  state = {
    type: RectangleSelector.TYPE,
    annotations: mocks.annotations,
    annotation: {}
  }

  onChange = (annotation) => {
    this.setState({ annotation })
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    console.log("annotation", annotation)
    if (data && data.id) {
      // If data.id exists, modify the geometry of the annotation with that id
      const updatedAnnotations = this.state.annotations.map((existingAnnotation) =>
        existingAnnotation.data && existingAnnotation.data.id === data.id
          ? { ...existingAnnotation, geometry }
          : existingAnnotation
      );
  
      this.setState({
        annotation: {},
        annotations: updatedAnnotations,
      });
    } else {
      // If data.id does not exist, add a new annotation
      this.setState((prevState) => ({
        annotation: {},
        annotations: [
          ...prevState.annotations,
          {
            geometry,
            data: {
              ...data,
              id: Math.random(),
            },
          },
        ],
      }));
    }
  
    console.log("state", this.state);
  };
  
  onChangeType = (e) => {
    this.setState({
      annotation: {},
      type: e.currentTarget.innerHTML
    })
  }

  render () {
    return (
      <div>
        <Button
          onClick={this.onChangeType}
          // active={RectangleSelector.TYPE === this.state.type}
        >
          {RectangleSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          // active={PointSelector.TYPE === this.state.type}
        >
          {PointSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          // active={OvalSelector.TYPE === this.state.type}
        >
          {OvalSelector.TYPE}
        </Button>
        <Button
          onClick={this.onChangeType}
          // active={OvalSelector.TYPE === this.state.type}
        >
          {PolygonSelector.TYPE}
        </Button>
        <Annotation
          src={img}
          alt='Two pebbles anthropomorphized holding hands'

          annotations={this.state.annotations}

          type={this.state.type}
          value={this.state.annotation}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}
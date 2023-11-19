import React, { PureComponent as Component } from 'react'

const withRelativeMousePos = (key = 'relativeMousePos') => DecoratedComponent => {
  class WithRelativeMousePos extends Component {
    state = { x: null, y: null}

    ref = el => {
      this.container = el
    }

    onMouseMove = (e) => {
      this.setState({
        x: (e.nativeEvent.offsetX / this.container.width) * 100,
        y: (e.nativeEvent.offsetY / this.container.height) * 100,
      })
    }

    onMouseLeave = (e) => {
      this.setState({ x: null, y: null })
    }

    render () {
      const hocProps = {
        [key]: {
          ref: this.ref,
          onMouseMove: this.onMouseMove,
          onMouseLeave: this.onMouseLeave,
          x: this.state.x,
          y: this.state.y,

        }
      }

      return (
        <DecoratedComponent
          {...this.props}
          {...hocProps}
        />
      )
    }
  }

  WithRelativeMousePos.displayName = `withRelativeMousePos(${DecoratedComponent.displayName})`;

  return WithRelativeMousePos;
}

export default withRelativeMousePos;
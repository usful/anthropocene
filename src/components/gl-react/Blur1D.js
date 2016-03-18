import GL from 'gl-react';
import React from 'react';

const {
  PropTypes
  } = React;

const shaders = GL.Shaders.create({
  blur1D: {
    frag: require('./blur1D.frag')
  }
});

module.exports = GL.createComponent(
  ({ width, height, direction, children: t, ...rest }) =>
    <GL.Node
      {...rest}
      shader={shaders.blur1D}
      width={width}
      height={height}
      uniforms={{
      direction,
      resolution: [ width, height ],
      t
    }}
    />,
  {
    displayName: "Blur1D",
    propTypes: {
      width: PropTypes.number,
      height: PropTypes.number,
      direction: PropTypes.array.isRequired,
      children: PropTypes.any.isRequired
    }
  });
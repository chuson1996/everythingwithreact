import React from 'react';
import PropTypes from 'prop-types';
import { withState, withHandlers, compose } from 'recompose';
import styled from 'styled-components';

const enhance = compose(
  withState('hovering', 'changeHovering', false),
  withHandlers({
    onMouseOver: ({ changeHovering }) => () => changeHovering(() => true),
    onMouseLeave: ({ changeHovering }) => () => changeHovering(() => false)
  })
);

const easeOut = 'cubic-bezier(0.215, 0.61, 0.355, 1)';

const Frame = styled.div`
  position: relative;
  clip-path: inset(0 0);
  ${({ hovering }) => hovering && `
    clip-path: inset(8% 8%);
  `}
  overflow: none;

  transition: clip-path .3s ${easeOut};
`;

const ImageDiv = styled.div`
  background-image: url(${({ src }) => src});
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transform: scale(1);
  ${({ hovering }) => hovering && `
    transform: scale(1.05);
  `}
  transition: transform .3s ${easeOut};
`;

const InvisibleImage = styled.img`
  visibility: hidden;
`;

const ZoomOnHoverImage = enhance(function ZoomOnHoverImage({ hovering, onMouseLeave, onMouseOver, src }) {
  return (
    <Frame hovering={hovering}>
      <ImageDiv hovering={hovering} src={src} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}/>
      <InvisibleImage src={src} width="100%"/>
    </Frame>
  );
});

ZoomOnHoverImage.defaultProps = {
  src: PropTypes.string.isRequired
};

export default ZoomOnHoverImage;
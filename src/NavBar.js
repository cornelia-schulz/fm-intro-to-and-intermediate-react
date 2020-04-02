import React, { useState } from 'react';
import { Link } from '@reach/router';
import { css, keyframes } from '@emotion/core';
import Colours from './Colours';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const NavBar = () => {
  const [padding, setPadding] = useState(15)
  return (
    // eslint-disable-next-line
  <header
    onClick = {() => setPadding(padding + 1)}
    css={css`
      background-color: ${Colours.dark};
      padding: ${padding}px;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <span
      css={css`
        font-size: 60px;
        display: inline-block;

        &:hover {
          animation: 1s ${spin} linear infinite;
          text-decoration: underline;
        }
      `}
      aria-label="logo"
      role="img"
    >🐹</span>
  </header>
  )
}

export default NavBar;
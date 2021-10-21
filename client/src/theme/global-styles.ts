import { createGlobalStyle } from "styled-components";

import { ThemeProps } from './types';

export const GlobalStyles = createGlobalStyle<ThemeProps>`
  * {
    box-sizing: border-box;
  }
  
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.font};
    transition: all 0.50s linear;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.link.color};
    cursor: pointer;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: #1064EA;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.font};
  }
`;
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --black: #1E1E1E;
    --gray-600: #323232;
    --gray-500: #424242;
    --gray-400: #4C4C4C;
    --gray-300: #515151;
    --gray-200: #B2B2B2;
    --gray-100: #CECECE;
    --white: #FFFFFF;

    --teal: #63B0AF;
    --dark-teal: #599E9D;
    --yellow: #E7D1A1;
    --pink: #FF32C6;
    --blue: #3FA4FF;
    --purple: #C478FF;
    --red: #CF1C1C;
    
    --border-radius-s: 7px;
    --border-radius-m: 8px;
    --border-radius-l: 20px;
    --border-radius-xl: 30px;
    
    --teal-shadow: rgba(99, 176, 175, 0.6)    ;

}
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  transition: background-color 0.3s, border 0.3s;
}
body {
  font-family: "Poppins", sans-serif;
  color: var(--gray-200);
  background-color: var(--black);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 18px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--gray-200);
  color: var(--gray-300);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--teal);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}
`;
export default GlobalStyles;

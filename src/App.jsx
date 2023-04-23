import { Weather } from "./components/Weather";
import styled, { createGlobalStyle } from 'styled-components';

function App () {
  // styled-components
  const GlobalStyle = createGlobalStyle`
    :root {
      font-family: 'Roboto Slab', Roboto, Helvetica, Arial, sans-serif;
      font-size: 15px;
      line-height: 20px;
      line-height: 1.5;
      font-weight: 400;

      color-scheme: light dark;
      color: #FFFFFF;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }

    body {
      width: auto;
      height: 100%;
      background: linear-gradient(180deg, #30BBBB 0%, #6CD6D6 17.71%, #95FFFF 100%);
      margin: 0;
      padding: 0;
    }
  `
  const App = styled.div`
    max-width: 414px;
    margin: 0 auto;
    padding: 60px 25px;
  `

  return (
    <App>
      <GlobalStyle />
      <Weather />
    </App>
  );
}

export default App;
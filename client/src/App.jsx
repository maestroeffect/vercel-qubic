import React from "react";
import Router from "./Router";

// import i18n (needs to be bundled ;)) 
import './utils/i18n';
import { ThemeProviderWrapper } from "./context/ThemeContext";


function App() {
  console.log('runing app.js')
  return <>
    <ThemeProviderWrapper>
      <Router />
    </ThemeProviderWrapper>
  </>;
}

export default App;

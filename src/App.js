import React from "react";
import Header from "./components/Header/header";
import Body from "./components/Body/body";

function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Body />
    </div>
  );
}

export default App;

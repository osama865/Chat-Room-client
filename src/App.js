import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

// components
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;

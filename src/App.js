import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectComp from "./Auth";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Routes>
            <Route path="" element={<ProjectComp />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

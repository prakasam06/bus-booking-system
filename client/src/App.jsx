import "./index.css";
import routes from "../routes";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
}

export default App;

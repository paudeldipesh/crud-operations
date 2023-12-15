import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "./components";
import { AllRoutes } from "./routes";

export default function App() {
  return (
    <Router>
      <Navbar />
      <AllRoutes />
    </Router>
  );
}

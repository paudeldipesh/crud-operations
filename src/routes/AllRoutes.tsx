import { Routes, Route } from "react-router-dom";
import { Create, Read, Update } from "../pages";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/read" element={<Read />} />
      <Route path="/edit/:id" element={<Update />} />
    </Routes>
  );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/admin" element={<h1>Dashboard</h1>} />
            <Route path="/admin/usuarios" element={<h1>Usuarios</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

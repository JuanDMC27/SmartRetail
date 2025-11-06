import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/admin/Sidebar";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/productos";
import Sucursales from "./pages/Sucursales";
import { AISidebar } from "./components/admin/AiSidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
    <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/admin" element={ <Dashboard/>} />
            <Route path="/admin/productos" element={ <Productos /> } />
            <Route path="/admin/sucursales" element={ <Sucursales /> } />
          </Routes>
        </div>
      < AISidebar />
      </div>
    </BrowserRouter>
  );
}

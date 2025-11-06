import Sidebar from "../components/admin/Sidebar";

export default function Productos() {
  // Datos estáticos
    const productos = [
        {
        nombre: "Camiseta Blanca",
        categoria: "TSHIRT",
        genero: "Hombre",
        talla: "M",
        precio: 35000,
        stock: 40,
        sucursal: "Sucursal Norte",
        },
        {
        nombre: "Jean Clásico",
        categoria: "JEANS TERMINADOS",
        genero: "Mujer",
        talla: "L",
        precio: 89000,
        stock: 20,
        sucursal: "Sucursal Norte",
        },
        {
        nombre: "Pijama Algodón",
        categoria: "PIJAMAS",
        genero: "Niña",
        talla: "10",
        precio: 55000,
        stock: 15,
        sucursal: "Sucursal Sur",
        },
        {
        nombre: "Buzo Deportivo",
        categoria: "BUZO",
        genero: "Hombre",
        talla: "L",
        precio: 65000,
        stock: 10,
        sucursal: "Sucursal Norte",
        },
        {
        nombre: "Vestido Floral",
        categoria: "VESTIDOS",
        genero: "Mujer",
        talla: "S",
        precio: 78000,
        stock: 12,
        sucursal: "Sucursal Sur",
        },
    ];

    // Función para color de stock
    const getStockColor = (stock) => {
        if (stock >= 25) return "bg-green-100 text-green-700";
        if (stock >= 15) return "bg-yellow-100 text-yellow-700";
        return "bg-red-100 text-red-700";
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
        {/* ===== SIDEBAR ===== */}
        {/* <Sidebar /> */}

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <main className="flex-1 p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
                <p className="text-gray-500 text-sm mt-1">
                Visualiza y administra el inventario de productos
                </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                />
                </svg>
                Nuevo Producto
            </button>
            </header>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center border rounded-full px-4 py-2 flex-1 bg-white">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
                <input
                type="text"
                placeholder="Buscar productos..."
                className="outline-none text-sm flex-1 bg-transparent"
                />
            </div>

            <select className="border rounded-full px-4 py-2 text-sm bg-white">
                <option>Todas las categorías</option>
                <option>Tshirt</option>
                <option>Jeans</option>
                <option>Buzos</option>
            </select>

            <select className="border rounded-full px-4 py-2 text-sm bg-white">
                <option>Todas las sucursales</option>
                <option>Sucursal Norte</option>
                <option>Sucursal Sur</option>
            </select>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Producto</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Categoría</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Género</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Talla</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Precio</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Stock</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-600">Sucursal</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((p, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-800 font-medium">{p.nombre}</td>
                    <td className="px-6 py-3 text-gray-600">{p.categoria}</td>
                    <td className="px-6 py-3 text-gray-600">{p.genero}</td>
                    <td className="px-6 py-3 text-gray-600">{p.talla}</td>
                    <td className="px-6 py-3 text-gray-800 font-semibold">
                        ${p.precio.toLocaleString("es-CO")}
                    </td>
                    <td className="px-6 py-3">
                        <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(
                            p.stock
                        )}`}
                        >
                        {p.stock} unidades
                        </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{p.sucursal}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-400 text-sm mt-8">
            SmartRetail Gestión de Productos © 2025
            </footer>
        </main>
        </div>
    );
}

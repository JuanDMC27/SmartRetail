import Sidebar from "../components/admin/Sidebar";

export default function Sucursales() {
  // Datos estáticos
    const sucursales = [
        {
        nombre: "Sucursal Norte",
        ciudad: "Bogotá",
        direccion: "Calle 100 #12-34",
        telefono: "6011234567",
        ventas: 716000,
        productos: 5,
        stock: 103,
        },
        {
        nombre: "Sucursal Sur",
        ciudad: "Medellín",
        direccion: "Cra 45 #20-55",
        telefono: "6047654321",
        ventas: 492000,
        productos: 3,
        stock: 57,
        },
        {
        nombre: "Sucursal Centro",
        ciudad: "Cali",
        direccion: "Av. 6 #15-20",
        telefono: "6023456789",
        ventas: 248000,
        productos: 2,
        stock: 40,
        },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
        {/* ==== SIDEBAR ==== */}

        {/* ==== CONTENIDO PRINCIPAL ==== */}
        <main className="flex-1 p-8">
            {/* Header */}
            <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Sucursales</h1>
            <p className="text-gray-500 text-sm mt-1">
                Información y estadísticas de cada sucursal
            </p>
            </header>

            {/* Tarjetas de sucursales */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sucursales.map((sucursal, index) => (
                <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-transform hover:scale-[1.02]"
                >
                {/* Título */}
                <div className="flex items-start justify-between mb-2">
                    <div>
                    <h2 className="text-lg font-semibold text-gray-800">{sucursal.nombre}</h2>
                    <p className="text-gray-500 text-sm">{sucursal.ciudad}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
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
                        d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M9 7h6m-3-4v4m0 0a4 4 0 100 8 4 4 0 000-8z"
                        />
                    </svg>
                    </div>
                </div>

                {/* Dirección y contacto */}
                <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2c4.418 0 8 3.582 8 8 0 5.25-8 12-8 12S4 15.25 4 10c0-4.418 3.582-8 8-8z"
                        />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {sucursal.direccion}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h2l3.6 7.59a1 1 0 00.9.41H17a1 1 0 011 1v2H8.42a1 1 0 00-.91.59L6 21H4l1.38-4.13A1 1 0 014 16V5z"
                        />
                    </svg>
                    {sucursal.telefono}
                    </div>
                </div>

                <hr className="my-3" />

                {/* Datos de estadísticas */}
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v8m4-4H8"
                        />
                        </svg>
                        Ventas Totales
                    </span>
                    <span className="font-semibold text-gray-800">
                        ${sucursal.ventas.toLocaleString("es-CO")}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-indigo-600 font-medium">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
                        />
                        </svg>
                        Productos
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {sucursal.productos}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-purple-600 font-medium">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
                        />
                        </svg>
                        Stock Total
                    </span>
                    <span className="text-gray-800 font-semibold">
                        {sucursal.stock} unidades
                    </span>
                    </div>
                </div>
                </div>
            ))}
            </section>

            <footer className="text-center text-gray-400 text-sm mt-8">
            SmartRetail Sucursales © 2025
            </footer>
        </main>
        </div>
    );
}

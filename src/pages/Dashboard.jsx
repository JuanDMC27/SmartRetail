import Sidebar from "../components/admin/Sidebar";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Dashboard() {
  // Datos estáticos simulando las métricas
  const customers = 3782;
  const orders = 5359;
  const monthlyTarget = 75.55;
  const salesData = [
    { mes: "Jan", valor: 150 },
    { mes: "Feb", valor: 380 },
    { mes: "Mar", valor: 180 },
    { mes: "Apr", valor: 290 },
    { mes: "May", valor: 210 },
    { mes: "Jun", valor: 180 },
    { mes: "Jul", valor: 260 },
    { mes: "Aug", valor: 100 },
    { mes: "Sep", valor: 240 },
    { mes: "Oct", valor: 310 },
    { mes: "Nov", valor: 250 },
    { mes: "Dec", valor: 120 },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* ===== SIDEBAR ===== */}
      {/* <Sidebar /> */}

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <input
            type="text"
            placeholder="Search or type command..."
            className="w-80 px-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </header>

        {/* Métricas principales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Customers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm font-medium">Customers</span>
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 12a4 4 0 100-8 4 4 0 000 8zM15 12a4 4 0 100-8 4 4 0 000 8zm6 8v-2a4 4 0 00-3-3.87M3 20h5v-2a4 4 0 00-3-3.87"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-800">{customers.toLocaleString()}</p>
            <p className="flex items-center text-green-500 text-sm mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" /> 11.01%
            </p>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-500 text-sm font-medium">Orders</span>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V9a1 1 0 00-1-1h-3V4H8v4H5a1 1 0 00-1 1v4m16 0l-8 8-8-8"
                  />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-semibold text-gray-800">{orders.toLocaleString()}</p>
            <p className="flex items-center text-red-500 text-sm mt-1">
              <ArrowDownRight className="h-4 w-4 mr-1" /> 9.05%
            </p>
          </div>

          {/* Monthly Target */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-gray-500 text-sm font-medium mb-2">Monthly Target</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-36 h-36">
                <svg className="absolute inset-0" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                  />
                  <path
                    className="text-blue-500"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    strokeDasharray={`${monthlyTarget},100`}
                    d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-semibold text-gray-800">{monthlyTarget}%</p>
                  <p className="text-green-500 text-sm mt-1">+10%</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center">
                You earn $3287 today, it’s higher than last month.
              </p>
            </div>
          </div>
        </section>

        {/* Gráfico estático */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Sales</h2>
          <div className="w-full flex items-end justify-between h-52">
            {salesData.map((item) => (
              <div key={item.mes} className="flex flex-col items-center w-6">
                <div
                  className="bg-indigo-500 rounded-t-md transition-all"
                  style={{
                    height: `${(item.valor / 400) * 100}%`,
                    width: "16px",
                  }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{item.mes}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm mt-8">
          SmartRetail Analytics Dashboard © 2025
        </footer>
      </main>
    </div>
  );
}

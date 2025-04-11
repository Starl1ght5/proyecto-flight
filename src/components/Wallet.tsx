import { useState } from "react";
import { FiArrowUp, FiArrowDown, FiDollarSign, FiCreditCard, FiPieChart, FiAward, FiPlus, FiSettings, FiBarChart2, FiList } from "react-icons/fi";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

// Registramos componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: string;
  description: string;
  category: string;
};

const Wallet = () => {
  const [balance] = useState(770000);
  const [activeSection, setActiveSection] = useState("balance");
  const [timeRange, setTimeRange] = useState("30days");
  
  const user = {
    firstName: "Carolina",
    lastName: "Devoz",
    tier: "Platino",
    miles: 48250,
    profilePhoto: "https://assets.sta.io/site_media/u/emp/2023/09/11/male.png"
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      type: "income",
      amount: 200000,
      date: "23 May 2025",
      description: "Depósito bancario",
      category: "Ingresos"
    },
    {
      id: 2,
      type: "expense",
      amount: 120000,
      date: "23 May 2025",
      description: "Vuelo a Bogotá",
      category: "Viajes"
    },
    {
      id: 3,
      type: "expense",
      amount: 85000,
      date: "23 May 2025",
      description: "Hotel",
      category: "Alojamiento"
    }
  ];

  // Cálculos de totales
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // Datos para gráficos
  const pieData = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{
      data: [totalIncome, totalExpenses],
      backgroundColor: ['#4ade80', '#f87171'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  const categories = Array.from(new Set(transactions.map(t => t.category)));
  const barData = {
    labels: categories,
    datasets: [{
      label: 'Movimientos',
      data: categories.map(c => 
        transactions.filter(t => t.category === c).reduce((sum, t) => sum + t.amount, 0)
      ),
      backgroundColor: '#8b5cf6',
    }],
  };

  return (
    <div className=" bg-gray-50 text-purple2 m-10">
      {/* Header */}
      <header className="bg-purple-700 text-white p-6 m-2 border rounded-4xl">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Mi Wallet</h1>
            <p className="text-sm opacity-90">Bienvenida, {user.firstName}</p>
          </div>
          <img 
            src={user.profilePhoto} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-20 -mt-10">
        {/* Tarjeta de Balance Principal */}
        <div 
          className={`bg-purple-50 rounded-2xl shadow-xl p-6 mb-6 transition-all ${activeSection === "balance" ? "block" : "hidden"}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Saldo disponible</p>
              <h2 className="text-4xl font-bold mt-1 text-gray-800">
                COP {balance.toLocaleString()}
              </h2>
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              <FiDollarSign className="mr-1" />
              <span>Activa</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div>
              <p className="text-sm text-gray-500">Ingresos</p>
              <p className="text-green-500 font-medium">+COP {totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gastos</p>
              <p className="text-red-500 font-medium">-COP {totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Neto</p>
              <p className="font-medium text-gray-800">COP {(totalIncome - totalExpenses).toLocaleString()}</p>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            <button className="flex flex-col items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-1">
                <FiArrowDown size={20} />
              </div>
              <span className="text-xs">Recibir</span>
            </button>
            <button className="flex flex-col items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-1">
                <FiArrowUp size={20} />
              </div>
              <span className="text-xs">Enviar</span>
            </button>
            <button className="flex flex-col items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-1">
                <FiCreditCard size={20} />
              </div>
              <span className="text-xs">Pagar</span>
            </button>
            <button className="flex flex-col items-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-1">
                <FiPlus size={20} />
              </div>
              <span className="text-xs">Más</span>
            </button>
          </div>
        </div>

        {/* Sección de Movimientos */}
        <div 
          className={`bg-white rounded-2xl shadow-xl p-6 mb-6 transition-all ${activeSection === "transactions" ? "block" : "hidden"}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Movimientos recientes</h3>
          
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div 
                key={transaction.id}
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className={`p-3 rounded-full mr-4 ${transaction.type === "income" ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {transaction.type === "income" ? <FiArrowDown /> : <FiArrowUp />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{transaction.description}</h4>
                  <p className="text-sm text-gray-500">{transaction.date} • {transaction.category}</p>
                </div>
                <div className={`font-bold ${transaction.type === "income" ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === "income" ? '+' : '-'}COP {transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div 
          className={`bg-white rounded-2xl shadow-xl p-6 mb-6 transition-all ${activeSection === "stats" ? "block" : "hidden"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Estadísticas</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1 bg-gray-50"
            >
              <option value="7days">7 días</option>
              <option value="30days">30 días</option>
              <option value="3months">3 meses</option>
            </select>
          </div>

          <div className="grid gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">Balance general</h4>
              <div className="h-64">
                <Pie 
                  data={pieData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                      tooltip: {
                        callbacks: {
                          label: (context) => ` ${context.label}: COP ${context.raw?.toLocaleString()}`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">Por categoría</h4>
              <div className="h-64">
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (context) => ` COP ${context.raw?.toLocaleString()}`
                        }
                      }
                    },
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => `COP ${value}`
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Tarjetas */}
        <div 
          className={`bg-white rounded-2xl shadow-xl p-6 mb-6 transition-all ${activeSection === "cards" ? "block" : "hidden"}`}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-6">Tus tarjetas</h3>
          
          {/* Tarjeta Principal */}
          <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-800"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
            
            <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-light opacity-90">LATAM Pass</p>
                  <p className="text-xl font-bold">Black Edition</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-90">Titular</p>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="w-12 h-8 bg-yellow-400 rounded-md flex items-center justify-center">
                  <div className="w-8 h-6 bg-yellow-300 rounded-sm"></div>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-90">Válida hasta</p>
                  <p className="font-medium">12/25</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-xs opacity-90 mb-1">Número de tarjeta</p>
                <div className="flex space-x-4 items-center">
                  <span className="text-xl tracking-widest">••••</span>
                  <span className="text-xl tracking-widest">••••</span>
                  <span className="text-xl tracking-widest">••••</span>
                  <span className="text-xl tracking-widest">4242</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <FiAward className="mr-2 text-yellow-300" />
                  <span className="text-xs">Nivel {user.tier}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-90">Millas</p>
                  <p className="font-medium">{user.miles.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Otras tarjetas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 text-white">
              <div className="flex justify-between items-start mb-6">
                <p className="text-sm">Virtual</p>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Activa</span>
              </div>
              <div className="text-center">
                <p className="text-xs opacity-80 mb-1">Número</p>
                <p className="font-mono tracking-widest">•••• 2534</p>
              </div>
            </div>
            
            <button className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-300 transition-colors">
              <FiPlus className="text-2xl mb-1" />
              <span className="text-sm">Nueva tarjeta</span>
            </button>
          </div>
        </div>
      </main>

      {/* Navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-2 px-6 flex justify-around">
        <button 
          onClick={() => setActiveSection("balance")} 
          className={`flex flex-col items-center p-2 ${activeSection === "balance" ? 'text-purple-600' : 'text-gray-500'}`}
        >
          <FiDollarSign className="text-lg" />
          <span className="text-xs mt-1">Balance</span>
        </button>
        <button 
          onClick={() => setActiveSection("transactions")} 
          className={`flex flex-col items-center p-2 ${activeSection === "transactions" ? 'text-purple-600' : 'text-gray-500'}`}
        >
          <FiList className="text-lg" />
          <span className="text-xs mt-1">Movimientos</span>
        </button>
        <button 
          onClick={() => setActiveSection("stats")} 
          className={`flex flex-col items-center p-2 ${activeSection === "stats" ? 'text-purple-600' : 'text-gray-500'}`}
        >
          <FiBarChart2 className="text-lg" />
          <span className="text-xs mt-1">Estadísticas</span>
        </button>
        <button 
          onClick={() => setActiveSection("cards")} 
          className={`flex flex-col items-center p-2 ${activeSection === "cards" ? 'text-purple-600' : 'text-gray-500'}`}
        >
          <FiCreditCard className="text-lg" />
          <span className="text-xs mt-1">Tarjetas</span>
        </button>
      </nav>
    </div>
  );
};

export default Wallet;
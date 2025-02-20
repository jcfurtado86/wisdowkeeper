import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import { FaUserCircle, FaBars } from "react-icons/fa";
import Sidebar from "../../components/Sidebar"

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do usuário
    navigate("/login"); // Redireciona para a tela de login
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow-md w-full">
          <button onClick={toggleSidebar} className="lg:hidden text-2xl text-blue-600">
            <FaBars />
          </button>

          <h1 className="text-3xl font-semibold text-blue-600">Seja Bem - Vindo(a) Nome do usuário</h1>

          {/* User Icon */}
          <div className="relative">
            <button onClick={toggleDropdown}>
              <FaUserCircle className="text-3xl text-blue-600" />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                <ul>
                  <li className="text-blue-600 p-2 hover:bg-blue-50 rounded">Ver Perfil</li>
                  <li
                    className="text-red-600 p-2 hover:bg-red-50 rounded cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sair
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visão Geral */}
            <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Visão Geral</h2>
              <p className="text-gray-600 mb-6">Resumo das principais atividades e métricas.</p>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm h-56 mb-4">
                <h3 className="text-lg text-blue-600 font-medium">Gráfico de Acesso</h3>
                <div className="bg-blue-300 h-32 rounded-lg mt-4"></div>
              </div>
            </div>

            {/* Soluções Recentes */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Soluções Recentes</h2>
              <ul className="space-y-2">
                <li className="text-gray-600">Solução 1 - <span className="text-blue-500">01/02/2025</span></li>
                <li className="text-gray-600">Solução 2 - <span className="text-blue-500">28/01/2025</span></li>
              </ul>
            </div>

            {/* Feedbacks */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Feedbacks</h2>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">"O sistema é muito fácil de usar."</p>
                <p className="text-sm text-blue-500">- Usuário 1</p>
              </div>
            </div>

            {/* Favoritos */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Soluções Favoritas</h2>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">"Gostei das melhorias no painel de controle!"</p>
                <p className="text-sm text-blue-500">- Usuário 2</p>
              </div>
            </div>

            {/* Comentários */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">Comentários Recentes</h2>
              <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <p className="text-gray-600">"Precisa de algumas melhorias, mas é ótimo!"</p>
                <p className="text-sm text-blue-500">- Usuário 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

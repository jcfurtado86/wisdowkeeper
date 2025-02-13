import { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Para controlar o dropdown

  // Função para alternar o menu lateral
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Função para alternar o dropdown de opções do usuário
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`bg-blue-600 text-white w-64 p-6 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative h-full`}
      >
        <h2 className="text-3xl font-semibold mb-8">WisdowKeeper</h2>
        <ul className="space-y-4">
          <li><a href="#" className="hover:bg-blue-500 p-2 rounded-lg">Início</a></li>
          <li><a href="#" className="hover:bg-blue-500 p-2 rounded-lg">Soluções</a></li>
          <li><a href="#" className="hover:bg-blue-500 p-2 rounded-lg">Monitorar Consultas</a></li>
          <li><a href="#" className="hover:bg-blue-500 p-2 rounded-lg">Categorizar Soluções</a></li>
          <li><a href="#" className="hover:bg-blue-500 p-2 rounded-lg">Feedbacks</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg mb-6">
          {/* Menu Icon */}
          <button onClick={toggleSidebar} className="lg:hidden text-2xl text-blue-600">
            <FaBars />
          </button>

          <h1 className="text-3xl font-semibold text-blue-600">Dashboard</h1>

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
                  <li className="text-blue-600 p-2 hover:bg-blue-50 rounded">Sair</li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visão Geral */}
          <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Visão Geral</h2>
            <p className="text-gray-600 mb-6">Resumo das principais atividades e métricas do sistema de gestão de conhecimento.</p>

            {/* Gráfico Placeholder */}
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm h-56 mb-4">
              <h3 className="text-lg text-blue-600 font-medium">Gráfico de Acesso</h3>
              <div className="bg-blue-300 h-32 rounded-lg mt-4"></div> {/* Placeholder para gráfico */}
            </div>
          </div>

          {/* Documentos Recentes */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Soluções Recentes</h2>
            <ul className="space-y-2">
              <li className="text-gray-600">Solução 1 - <span className="text-blue-500">Publicado em 01/02/2025</span></li>
              <li className="text-gray-600">Solução 2 - <span className="text-blue-500">Publicado em 28/01/2025</span></li>
              <li className="text-gray-600">Solução 3 - <span className="text-blue-500">Publicado em 25/01/2025</span></li>
            </ul>
          </div>

          {/* Feedbacks */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Feedbacks Recentes</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">"O sistema é muito fácil de usar, mas algumas funções podem ser mais intuitivas."</p>
              <p className="text-sm text-blue-500">- Usuário 1</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm mt-4">
              <p className="text-gray-600">"Gostei das melhorias no painel de controle!"</p>
              <p className="text-sm text-blue-500">- Usuário 2</p>
            </div>
          </div>
          {/* Favoritos */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Soluções Favoritas</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">"O sistema é muito fácil de usar, mas algumas funções podem ser mais intuitivas."</p>
              <p className="text-sm text-blue-500">- Usuário 1</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm mt-4">
              <p className="text-gray-600">"Gostei das melhorias no painel de controle!"</p>
              <p className="text-sm text-blue-500">- Usuário 2</p>
            </div>
          </div>
          {/* Comentários */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Comentários Recentes</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">"O sistema é muito fácil de usar, mas algumas funções podem ser mais intuitivas."</p>
              <p className="text-sm text-blue-500">- Usuário 1</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm mt-4">
              <p className="text-gray-600">"Gostei das melhorias no painel de controle!"</p>
              <p className="text-sm text-blue-500">- Usuário 2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

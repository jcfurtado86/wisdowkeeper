import React from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  return (
    <div
      className={`bg-blue-600 text-white w-64 h-screen p-6 transition-transform duration-300 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:relative`}
    >
      <h2 className="text-3xl font-semibold mb-8">WisdowKeeper</h2>
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Início
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Soluções
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Monitorar Consultas
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Categorizar Soluções
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Usuários
          </a>
        </li>
        <li>
          <a href="#" className="hover:bg-blue-500 p-2 rounded-lg block">
            Feedbacks
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

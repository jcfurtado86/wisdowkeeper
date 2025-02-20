import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

interface Solucao {
  id: number;
  titulo: string;
  categoria: string;
  dataCriacao: string;
}

const Solutions = () => {
  const navigate = useNavigate();
  const [isSidebarOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [solucoes] = useState<Solucao[]>([
    { id: 1, titulo: "Erro 404 ao acessar módulo", categoria: "Erro", dataCriacao: "2024-02-10" },
    { id: 2, titulo: "Como resetar senha", categoria: "Configuração", dataCriacao: "2024-02-12" },
  ]);

  // Filtrar soluções
  const solucoesFiltradas = solucoes.filter(solucao =>
    solucao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    solucao.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} className="w-64" /> 
  
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-blue-600">Soluções</h1>
          <button
            onClick={() => navigate("/cadastrosolucao")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Criar Solução
          </button>
        </div>
  
        {/* Barra de busca */}
        <input
          type="text"
          placeholder="Buscar solução..."
          className="p-2 border rounded-lg w-full mb-4"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
  
        {/* Tabela de soluções */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Título</th>
                <th className="p-3 text-left">Categoria</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {solucoesFiltradas.map((solucao) => (
                <tr key={solucao.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{solucao.titulo}</td>
                  <td className="p-3">{solucao.categoria}</td>
                  <td className="p-3">{solucao.dataCriacao}</td>
                  <td className="p-3">
                    <button className="text-blue-600 mr-3 hover:underline" onClick={() => navigate(`/editarsolucao`)}>Editar</button>
                    <button className="text-red-600 hover:underline">Excluir</button>
                  </td>
                </tr>
              ))}
              {solucoesFiltradas.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Nenhuma solução encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Solutions;

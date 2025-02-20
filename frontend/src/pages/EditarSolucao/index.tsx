import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const EditSolution = () => {
  const { id } = useParams(); // Obtém o ID da solução a ser editada
  const navigate = useNavigate();

  const [solucao, setSolucao] = useState({
    titulo: "",
    categoria: "",
    descricao: "",
    dataCriacao: "",
  });

  useEffect(() => {
    // Simula uma busca na API pelo ID da solução
    const fetchSolution = async () => {
      try {
        const response = await fetch(`/api/solucoes/${id}`);
        const data = await response.json();
        setSolucao(data);
      } catch (error) {
        console.error("Erro ao buscar solução:", error);
      }
    };

    fetchSolution();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`/api/solucoes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solucao),
      });

      navigate("/solucoes"); // Redireciona para a lista de soluções após salvar
    } catch (error) {
      console.error("Erro ao atualizar solução:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar isSidebarOpen={true} />

      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Editar Solução</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <div className="mb-4">
            <label className="block font-semibold">Título</label>
            <input
              type="text"
              value={solucao.titulo}
              onChange={(e) => setSolucao({ ...solucao, titulo: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Categoria</label>
            <input
              type="text"
              value={solucao.categoria}
              onChange={(e) => setSolucao({ ...solucao, categoria: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Descrição</label>
            <textarea
              value={solucao.descricao}
              onChange={(e) => setSolucao({ ...solucao, descricao: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSolution;

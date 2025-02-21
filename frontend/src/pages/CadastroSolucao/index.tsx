import React, { useState } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";

const CriacaoSolucao = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

 
  const [isSidebarOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipo: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      tipo === "arquivo" ? setArquivo(file) : setVideo(file);
    }
  };

  const handleSubmit = () => {
    if (!titulo || !descricao || !categoria) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Solução cadastrada com sucesso!");
      setTitulo("");
      setDescricao("");
      setCategoria("");
      setArquivo(null);
      setVideo(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
    <div className="p-6 bg-white h-full shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Criar Nova Solução</h2>
      {successMessage && <p className="text-green-500 text-center mb-3">{successMessage}</p>}
      
      <input
        className="border p-3 mb-3 rounded w-full focus:ring-2 focus:ring-blue-300"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      
      <textarea
        className="border p-3 mb-3 rounded w-full h-24 focus:ring-2 focus:ring-blue-300"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      
      <input
        className="border p-3 mb-3 rounded w-full focus:ring-2 focus:ring-blue-300"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      
      <label className="flex items-center gap-2 cursor-pointer bg-gray-100 p-3 rounded mb-3 w-full hover:bg-gray-200 transition">
        <FiUpload className="text-blue-500" />
        <span>Upload de Arquivo</span>
        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "arquivo")} />
      </label>
      {arquivo && <p className="text-sm text-gray-500 mb-3">{arquivo.name}</p>}
      
      <label className="flex items-center gap-2 cursor-pointer bg-gray-100 p-3 rounded mb-3 w-full hover:bg-gray-200 transition">
        <AiOutlineVideoCamera className="text-red-500" />
        <span>Upload de Vídeo</span>
        <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, "video")} />
      </label>
      {video && <p className="text-sm text-gray-500 mb-3">{video.name}</p>}
      
      <button
        className={`p-3 rounded w-full transition ${titulo && descricao && categoria ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 text-gray-700"}`}
        onClick={handleSubmit}
        disabled={!titulo || !descricao || !categoria || loading}
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </div>
    </div>
  );
};

export default CriacaoSolucao;

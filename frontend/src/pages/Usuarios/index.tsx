import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

// Definir o tipo do usuário
type User = {
  id: number;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
};

const Usuarios = () => {
  const navigate = useNavigate();
  const [isSidebarOpen] = useState(false);
  
  // Aplicando o tipo ao useState
  const [usuarios, setUsuarios] = useState<User[]>([]); // Agora o estado é um array de User
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState(""); // Novo filtro por função
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Paginação

  // Simulação de usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      const users: User[] = [ // Adicionando tipo explicitamente
        { id: 1, nome: "Eduardo", email: "eduardo@email.com", role: "Admin", ativo: true },
        { id: 2, nome: "Ana", email: "ana@email.com", role: "Usuário", ativo: true },
        { id: 3, nome: "Carlos", email: "carlos@email.com", role: "Usuário", ativo: false },
        { id: 4, nome: "Bruna", email: "bruna@email.com", role: "Admin", ativo: true },
        { id: 5, nome: "Paulo", email: "paulo@email.com", role: "Usuário", ativo: true },
        { id: 6, nome: "Mariana", email: "mariana@email.com", role: "Usuário", ativo: false },
      ];
      setUsuarios(users);
    };
    fetchUsuarios();
  }, []);

  // Filtrando usuários por nome, email ou função
  const filteredUsuarios = usuarios.filter(
    (user) =>
      (user.nome.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())) &&
      (filterRole ? user.role === filterRole : true)
  );

  // Paginação
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Conteúdo principal */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-600">Usuários</h1>
          <button
            onClick={() => navigate("/cadastro")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Cadastrar Usuário
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-2 border rounded-lg shadow-sm"
          >
            <option value="">Todos</option>
            <option value="Admin">Admins</option>
            <option value="Usuário">Usuários</option>
          </select>
        </div>

        {/* Tabela de usuários */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Nome</th>
                <th className="p-3 text-left">E-mail</th>
                <th className="p-3 text-left">Função</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsuarios.length > 0 ? (
                paginatedUsuarios.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        {user.nome.charAt(0)}
                      </div>
                      {user.nome}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      {user.ativo ? (
                        <span className="text-green-600">Ativo</span>
                      ) : (
                        <span className="text-red-600">Inativo</span>
                      )}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">Editar</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded-md">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1 mx-1">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;

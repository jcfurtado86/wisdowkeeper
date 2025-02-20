import { Routes, Route, Navigate } from "react-router-dom";
import Usuarios from './pages/Usuarios';
import Dashboard from './pages/Dashboard/index';
import Cadastro from './pages/Cadastro/index';
import CadastroSolucao from './pages/CadastroSolucao/index';
import EditarSolucao from './pages/EditarSolucao/index';
import Solucoes from './pages/Soluções/index';
import Login from './pages/Login/index';


function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastroSolucao" element={<CadastroSolucao />} />
      <Route path="/editarsolucao" element={<EditarSolucao />} />
      <Route path="/solucoes" element={<Solucoes />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default MainRoutes;
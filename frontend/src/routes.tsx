import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/index'
import Cadastro from './pages/Cadastro/index';
import CadastroSolucao from './pages/CadastroSolucao/index';
import Login from './pages/Login/index';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/cadastroSolucao" element={<CadastroSolucao />} />
    </Routes>
  );
}

export default MainRoutes;
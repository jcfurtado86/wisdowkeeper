import React, { useState } from "react";
import Sidebar from "../../components/Sidebar"

const Cadastro = () => {

  const [isSidebarOpen] = useState(false);
  
 


  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    perfil: "",
    senha: "",
  });

  const [errors, setErrors] = useState({} as Record<string, string>);

  const perfis = ["Estagiário", "Desenvolvedor", "Supervisor", "Administrador"];

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpa os erros ao modificar o campo
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.nome.trim().length < 3 || formData.nome.trim().length > 100) {
      newErrors.nome = "O nome deve ter entre 3 e 100 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Digite um e-mail válido.";
    }

    if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido.";
    }

    if (!formData.rua || !formData.numero || !formData.bairro || !formData.cidade || !formData.estado) {
      newErrors.endereco = "Preencha todos os campos do endereço.";
    }

    if (!formData.perfil) {
      newErrors.perfil = "Selecione um perfil.";
    }

    if (formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Cadastro realizado com sucesso!");
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen flex  bg-gray-100">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Usuário</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.nome ? "border-red-500" : "border-gray-300"
              }`}
            />
            
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
            
          </div>
         

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="cpf">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              value={formData.cpf}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.cpf ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="perfil">
              Perfil
            </label>
            <select
              id="perfil"
              name="perfil"
              value={formData.perfil}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.perfil ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Selecione...</option>
              {perfis.map((perfil) => (
                <option key={perfil} value={perfil}>
                  {perfil}
                </option>
              ))}
            </select>
            {errors.perfil && <p className="text-red-500 text-sm">{errors.perfil}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="rua">
              Rua
            </label>
            <input
              id="rua"
              name="rua"
              type="text"
              value={formData.rua}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="numero">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              type="text"
              value={formData.numero}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="bairro">
              Bairro
            </label>
            <input
              id="bairro"
              name="bairro"
              type="text"
              value={formData.bairro}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              name="cidade"
              type="text"
              value={formData.cidade}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="estado">
              Estado
            </label>
            <input
              id="estado"
              name="estado"
              type="text"
              value={formData.estado}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                errors.endereco ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="senha">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${
              errors.senha ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.senha && <p className="text-red-500 text-sm">{errors.senha}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded font-medium hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
    </div>
  );
};

export default Cadastro;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getInputDado } from "../utils/formUtils";
import { criar } from "../utils/formUtils";
import { listar } from "../utils/formUtils";

const Criar = () => {
  const [produto, setProduto] = useState({nome: "", preco: "" });
  const navigate = useNavigate();

  const adicionar = async (e) => {
    e.preventDefault();
    if (produto.nome && produto.preco) {
      try {
        await criar({ ...produto, preco: Number(produto.preco) });
        alert("Produto criado com sucesso!");
        localStorage.removeItem("produtossalvos");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("Erro ao criar produto.");
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="text-white p-4 rounded mb-4 text-center"
        style={{ background: "linear-gradient(135deg, #198754, #0d6efd)" }}
      >
        <h2>➕ Criar Novo Produto</h2>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">Id do Produto</label>
          <input type="text" className="form-control" id="id" onChange={e => getInputDado(e,produto,setProduto)} placeholder="001xx" required />
        </div>

        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Produto</label>
          <input type="text" className="form-control" id="nome" onChange={e => getInputDado(e,produto,setProduto)} required />
        </div>

        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço (MZN)</label>
          <input type="number" className="form-control" id="preco" onChange={e => getInputDado(e,produto,setProduto)} required />
        </div>

        <button type="submit" className="btn btn-success" onClick={adicionar}>Salvar Produto</button>
        <Link to="/" className="btn btn-secondary ms-2">Voltar</Link>
      </form>
    </div>
  );
};

export default Criar;

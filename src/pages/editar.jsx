import { Link } from "react-router-dom";
import { getInputDado } from "../utils/formUtils";  
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editar } from "../utils/formUtils";
import { listar } from "../utils/formUtils";

function Editar() {
  const produto = JSON.parse(localStorage.getItem("produtoeditado")) || [];
  const [produto2, setProduto] = useState(produto);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const editarProduto = async () => {
    setLoading(true);
    try {
      await editar(produto2.id, { ...produto2, preco: Number(produto2.preco) });
      localStorage.removeItem("produtossalvos");
      const resposta = await listar();
      localStorage.setItem("produtossalvos", JSON.stringify(resposta.data));
      alert("Produto editado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao editar produto", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          background-color: #f8f9fa;
        }
        .hero {
          background: linear-gradient(135deg, #ffc107, #0d6efd);
          color: black;
          padding: 2rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }
      `}</style>

      <div className="container mt-4">
        <div className="hero">
          <h2>✏️ Editar Produto</h2>
        </div>

        <form>
          <div className="mb-3">
            <label className="form-label">ID do Produto</label>
            <input
              type="text"
              className="form-control"
              id="id"
              value={produto2.id}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nome do Produto</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              value={produto2.nome}
              onChange={(e) => getInputDado(e, produto2, setProduto)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Preço (MZN)</label>
            <input
              type="text"
              className="form-control"
              id="preco"
              value={produto2.preco}
              onChange={(e) => getInputDado(e, produto2, setProduto)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={editarProduto}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Salvando...
              </>
            ) : (
              <>
                <i className="bi bi-save"></i> Salvar Alterações
              </>
            )}
          </button>

          <Link to="/" className="btn btn-secondary">
            Voltar
          </Link>
        </form>
      </div>
    </>
  );
}

export default Editar;
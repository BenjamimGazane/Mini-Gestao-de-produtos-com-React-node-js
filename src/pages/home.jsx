import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listar } from "../utils/formUtils";
import { excluir } from "../utils/formUtils";


function Home() {
    
    // Estado para armazenar a lista de produtos
    const [lista_produtos, setListaProdutos] = useState([]);

    const dados = async (set) => {
      const dadossalvos = JSON.parse(localStorage.getItem("produtossalvos"));
      if(dadossalvos){
        setListaProdutos(dadossalvos);
      }
      else {
        const resposta = await listar()
        localStorage.setItem("produtossalvos", JSON.stringify(resposta.data));
        setListaProdutos(resposta.data);
      }
      };

    useEffect(() => {
       dados(setListaProdutos);
    },[])


  return (
    <>
      <style>{`
        body {
          background-color: #f8f9fa;
        }
        .hero {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          color: white;
          padding: 2rem;
          border-radius: 0.5rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .btn-group-custom {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .table td, .table th {
            white-space: nowrap;
            max-width: 150px;
            overflow: hidden; 
        }
      `}</style>

      <div className="container mt-4">
        <div className="hero">
          <h2 className="mb-1">📦 Sistema de Gestão de Produtos</h2>
          <p className="mb-0">Gerencie seus produtos de forma simples e rápida</p>
        </div>

        {/* Botões principais */}
        <div className="btn-group-custom mb-4">
          <Link to = "/criar" className="btn btn-success">
            <i className="bi bi-plus-circle"></i> Criar Produto
          </Link>
          <button className="btn btn-primary" onClick={() => {
              localStorage.removeItem("produtossalvos");
              dados(setListaProdutos)
              }
            } >
            <i className="bi bi-arrow-repeat"></i> Atualizar
          </button>
        </div>

        {/* Tabela de produtos */}
        <div className="table-responsive">
          <table className="table table-hover table-striped shadow-sm bg-white rounded">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista_produtos.map(produto =>{
                return (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.nome}</td>
                    <td>Mzn {Number(produto.preco).toFixed(2)}</td>
                    <td className="text-center">
                      <Link to ="/editar" className="btn btn-warning btn-sm" onClick={
                        () => localStorage.setItem("produtoeditado", JSON.stringify(produto))
                      }>
                        <i className="bi bi-pencil"></i> Editar
                      </Link>
                      <button className="btn btn-danger btn-sm ms-2" onClick={async() => {
                          try {
                            excluir(produto.id);
                            alert("Produto excluído com sucesso!");
                            localStorage.removeItem("produtossalvos");
                            dados(setListaProdutos); 
                          } catch (error) {
                            console.error("Erro ao excluir produto:", error);
                          }
                      }}>
                        <i className="bi bi-trash"></i> Excluir
                      </button>
                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;

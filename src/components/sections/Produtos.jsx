import React from 'react';

const Produtos = ({ produtos, onOpenModal }) => {
    return (
        <section id="produtos" className="content-section">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Gestão de Produtos</h5>
                    <button className="btn btn-primary" onClick={onOpenModal}>
                        <i className="bi bi-plus-circle"></i> Novo Produto
                    </button>
                </div>
                <div className="card-body">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Categoria</th>
                                    <th>Preço Compra</th>
                                    <th>Preço Venda</th>
                                    <th>Estoque</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(produto => (
                                    <tr key={produto.id}>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>
                                            <span className="badge bg-secondary">{produto.categoria}</span>
                                        </td>
                                        <td>MT {produto.precoCompra.toFixed(2)}</td>
                                        <td>MT {produto.precoVenda.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${
                                                produto.estoque === 0 ? 'bg-danger' :
                                                produto.estoque <= produto.estoqueMinimo ? 'bg-warning' : 'bg-success'
                                            }`}>
                                                {produto.estoque ?? 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${produto.ativo ? 'bg-success' : 'bg-secondary'}`}>
                                                {produto.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button className="btn btn-outline-primary">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-outline-danger">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Produtos;
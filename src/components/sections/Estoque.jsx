import React, { useState } from 'react';

const Estoque = ({ produtos }) => {
    const [formData, setFormData] = useState({
        produtoId: '',
        tipoMovimentacao: 'entrada',
        quantidade: '',
        motivo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para ajustar estoque
        console.log('Ajuste de estoque:', formData);
        setFormData({ produtoId: '', tipoMovimentacao: 'entrada', quantidade: '', motivo: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="estoque" className="content-section">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Controle de Estoque</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Categoria</th>
                                            <th>Estoque Atual</th>
                                            <th>Estoque Mínimo</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos.map(produto => (
                                            <tr key={produto.id}>
                                                <td>{produto.nome}</td>
                                                <td>
                                                    <span className="badge bg-secondary">{produto.categoria}</span>
                                                </td>
                                                <td>
                                                    <span className={`fw-bold ${
                                                        produto.estoque === 0 ? 'text-danger' :
                                                        produto.estoque <= produto.estoqueMinimo ? 'text-warning' : 'text-success'
                                                    }`}>
                                                        {produto.estoque ?? 'N/A'}
                                                    </span>
                                                </td>
                                                <td>{produto.estoqueMinimo ?? 'N/A'}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        produto.estoque === 0 ? 'bg-danger' :
                                                        produto.estoque <= produto.estoqueMinimo ? 'bg-warning' : 'bg-success'
                                                    }`}>
                                                        {produto.estoque === 0 ? 'Esgotado' :
                                                         produto.estoque <= produto.estoqueMinimo ? 'Baixo' : 'Normal'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary">
                                                        <i className="bi bi-arrow-left-right"></i> Ajustar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Ajuste de Estoque</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Produto</label>
                                    <select 
                                        className="form-select" 
                                        name="produtoId"
                                        value={formData.produtoId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione um produto</option>
                                        {produtos.map(produto => (
                                            <option key={produto.id} value={produto.id}>
                                                {produto.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tipo de Movimentação</label>
                                    <select 
                                        className="form-select" 
                                        name="tipoMovimentacao"
                                        value={formData.tipoMovimentacao}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="entrada">Entrada</option>
                                        <option value="saida">Saída</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantidade</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="quantidade"
                                        value={formData.quantidade}
                                        onChange={handleChange}
                                        min="1" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Motivo</label>
                                    <textarea 
                                        className="form-control" 
                                        name="motivo"
                                        value={formData.motivo}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    <i className="bi bi-check-lg"></i> Aplicar Ajuste
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Estoque;
import React from 'react';

const Financeiro = ({ despesas, onOpenModal }) => {
    return (
        <section id="financeiro" className="content-section">
            <div className="row mb-4">
                <div className="col-md-3 col-6 mb-2">
                    <div className="stats-card">
                        <div className="stats-icon primary">
                            <i className="bi bi-cash-coin"></i>
                        </div>
                        <div className="stats-value">MT 34560,00</div>
                        <div className="stats-label">Receita Total</div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <div className="stats-card">
                        <div className="stats-icon danger">
                            <i className="bi bi-arrow-down-circle"></i>
                        </div>
                        <div className="stats-value">MT 14000,00</div>
                        <div className="stats-label">Despesas Totais</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon success">
                            <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <div className="stats-value">MT 26000,00</div>
                        <div className="stats-label">Lucro Total</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon info">
                            <i className="bi bi-calendar-check"></i>
                        </div>
                        <div className="stats-value">40</div>
                        <div className="stats-label">Vendas Este Mês</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Registro de Despesas</h5>
                            <button className="btn btn-sm btn-primary" onClick={onOpenModal}>
                                <i className="bi bi-plus-circle"></i> Nova Despesa
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Descrição</th>
                                            <th>Categoria</th>
                                            <th>Valor</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {despesas.map(despesa => (
                                            <tr key={despesa.id}>
                                                <td>{despesa.data}</td>
                                                <td>{despesa.descricao}</td>
                                                <td>
                                                    <span className="badge bg-secondary">{despesa.categoria}</span>
                                                </td>
                                                <td>MT {despesa.valor.toFixed(2)}</td>
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
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Relatório Financeiro</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Período</label>
                                <div className="input-group">
                                    <input type="date" className="form-control" />
                                    <span className="input-group-text">até</span>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <button className="btn btn-primary w-100 mb-3">
                                <i className="bi bi-file-earmark-text"></i> Gerar Relatório
                            </button>
                            <div className="text-center text-muted py-4">
                                <i className="bi bi-graph-up display-4"></i>
                                <p className="mt-2">Selecione um período para gerar o relatório</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Financeiro;
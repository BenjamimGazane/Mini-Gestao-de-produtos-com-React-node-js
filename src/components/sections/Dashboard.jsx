import React from 'react';

const Dashboard = () => {
    return (
        <section id="dashboard" className="content-section active">
            <div className="row mb-4">
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon primary">
                            <i className="bi bi-currency-exchange"></i>
                        </div>
                        <div className="stats-value" id="total-vendas">MT 1218,00</div>
                        <div className="stats-label">Vendas Hoje</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon success">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stats-value" id="total-vendas-qtd">2</div>
                        <div className="stats-label">Vendas Realizadas</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon warning">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>
                        <div className="stats-value" id="alertas-estoque">0</div>
                        <div className="stats-label">Alertas Estoque</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon danger">
                            <i className="bi bi-graph-up"></i>
                        </div>
                        <div className="stats-value" id="lucro-diario">MT 600,00</div>
                        <div className="stats-label">Lucro Diário</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Vendas Recentes</h5>
                            <small className="text-muted">Últimas 5 vendas</small>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-container">
                                <table className="table table-striped mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th width="80">ID</th>
                                            <th width="100">Data</th>
                                            <th>Produtos Vendidos</th>
                                            <th width="100">Quantidade</th>
                                            <th width="120">Valor Total</th>
                                            <th width="120">Pagamento</th>
                                            <th width="100">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="vendas-recentes">
                                        {/* Dados serão preenchidos via JavaScript */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Alertas de Estoque</h5>
                            <span className="badge bg-warning" id="contador-alertas">0</span>
                        </div>
                        <div className="card-body">
                            <div id="alertas-container">
                                {/* Alertas serão preenchidos via JavaScript */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
import React from 'react';

const Dashboard = ({ produtos = [], vendas = [] }) => {
    // Calcular métricas dinâmicas
    const calcularMetricas = () => {
        const hoje = new Date().toISOString().split('T')[0];
        
        // Vendas de hoje
        const vendasHoje = vendas.filter(venda => venda.data === hoje);
        const totalVendasHoje = vendasHoje.reduce((total, venda) => total + venda.valorTotal, 0);
        
        // Total de vendas
        const totalVendas = vendas.length;
        
        // Alertas de estoque
        const alertasEstoque = produtos.filter(produto => 
            produto.estoque !== null && 
            produto.estoque <= produto.estoqueMinimo
        ).length;
        
        // Lucro diário (estimado - 50% de margem para exemplo)
        const lucroDiario = totalVendasHoje * 0.5;

        return {
            totalVendasHoje,
            totalVendas,
            alertasEstoque,
            lucroDiario
        };
    };

    // Buscar nome do produto pelo ID
    const getNomeProduto = (produtoId) => {
        const produto = produtos.find(p => p.id === produtoId);
        return produto ? produto.nome : `Produto #${produtoId}`;
    };

    // Formatar forma de pagamento
    const formatarPagamento = (forma) => {
        const formatos = {
            'dinheiro': '💵 Dinheiro',
            'cartao': '💳 Cartão', 
            'transferencia': '📲 Transferência',
            'mbway': '📱 MB WAY'
        };
        return formatos[forma] || forma;
    };

    // Gerar texto dos produtos vendidos
    const getProdutosVendidos = (itens) => {
        if (!itens || itens.length === 0) return 'Nenhum item';
        
        const principais = itens.slice(0, 2); // Mostra apenas 2 produtos
        const texto = principais.map(item => 
            `${getNomeProduto(item.produtoId)} (${item.quantidade}x)`
        ).join(', ');
        
        return itens.length > 2 ? `${texto} +${itens.length - 2} mais` : texto;
    };

    // Calcular quantidade total de itens
    const getQuantidadeTotal = (itens) => {
        return itens.reduce((total, item) => total + item.quantidade, 0);
    };

    // Alertas de estoque
    const getAlertasEstoque = () => {
        return produtos.filter(produto => 
            produto.estoque !== null && 
            produto.estoque <= produto.estoqueMinimo
        );
    };

    const metricas = calcularMetricas();
    const alertas = getAlertasEstoque();
    const vendasRecentes = vendas.slice(0, 5); // Últimas 5 vendas

    return (
        <section id="dashboard" className="content-section">
            <div className="row mb-4">
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon primary">
                            <i className="bi bi-currency-exchange"></i>
                        </div>
                        <div className="stats-value">
                            MT {metricas.totalVendasHoje.toFixed(2)}
                        </div>
                        <div className="stats-label">Vendas Hoje</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon success">
                            <i className="bi bi-cart-check"></i>
                        </div>
                        <div className="stats-value">{metricas.totalVendas}</div>
                        <div className="stats-label">Vendas Realizadas</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon warning">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>
                        <div className="stats-value">{metricas.alertasEstoque}</div>
                        <div className="stats-label">Alertas Estoque</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon danger">
                            <i className="bi bi-graph-up"></i>
                        </div>
                        <div className="stats-value">
                            MT {metricas.lucroDiario.toFixed(2)}
                        </div>
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
                                    <tbody>
                                        {vendasRecentes.length > 0 ? (
                                            vendasRecentes.map(venda => (
                                                <tr key={venda.id}>
                                                    <td>#{venda.id}</td>
                                                    <td>{venda.data}</td>
                                                    <td>
                                                        <small>{getProdutosVendidos(venda.itens)}</small>
                                                    </td>
                                                    <td>{getQuantidadeTotal(venda.itens)}</td>
                                                    <td>
                                                        <strong>MT {venda.valorTotal.toFixed(2)}</strong>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-light text-dark">
                                                            {formatarPagamento(venda.formaPagamento)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-success">Concluída</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4">
                                                    <i className="bi bi-receipt display-4 text-muted"></i>
                                                    <p className="text-muted mt-2 mb-0">Nenhuma venda realizada</p>
                                                </td>
                                            </tr>
                                        )}
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
                            <span className="badge bg-warning">{alertas.length}</span>
                        </div>
                        <div className="card-body">
                            {alertas.length > 0 ? (
                                <div className="alertas-list">
                                    {alertas.map(produto => (
                                        <div key={produto.id} className="alert alert-warning py-2 mb-2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{produto.nome}</strong>
                                                    <br />
                                                    <small>
                                                        Estoque: {produto.estoque} | Mínimo: {produto.estoqueMinimo}
                                                    </small>
                                                </div>
                                                <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <i className="bi bi-check-circle display-4 text-success"></i>
                                    <p className="text-muted mt-2 mb-0">Estoque em dia</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
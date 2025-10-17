import React, { useState } from 'react';
import ModalDetalhesVenda from '../modals/ModalDetalhesVenda';

const Dashboard = ({ produtos = [], vendas = [] }) => {
    const [modalDetalhesOpen, setModalDetalhesOpen] = useState(false);
    const [vendaSelecionada, setVendaSelecionada] = useState(null);

    // Calcular métricas dinâmicas
    const calcularMetricas = () => {
        const hoje = new Date().toISOString().split('T')[0];
        
        // Vendas de hoje
        const vendasHoje = vendas.filter(venda => venda.data === hoje);
        const totalVendasHoje = vendasHoje.reduce((total, venda) => total + venda.valorTotal, 0);
        
        // Lucro de hoje (usando o atributo lucro)
        const lucroHoje = vendasHoje.reduce((total, venda) => total + (venda.lucro || 0), 0);
        
        // Total de vendas
        const totalVendas = vendas.length;
        
        // Lucro total (todas as vendas)
        const lucroTotal = vendas.reduce((total, venda) => total + (venda.lucro || 0), 0);
        
        // Alertas de estoque
        const alertasEstoque = produtos.filter(produto => 
            produto.estoque !== null && 
            produto.estoque <= produto.estoqueMinimo
        ).length;

        return {
            totalVendasHoje,
            totalVendas,
            alertasEstoque,
            lucroHoje,
            lucroTotal,
            vendasHojeCount: vendasHoje.length
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

    // Abrir modal de detalhes
    const abrirDetalhesVenda = (venda) => {
        setVendaSelecionada(venda);
        setModalDetalhesOpen(true);
    };

    const metricas = calcularMetricas();
    const alertas = getAlertasEstoque();
    
    // TODAS as vendas de hoje (não limitado a 5)
    const hoje = new Date().toISOString().split('T')[0];
    const vendasHoje = vendas.filter(venda => venda.data === hoje);

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
                        <div className="stats-value">{metricas.vendasHojeCount}</div>
                        <div className="stats-label">Vendas Hoje</div>
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
                            MT {metricas.lucroHoje.toFixed(2)}
                        </div>
                        <div className="stats-label">Lucro Hoje</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Vendas de Hoje</h5>
                            <small className="text-muted">{vendasHoje.length} vendas realizadas</small>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-container">
                                <table className="table table-striped mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th width="80">ID</th>
                                            <th width="100">Data</th>
                                            <th>Produtos Vendidos</th>
                                            <th width="80">Quantidade</th>
                                            <th width="100">Valor Total</th>
                                            <th width="100">Lucro</th>
                                            <th width="120">Pagamento</th>
                                            <th width="100">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendasHoje.length > 0 ? (
                                            vendasHoje.map(venda => (
                                                <tr 
                                                    key={venda.id} 
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => abrirDetalhesVenda(venda)}
                                                >
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
                                                        <strong className="text-success">
                                                            MT {(venda.lucro || 0).toFixed(2)}
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-light text-dark">
                                                            {formatarPagamento(venda.formaPagamento)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button 
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                abrirDetalhesVenda(venda);
                                                            }}
                                                        >
                                                            <i className="bi bi-eye"></i> Detalhes
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="text-center py-4">
                                                    <i className="bi bi-receipt display-4 text-muted"></i>
                                                    <p className="text-muted mt-2 mb-0">Nenhuma venda realizada hoje</p>
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

            {/* Modal de Detalhes da Venda */}
            <ModalDetalhesVenda 
                isOpen={modalDetalhesOpen}
                onClose={() => setModalDetalhesOpen(false)}
                venda={vendaSelecionada}
                produtos={produtos}
            />
        </section>
    );
};

export default Dashboard;
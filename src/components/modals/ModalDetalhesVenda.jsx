import React from 'react';

const ModalDetalhesVenda = ({ isOpen, onClose, venda, produtos = [] }) => {
    if (!isOpen || !venda) return null;

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

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-receipt me-2"></i>
                            Detalhes da Venda #{venda.id}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/* Informações da Venda */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Informações da Venda</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <small className="text-muted">Data:</small>
                                                <div className="fw-bold">{venda.data}</div>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted">Pagamento:</small>
                                                <div className="fw-bold">{formatarPagamento(venda.formaPagamento)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-title">Valores</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <small className="text-muted">Valor Total:</small>
                                                <div className="fw-bold text-primary">MT {venda.valorTotal.toFixed(2)}</div>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-muted">Lucro:</small>
                                                <div className="fw-bold text-success">MT {(venda.lucro || 0).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Itens da Venda */}
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title mb-0">Itens Vendidos</h6>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-container">
                                    <table className="table table-striped mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Produto</th>
                                                <th width="100">Quantidade</th>
                                                <th width="120">Preço Unitário</th>
                                                <th width="120">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {venda.itens.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div>
                                                            <strong>{getNomeProduto(item.produtoId)}</strong>
                                                            <br />
                                                            <small className="text-muted">ID: {item.produtoId}</small>
                                                        </div>
                                                    </td>
                                                    <td>{item.quantidade}</td>
                                                    <td>MT {item.precoUnitario.toFixed(2)}</td>
                                                    <td>
                                                        <strong>MT {(item.precoUnitario * item.quantidade).toFixed(2)}</strong>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td colSpan="3" className="text-end fw-bold">Total:</td>
                                                <td className="fw-bold text-primary">MT {venda.valorTotal.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="3" className="text-end fw-bold">Lucro:</td>
                                                <td className="fw-bold text-success">MT {(venda.lucro || 0).toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Resumo */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="alert alert-info">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>Total de Itens:</strong> {venda.itens.reduce((total, item) => total + item.quantidade, 0)}
                                        </div>
                                        <div>
                                            <strong>Total de Produtos:</strong> {venda.itens.length}
                                        </div>
                                        <div>
                                            <strong>Status:</strong> <span className="badge bg-success">Concluída</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            <i className="bi bi-x-circle me-2"></i>Fechar
                        </button>
                        <button type="button" className="btn btn-primary">
                            <i className="bi bi-printer me-2"></i>Imprimir Recibo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetalhesVenda;
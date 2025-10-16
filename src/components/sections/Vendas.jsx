import React, { useState, useEffect } from 'react';

const Vendas = ({ produtos, onNovaVenda }) => {
    const [itensVenda, setItensVenda] = useState([]);
    const [formaPagamento, setFormaPagamento] = useState('dinheiro');
    const [valorRecebido, setValorRecebido] = useState(0);
    const [filtroCategoria, setFiltroCategoria] = useState('');

    const calcularTotal = () => {
        return itensVenda.reduce((total, item) => total + (item.precoUnitario * item.quantidade), 0);
    };

    const calcularTroco = () => {
        return Math.max(0, valorRecebido - calcularTotal());
    };

    const adicionarItem = (produto) => {
        const itemExistente = itensVenda.find(item => item.produtoId === produto.id);
        
        if (itemExistente) {
            setItensVenda(itensVenda.map(item =>
                item.produtoId === produto.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            ));
        } else {
            setItensVenda([...itensVenda, {
                produtoId: produto.id,
                nome: produto.nome,
                precoUnitario: produto.precoVenda,
                quantidade: 1
            }]);
        }
    };

    const removerItem = (produtoId) => {
        setItensVenda(itensVenda.filter(item => item.produtoId !== produtoId));
    };

    const atualizarQuantidade = (produtoId, novaQuantidade) => {
        if (novaQuantidade < 1) {
            removerItem(produtoId);
            return;
        }
        
        setItensVenda(itensVenda.map(item =>
            item.produtoId === produtoId
                ? { ...item, quantidade: novaQuantidade }
                : item
        ));
    };

    const produtosFiltrados = filtroCategoria 
        ? produtos.filter(produto => produto.categoria === filtroCategoria)
        : produtos;

    return (
        <section id="vendas" className="content-section">
            <div className="row g-3">
                {/* Painel de Produtos */}
                <div className="col-lg-8">
                    <div className="card h-100">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
                            <h5 className="card-title mb-0">
                                <i className="bi bi-cart-plus me-2"></i>Ponto de Venda
                            </h5>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light btn-sm" onClick={() => setItensVenda([])}>
                                    <i className="bi bi-arrow-clockwise"></i> Nova Venda
                                </button>
                                <button className="btn btn-warning btn-sm">
                                    <i className="bi bi-check-lg"></i> Finalizar
                                </button>
                            </div>
                        </div>
                        <div className="card-body p-3">
                            {/* Barra de Busca Rápida */}
                            <div className="row g-2 mb-3">
                                <div className="col-md-8">
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-light">
                                            <i className="bi bi-upc-scan text-primary"></i>
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Digite o nome ou escaneie o código..." 
                                            autoFocus 
                                        />
                                        <button className="btn btn-primary" type="button">
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <select 
                                        className="form-select form-select-lg" 
                                        value={filtroCategoria}
                                        onChange={(e) => setFiltroCategoria(e.target.value)}
                                    >
                                        <option value="">Todas Categorias</option>
                                        <option value="vinho">Vinhos</option>
                                        <option value="castanha">Castanhas</option>
                                        <option value="bebida_seca">Bebidas Secas</option>
                                        <option value="azeitona">Azeitonas</option>
                                        <option value="charuto">Charutos</option>
                                        <option value="extra">Extras</option>
                                    </select>
                                </div>
                            </div>

                            {/* Teclado Virtual Rápido */}
                            <div className="row g-1 mb-3">
                                <div className="col-12">
                                    <div className="d-flex flex-wrap gap-1 justify-content-center">
                                        {['vinho', 'castanha', 'bebida_seca', 'azeitona', 'charuto', 'extra'].map(categoria => (
                                            <button 
                                                key={categoria}
                                                className={`btn btn-outline-secondary btn-sm quick-category ${filtroCategoria === categoria ? 'active' : ''}`}
                                                onClick={() => setFiltroCategoria(categoria)}
                                            >
                                                {categoria === 'vinho' && '🍷 Vinhos'}
                                                {categoria === 'castanha' && '🌰 Castanhas'}
                                                {categoria === 'bebida_seca' && '🥃 Bebidas'}
                                                {categoria === 'azeitona' && '🫒 Azeitonas'}
                                                {categoria === 'charuto' && '💨 Charutos'}
                                                {categoria === 'extra' && '🧀 Extras'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Grid de Produtos */}
                            <div className="products-grid">
                                {produtosFiltrados.map(produto => (
                                    <div 
                                        key={produto.id} 
                                        className="product-card-pdv"
                                        onClick={() => adicionarItem(produto)}
                                    >
                                        <div className="product-image-pdv">
                                            <i className="bi bi-box"></i>
                                        </div>
                                        <div className="product-info-pdv">
                                            <div className="product-name-pdv">{produto.nome}</div>
                                            <div className="product-price-pdv">MT {produto.precoVenda.toFixed(2)}</div>
                                            <div className={`product-stock-pdv ${
                                                produto.estoque === 0 ? 'out' : 
                                                produto.estoque <= produto.estoqueMinimo ? 'low' : ''
                                            }`}>
                                                Estoque: {produto.estoque ?? 'N/A'}
                                            </div>
                                            <div className="product-category-pdv">{produto.categoria}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Painel da Venda */}
                <div className="col-lg-4">
                    <div className="sale-panel">
                        {/* Cabeçalho da Venda */}
                        <div className="sale-header bg-gradient-primary text-white p-3 rounded-top">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-receipt me-2"></i>Venda Atual
                                </h5>
                                <span className="badge bg-light text-primary fs-6">
                                    {itensVenda.length} itens
                                </span>
                            </div>
                            <div className="mt-2">
                                <small>Vendedor: <strong>Admin</strong></small>
                                <br />
                                <small>🕒 {new Date().toLocaleTimeString()}</small>
                            </div>
                        </div>

                        {/* Lista de Itens */}
                        <div className="sale-items-container">
                            {itensVenda.length === 0 ? (
                                <div className="empty-cart text-center py-5">
                                    <i className="bi bi-cart-x display-4 text-muted"></i>
                                    <p className="text-muted mt-2 mb-0">Nenhum item adicionado</p>
                                </div>
                            ) : (
                                itensVenda.map(item => (
                                    <div key={item.produtoId} className="sale-item-pdv">
                                        <div className="sale-item-info">
                                            <div className="sale-item-name">{item.nome}</div>
                                            <div className="sale-item-details">
                                                MT {item.precoUnitario.toFixed(2)} × {item.quantidade}
                                            </div>
                                        </div>
                                        <div className="sale-item-actions">
                                            <div className="quantity-controls">
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => atualizarQuantidade(item.produtoId, item.quantidade - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">{item.quantidade}</span>
                                                <button 
                                                    className="quantity-btn"
                                                    onClick={() => atualizarQuantidade(item.produtoId, item.quantidade + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="sale-item-total">
                                                MT {(item.precoUnitario * item.quantidade).toFixed(2)}
                                            </div>
                                            <button 
                                                className="remove-item"
                                                onClick={() => removerItem(item.produtoId)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Resumo Financeiro */}
                        <div className="sale-summary p-3 border-top">
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted">Subtotal:</small>
                                    <div className="fw-bold">MT {calcularTotal().toFixed(2)}</div>
                                </div>
                                <div className="col-6 text-end">
                                    <small className="text-muted">Desconto:</small>
                                    <div className="fw-bold text-success">MT 0,00</div>
                                </div>
                            </div>
                            
                            <div className="total-section mt-2 pt-2 border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold">TOTAL:</span>
                                    <span className="sale-total fs-4 fw-bold text-primary">
                                        MT {calcularTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Forma de Pagamento */}
                            <div className="payment-section mt-3">
                                <label className="form-label fw-bold mb-2">💰 Forma de Pagamento</label>
                                <div className="row g-2">
                                    {['dinheiro', 'cartao', 'transferencia', 'mbway'].map(pagamento => (
                                        <div key={pagamento} className="col-6">
                                            <button 
                                                className={`btn btn-outline-primary w-100 payment-btn ${formaPagamento === pagamento ? 'active' : ''}`}
                                                onClick={() => setFormaPagamento(pagamento)}
                                            >
                                                {pagamento === 'dinheiro' && '💵 Dinheiro'}
                                                {pagamento === 'cartao' && '💳 Cartão'}
                                                {pagamento === 'transferencia' && '📲 Transferência'}
                                                {pagamento === 'mbway' && '📱 MB WAY'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Campo para Dinheiro */}
                            {formaPagamento === 'dinheiro' && (
                                <div className="cash-section mt-3">
                                    <div className="row g-2">
                                        <div className="col-12">
                                            <label className="form-label small">Valor Recebido</label>
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                value={valorRecebido}
                                                onChange={(e) => setValorRecebido(parseFloat(e.target.value) || 0)}
                                                placeholder="0,00" 
                                                step="0.01" 
                                                min="0" 
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex justify-content-between small">
                                                <span>Troco:</span>
                                                <span className="fw-bold text-success">
                                                    MT {calcularTroco().toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Ações Finais */}
                            <div className="sale-actions mt-3">
                                <button 
                                    className="btn btn-success w-100 btn-lg py-3 fw-bold"
                                    disabled={itensVenda.length === 0}
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    FINALIZAR VENDA
                                </button>
                                <div className="mt-2 text-center">
                                    <small className="text-muted">Recibo será impresso automaticamente</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vendas;
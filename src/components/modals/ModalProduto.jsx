import React, { useState } from 'react';

const ModalProduto = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        categoria: '',
        precoCompra: '',
        precoVenda: '',
        estoque: 0,
        ativo: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            precoCompra: parseFloat(formData.precoCompra),
            precoVenda: parseFloat(formData.precoVenda),
            estoque: parseInt(formData.estoque)
        });
        setFormData({
            nome: '',
            categoria: '',
            precoCompra: '',
            precoVenda: '',
            estoque: 0,
            ativo: true
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Novo Produto</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form id="form-produto" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome do Produto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoria</label>
                                <select 
                                    className="form-select" 
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione uma categoria</option>
                                    <option value="vinho">Vinho</option>
                                    <option value="castanha">Castanha</option>
                                    <option value="bebida_seca">Bebida Seca</option>
                                    <option value="azeitona">Azeitona</option>
                                    <option value="charuto">Charuto</option>
                                    <option value="extra">Extra</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Preço de Compra (MT)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            name="precoCompra"
                                            value={formData.precoCompra}
                                            onChange={handleChange}
                                            step="0.01" 
                                            min="0" 
                                            required 
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Preço de Venda (MT)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            name="precoVenda"
                                            value={formData.precoVenda}
                                            onChange={handleChange}
                                            step="0.01" 
                                            min="0" 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estoque Inicial</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="estoque"
                                    value={formData.estoque}
                                    onChange={handleChange}
                                    min="0" 
                                />
                            </div>
                            <div className="mb-3">
                                <div className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="ativo"
                                        checked={formData.ativo}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">
                                        Produto Ativo
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                        >
                            Salvar Produto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto;
import React, { useState } from 'react';

const ModalDespesa = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        descricao: '',
        categoria: '',
        valor: '',
        data: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            valor: parseFloat(formData.valor)
        });
        setFormData({
            descricao: '',
            categoria: '',
            valor: '',
            data: new Date().toISOString().split('T')[0]
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nova Despesa</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form id="form-despesa" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="descricao"
                                    value={formData.descricao}
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
                                    <option value="aluguel">Aluguel</option>
                                    <option value="funcionarios">Funcionários</option>
                                    <option value="utilitarios">Utilitários</option>
                                    <option value="manutencao">Manutenção</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Valor (MT)</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    name="valor"
                                    value={formData.valor}
                                    onChange={handleChange}
                                    step="0.01" 
                                    min="0" 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="data"
                                    value={formData.data}
                                    onChange={handleChange}
                                    required 
                                />
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
                            Salvar Despesa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDespesa;
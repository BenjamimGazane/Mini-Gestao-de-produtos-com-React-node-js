import React, { useState } from 'react';

const ModalUsuario = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        perfil: 'user',
        senha: '',
        confirmarSenha: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        onSave({
            nome: formData.nome,
            email: formData.email,
            perfil: formData.perfil,
            senha: formData.senha,
            ativo: true,
            ultimoAcesso: new Date().toISOString().split('T')[0]
        });

        setFormData({
            nome: '',
            email: '',
            perfil: 'user',
            senha: '',
            confirmarSenha: ''
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
                        <h5 className="modal-title">Novo Usuário</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form id="form-usuario" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome Completo</label>
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
                                <label className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Perfil</label>
                                <select 
                                    className="form-select" 
                                    name="perfil"
                                    value={formData.perfil}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="admin">Administrador</option>
                                    <option value="user">Funcionário</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirmar Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
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
                            Salvar Usuário
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalUsuario;
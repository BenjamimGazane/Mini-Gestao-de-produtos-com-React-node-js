import React from 'react';

const Usuarios = ({ usuarios, onOpenModal }) => {
    return (
        <section id="usuarios" className="content-section">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">Gestão de Usuários</h5>
                    <button className="btn btn-primary" onClick={onOpenModal}>
                        <i className="bi bi-person-plus"></i> Novo Usuário
                    </button>
                </div>
                <div className="card-body">
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Perfil</th>
                                    <th>Status</th>
                                    <th>Último Acesso</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar me-2" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>
                                                    {usuario.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                </div>
                                                {usuario.nome}
                                            </div>
                                        </td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <span className={`badge ${
                                                usuario.perfil === 'admin' ? 'bg-primary' : 'bg-secondary'
                                            }`}>
                                                {usuario.perfil === 'admin' ? 'Administrador' : 'Funcionário'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${usuario.ativo ? 'bg-success' : 'bg-secondary'}`}>
                                                {usuario.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </td>
                                        <td>{usuario.ultimoAcesso}</td>
                                        <td>
                                            <div className="btn-group btn-group-sm">
                                                <button className="btn btn-outline-primary">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="btn btn-outline-warning">
                                                    <i className="bi bi-key"></i>
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
        </section>
    );
};

export default Usuarios;
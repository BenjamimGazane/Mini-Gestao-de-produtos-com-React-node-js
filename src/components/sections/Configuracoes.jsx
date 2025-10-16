import React, { useState } from 'react';

const Configuracoes = () => {
    const [configuracoes, setConfiguracoes] = useState({
        nomeEmpresa: 'CCM WIME',
        estoqueMinVinhos: 12,
        estoqueMinCastanhas: 20,
        estoqueMinBebidas: 15,
        estoqueMinAzeitonas: 25,
        estoqueMinCharutos: 30
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar configurações
        console.log('Configurações salvas:', configuracoes);
        alert('Configurações salvas com sucesso!');
    };

    const handleChange = (e) => {
        setConfiguracoes({
            ...configuracoes,
            [e.target.name]: e.target.value
        });
    };

    const handleBackup = () => {
        // Lógica para fazer backup
        alert('Backup realizado com sucesso!');
    };

    const handleRestore = () => {
        // Lógica para restaurar backup
        alert('Backup restaurado com sucesso!');
    };

    return (
        <section id="configuracoes" className="content-section">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Configurações do Sistema</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nome da Empresa</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="nomeEmpresa"
                                        value={configuracoes.nomeEmpresa}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estoque Mínimo - Vinhos</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="estoqueMinVinhos"
                                        value={configuracoes.estoqueMinVinhos}
                                        onChange={handleChange}
                                        min="1" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estoque Mínimo - Castanhas</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="estoqueMinCastanhas"
                                        value={configuracoes.estoqueMinCastanhas}
                                        onChange={handleChange}
                                        min="1" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estoque Mínimo - Bebidas Secas</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="estoqueMinBebidas"
                                        value={configuracoes.estoqueMinBebidas}
                                        onChange={handleChange}
                                        min="1" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estoque Mínimo - Azeitonas</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="estoqueMinAzeitonas"
                                        value={configuracoes.estoqueMinAzeitonas}
                                        onChange={handleChange}
                                        min="1" 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estoque Mínimo - Charutos</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="estoqueMinCharutos"
                                        value={configuracoes.estoqueMinCharutos}
                                        onChange={handleChange}
                                        min="1" 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-check-lg"></i> Salvar Configurações
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Backup do Sistema</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-4">
                                <h6>Fazer Backup</h6>
                                <p className="text-muted">Crie uma cópia de segurança dos dados do sistema.</p>
                                <button className="btn btn-outline-primary w-100" onClick={handleBackup}>
                                    <i className="bi bi-download"></i> Fazer Backup
                                </button>
                            </div>
                            <div>
                                <h6>Restaurar Backup</h6>
                                <p className="text-muted">Restaurar dados a partir de um backup anterior.</p>
                                <div className="input-group mb-2">
                                    <input type="file" className="form-control" accept=".json" />
                                    <button className="btn btn-outline-primary" onClick={handleRestore}>
                                        <i className="bi bi-upload"></i> Restaurar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Configuracoes;
import React, { useState, useEffect } from 'react';

const Financeiro = ({ despesas = [], vendas = [], onOpenModal }) => {
    const [periodo, setPeriodo] = useState({
        inicio: '',
        fim: ''
    });
    const [relatorio, setRelatorio] = useState(null);

    // Calcular métricas financeiras reais
    const calcularMetricas = () => {
        // Receita Total = Soma de todos os valorTotal das vendas
        const receitaTotal = vendas.reduce((total, venda) => total + venda.valorTotal, 0);
        
        // Lucro Total = Soma de todos os lucros das vendas
        const lucroTotal = vendas.reduce((total, venda) => total + (venda.lucro || 0), 0);
        
        // Despesas Totais = Soma de todas as despesas
        const despesasTotais = despesas.reduce((total, despesa) => total + despesa.valor, 0);
        
        // Vendas deste mês
        const mesAtual = new Date().getMonth();
        const anoAtual = new Date().getFullYear();
        const vendasEsteMes = vendas.filter(venda => {
            const dataVenda = new Date(venda.data);
            return dataVenda.getMonth() === mesAtual && dataVenda.getFullYear() === anoAtual;
        }).length;

        return {
            receitaTotal,
            despesasTotais,
            lucroTotal,
            vendasEsteMes,
            lucroLiquido: lucroTotal - despesasTotais
        };
    };

    // Gerar relatório por período
    const gerarRelatorio = () => {
        if (!periodo.inicio || !periodo.fim) {
            alert('Selecione um período válido');
            return;
        }

        const vendasNoPeriodo = vendas.filter(venda => {
            const dataVenda = new Date(venda.data);
            const dataInicio = new Date(periodo.inicio);
            const dataFim = new Date(periodo.fim);
            return dataVenda >= dataInicio && dataVenda <= dataFim;
        });

        const despesasNoPeriodo = despesas.filter(despesa => {
            const dataDespesa = new Date(despesa.data);
            const dataInicio = new Date(periodo.inicio);
            const dataFim = new Date(periodo.fim);
            return dataDespesa >= dataInicio && dataDespesa <= dataFim;
        });

        const receitaPeriodo = vendasNoPeriodo.reduce((total, venda) => total + venda.valorTotal, 0);
        const lucroPeriodo = vendasNoPeriodo.reduce((total, venda) => total + (venda.lucro || 0), 0);
        const despesasPeriodo = despesasNoPeriodo.reduce((total, despesa) => total + despesa.valor, 0);

        setRelatorio({
            periodo: `${periodo.inicio} à ${periodo.fim}`,
            receita: receitaPeriodo,
            lucro: lucroPeriodo,
            despesas: despesasPeriodo,
            lucroLiquido: lucroPeriodo - despesasPeriodo,
            totalVendas: vendasNoPeriodo.length,
            totalDespesas: despesasNoPeriodo.length
        });
    };

    // Categorias de despesas para gráfico (opcional)
    const getDespesasPorCategoria = () => {
        const categorias = {};
        despesas.forEach(despesa => {
            if (!categorias[despesa.categoria]) {
                categorias[despesa.categoria] = 0;
            }
            categorias[despesa.categoria] += despesa.valor;
        });
        return categorias;
    };

    const metricas = calcularMetricas();
    const despesasPorCategoria = getDespesasPorCategoria();

    return (
        <section id="financeiro" className="content-section">
            <div className="row mb-4">
                <div className="col-md-3 col-6 mb-2">
                    <div className="stats-card">
                        <div className="stats-icon primary">
                            <i className="bi bi-cash-coin"></i>
                        </div>
                        <div className="stats-value">MT {metricas.receitaTotal.toFixed(2)}</div>
                        <div className="stats-label">Receita Total</div>
                    </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                    <div className="stats-card">
                        <div className="stats-icon danger">
                            <i className="bi bi-arrow-down-circle"></i>
                        </div>
                        <div className="stats-value">MT {metricas.despesasTotais.toFixed(2)}</div>
                        <div className="stats-label">Despesas Totais</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon success">
                            <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <div className="stats-value">MT {metricas.lucroLiquido.toFixed(2)}</div>
                        <div className="stats-label">Lucro Líquido</div>
                    </div>
                </div>
                <div className="col-md-3 col-6">
                    <div className="stats-card">
                        <div className="stats-icon info">
                            <i className="bi bi-calendar-check"></i>
                        </div>
                        <div className="stats-value">{metricas.vendasEsteMes}</div>
                        <div className="stats-label">Vendas Este Mês</div>
                    </div>
                </div>
            </div>

            {/* Card adicional para Lucro Bruto */}
            <div className="row mb-4">
                <div className="col-md-4 offset-md-4">
                    <div className="stats-card" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)', color: 'white'}}>
                        <div className="stats-icon" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="stats-value" style={{fontSize: '1.8rem'}}>
                            MT {metricas.lucroTotal.toFixed(2)}
                        </div>
                        <div className="stats-label">Lucro Bruto</div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-0">Registro de Despesas</h5>
                            <button className="btn btn-sm btn-primary" onClick={onOpenModal}>
                                <i className="bi bi-plus-circle"></i> Nova Despesa
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="table-container">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Descrição</th>
                                            <th>Categoria</th>
                                            <th>Valor</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {despesas.length > 0 ? (
                                            despesas.map(despesa => (
                                                <tr key={despesa.id}>
                                                    <td>{despesa.data}</td>
                                                    <td>{despesa.descricao}</td>
                                                    <td>
                                                        <span className="badge bg-secondary">{despesa.categoria}</span>
                                                    </td>
                                                    <td>MT {despesa.valor.toFixed(2)}</td>
                                                    <td>
                                                        <div className="btn-group btn-group-sm">
                                                            <button className="btn btn-outline-primary">
                                                                <i className="bi bi-pencil"></i>
                                                            </button>
                                                            <button className="btn btn-outline-danger">
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">
                                                    <i className="bi bi-receipt display-4 text-muted"></i>
                                                    <p className="text-muted mt-2 mb-0">Nenhuma despesa registrada</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Resumo de Despesas por Categoria */}
                    <div className="card mt-3">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Despesas por Categoria</h5>
                        </div>
                        <div className="card-body">
                            {Object.keys(despesasPorCategoria).length > 0 ? (
                                Object.entries(despesasPorCategoria).map(([categoria, valor]) => (
                                    <div key={categoria} className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-medium">{categoria}</span>
                                        <span className="text-danger">MT {valor.toFixed(2)}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center mb-0">Nenhuma despesa para categorizar</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Relatório Financeiro</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Período</label>
                                <div className="input-group">
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={periodo.inicio}
                                        onChange={(e) => setPeriodo({...periodo, inicio: e.target.value})}
                                    />
                                    <span className="input-group-text">até</span>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        value={periodo.fim}
                                        onChange={(e) => setPeriodo({...periodo, fim: e.target.value})}
                                    />
                                </div>
                            </div>
                            <button 
                                className="btn btn-primary w-100 mb-3"
                                onClick={gerarRelatorio}
                            >
                                <i className="bi bi-file-earmark-text"></i> Gerar Relatório
                            </button>
                            
                            {relatorio ? (
                                <div className="relatorio-container">
                                    <h6 className="border-bottom pb-2">Relatório: {relatorio.periodo}</h6>
                                    <div className="row text-center">
                                        <div className="col-6 mb-3">
                                            <div className="border rounded p-2">
                                                <div className="text-primary fw-bold">MT {relatorio.receita.toFixed(2)}</div>
                                                <small className="text-muted">Receita</small>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <div className="border rounded p-2">
                                                <div className="text-success fw-bold">MT {relatorio.lucro.toFixed(2)}</div>
                                                <small className="text-muted">Lucro Bruto</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="border rounded p-2">
                                                <div className="text-danger fw-bold">MT {relatorio.despesas.toFixed(2)}</div>
                                                <small className="text-muted">Despesas</small>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="border rounded p-2 bg-light">
                                                <div className="fw-bold">MT {relatorio.lucroLiquido.toFixed(2)}</div>
                                                <small className="text-muted">Lucro Líquido</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <small className="text-muted">
                                            {relatorio.totalVendas} vendas • {relatorio.totalDespesas} despesas
                                        </small>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-muted py-4">
                                    <i className="bi bi-graph-up display-4"></i>
                                    <p className="mt-2">Selecione um período para gerar o relatório</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Financeiro;
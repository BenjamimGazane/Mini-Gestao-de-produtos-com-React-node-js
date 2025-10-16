import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/sections/Dashboard';
import Vendas from '../components/sections/Vendas';
import Produtos from '../components/sections/Produtos';
import Estoque from '../components/sections/Estoque';
import Financeiro from '../components/sections/Financeiro';
import Usuarios from '../components/sections/Usuarios';
import Configuracoes from '../components/sections/Configuracoes';
import ModalProduto from '../components/modals/ModalProduto';
import ModalDespesa from '../components/modals/ModalDespesa';
import ModalUsuario from '../components/modals/ModalUsuario';
import './home.css'

const Home = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [modalProdutoOpen, setModalProdutoOpen] = useState(false);
    const [modalDespesaOpen, setModalDespesaOpen] = useState(false);
    const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [vendas, setVendas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

   
    useEffect(() => {
        
        const produtosIniciais = [
            { id: 1, nome: "Vinho Tinto Reserva", categoria: "vinho", precoCompra: 150.00, precoVenda: 270.00, estoque: 15, estoqueMinimo: 12, ativo: true },
            { id: 2, nome: "Vinho Branco Seco", categoria: "vinho", precoCompra: 120.00, precoVenda: 228.00, estoque: 8, estoqueMinimo: 12, ativo: true },
            { id: 3, nome: "Castanha Portuguesa", categoria: "castanha", precoCompra: 48.00, precoVenda: 90.00, estoque: 25, estoqueMinimo: 20, ativo: true },
            { id: 4, nome: "Whisky 12 anos", categoria: "bebida_seca", precoCompra: 480.00, precoVenda: 900.00, estoque: 10, estoqueMinimo: 15, ativo: true },
            { id: 5, nome: "Azeitonas Verdes", categoria: "azeitona", precoCompra: 30.00, precoVenda: 72.00, estoque: 30, estoqueMinimo: 25, ativo: true },
            { id: 6, nome: "Charuto Cubano", categoria: "charuto", precoCompra: 90.00, precoVenda: 180.00, estoque: 35, estoqueMinimo: 30, ativo: true },
            { id: 7, nome: "Queijo Português", categoria: "extra", precoCompra: 72.00, precoVenda: 150.00, estoque: null, estoqueMinimo: null, ativo: true }
        ];

        // vendas
    const vendasIniciais = [
    { id: 1,data: "2025-10-16", valorTotal: 720.00, formaPagamento: "cartao", lucro: 324.00,itens: [
            { produtoId: 1, quantidade: 2, precoUnitario: 270.00 },
            { produtoId: 3, quantidade: 2, precoUnitario: 90.00 }
        ]
    },
    {id: 2, data: "2025-10-16", valorTotal: 498.00, formaPagamento: "dinheiro", lucro: 228.00,itens: [
            { produtoId: 2, quantidade: 1, precoUnitario: 228.00 },
            { produtoId: 5, quantidade: 2, precoUnitario: 72.00 },
            { produtoId: 7, quantidade: 1, precoUnitario: 150.00 }
        ]
    }
];
        // despesas
        const despesasIniciais = [
            { id: 1, data: "2024-01-15", descricao: "Aluguel loja", categoria: "aluguel", valor: 7200.00 },
            { id: 2, data: "2024-01-10", descricao: "Conta de luz", categoria: "utilitarios", valor: 2100.00 },
            { id: 3, data: "2024-01-05", descricao: "Salários", categoria: "funcionarios", valor: 16800.00 }
        ];

        // usuários
        const usuariosIniciais = [
            { id: 1, nome: "Admin User", email: "admin@ccmwime.com", perfil: "admin", senha: "admin123", ativo: true, ultimoAcesso: "2024-01-15" },
            { id: 2, nome: "Funcionário 1", email: "func1@ccmwime.com", perfil: "user", senha: "user123", ativo: true, ultimoAcesso: "2024-01-14" }
        ];

        setProdutos(produtosIniciais);
        setVendas(vendasIniciais);
        setDespesas(despesasIniciais);
        setUsuarios(usuariosIniciais);
    }, []);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setMobileSidebarOpen(false);
    };

    // CORREÇÃO: Renderização condicional direta
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard produtos={produtos} vendas={vendas} />;
            case 'vendas':
                return <Vendas produtos={produtos} />;
            case 'produtos':
                return <Produtos 
                    produtos={produtos} 
                    onOpenModal={() => setModalProdutoOpen(true)} 
                />;
            case 'estoque':
                return <Estoque produtos={produtos} />;
            case 'financeiro':
                return <Financeiro 
                    despesas={despesas}
                    vendas={vendas}
                    onOpenModal={() => setModalDespesaOpen(true)}
                />;
            case 'usuarios':
                return <Usuarios 
                    usuarios={usuarios}
                    onOpenModal={() => setModalUsuarioOpen(true)}
                />;
            case 'configuracoes':
                return <Configuracoes />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="app-container">
            {/* Overlay para mobile */}
            {mobileSidebarOpen && (
                <div 
                    className="sidebar-overlay active"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar 
                collapsed={sidebarCollapsed}
                mobileOpen={mobileSidebarOpen}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                onToggleSidebar={toggleSidebar}
            />

            {/* Conteúdo Principal */}
            <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Header 
                    activeSection={activeSection}
                    onToggleMobileSidebar={toggleMobileSidebar}
                />
                
                <div className="page-content">
                    {/* CORREÇÃO: Chamar a função de renderização */}
                    {renderActiveSection()}
                </div>
            </div>

            {/* Modais */}
            <ModalProduto 
                isOpen={modalProdutoOpen}
                onClose={() => setModalProdutoOpen(false)}
                onSave={(produto) => {
                    const novoProduto = {
                        ...produto,
                        id: Date.now(),
                        estoqueMinimo: produto.categoria === 'vinho' ? 12 : 
                                      produto.categoria === 'castanha' ? 20 :
                                      produto.categoria === 'bebida_seca' ? 15 :
                                      produto.categoria === 'azeitona' ? 25 :
                                      produto.categoria === 'charuto' ? 30 : 10
                    };
                    setProdutos([...produtos, novoProduto]);
                    setModalProdutoOpen(false);
                }}
            />

            <ModalDespesa 
                isOpen={modalDespesaOpen}
                onClose={() => setModalDespesaOpen(false)}
                onSave={(despesa) => {
                    const novaDespesa = {
                        ...despesa,
                        id: Date.now()
                    };
                    setDespesas([...despesas, novaDespesa]);
                    setModalDespesaOpen(false);
                }}
            />

            <ModalUsuario 
                isOpen={modalUsuarioOpen}
                onClose={() => setModalUsuarioOpen(false)}
                onSave={(usuario) => {
                    const novoUsuario = {
                        ...usuario,
                        id: Date.now(),
                        ativo: true,
                        ultimoAcesso: new Date().toISOString().split('T')[0]
                    };
                    setUsuarios([...usuarios, novoUsuario]);
                    setModalUsuarioOpen(false);
                }}
            />
        </div>
    );
};

export default Home;
import React from 'react';

const Header = ({ activeSection, onToggleMobileSidebar }) => {
    const sectionTitles = {
        dashboard: 'Dashboard',
        vendas: 'Vendas',
        produtos: 'Produtos',
        estoque: 'Estoque',
        financeiro: 'Financeiro',
        usuarios: 'Usuários',
        configuracoes: 'Configurações'
    };

    return (
        <header className="top-header">
            <div className="d-flex align-items-center">
                <button 
                    className="btn btn-sm btn-outline-primary d-md-none me-3" 
                    id="mobile-menu-toggle"
                    onClick={onToggleMobileSidebar}
                >
                    <i className="bi bi-list"></i>
                </button>
            </div>
            
            <h1 className="page-title" id="page-title">
                {sectionTitles[activeSection] || 'Dashboard'}
            </h1>
            
            <div className="header-actions">
                <div className="user-profile">
                    <div className="user-avatar">AD</div>
                    <div className="user-info">
                        <div className="user-name">Admin User</div>
                        <div className="user-role">Administrador</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
import React from 'react';

const Sidebar = ({ collapsed, mobileOpen, activeSection, onSectionChange, onToggleSidebar }) => {
    const navItems = [
        {
            section: 'dashboard',
            icon: 'bi-speedometer2',
            text: 'Dashboard',
            badge: null
        },
        {
            section: 'vendas',
            icon: 'bi-cart-check',
            text: 'Vendas',
            badge: null
        },
        {
            section: 'produtos',
            icon: 'bi-box-seam',
            text: 'Produtos',
            badge: 0
        },
        {
            section: 'estoque',
            icon: 'bi-clipboard-data',
            text: 'Estoque',
            badge: null
        },
        {
            section: 'financeiro',
            icon: 'bi-graph-up',
            text: 'Financeiro',
            badge: null
        },
        {
            section: 'usuarios',
            icon: 'bi-people',
            text: 'Usuários',
            badge: null
        },
        {
            section: 'configuracoes',
            icon: 'bi-gear',
            text: 'Configurações',
            badge: null
        }
    ];

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-text">CCM WIME</span>
                </div>
                <button className="toggle-sidebar" onClick={onToggleSidebar}>
                    <i className="bi bi-chevron-left"></i>
                </button>
            </div>
            
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <div className="nav-section-title">Principal</div>
                    {navItems.slice(0, 2).map(item => (
                        <a 
                            key={item.section}
                            href="#" 
                            className={`nav-item ${activeSection === item.section ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onSectionChange(item.section);
                            }}
                        >
                            <i className={`bi ${item.icon} nav-icon`}></i>
                            <span className="nav-text">{item.text}</span>
                            {item.badge !== null && (
                                <span className="badge-nav" id="stock-alerts">{item.badge}</span>
                            )}
                        </a>
                    ))}
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Gestão</div>
                    {navItems.slice(2, 5).map(item => (
                        <a 
                            key={item.section}
                            href="#" 
                            className={`nav-item ${activeSection === item.section ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onSectionChange(item.section);
                            }}
                        >
                            <i className={`bi ${item.icon} nav-icon`}></i>
                            <span className="nav-text">{item.text}</span>
                            {item.badge !== null && (
                                <span className="badge-nav">{item.badge}</span>
                            )}
                        </a>
                    ))}
                </div>
                
                <div className="nav-section">
                    <div className="nav-section-title">Administração</div>
                    {navItems.slice(5).map(item => (
                        <a 
                            key={item.section}
                            href="#" 
                            className={`nav-item ${activeSection === item.section ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onSectionChange(item.section);
                            }}
                        >
                            <i className={`bi ${item.icon} nav-icon`}></i>
                            <span className="nav-text">{item.text}</span>
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
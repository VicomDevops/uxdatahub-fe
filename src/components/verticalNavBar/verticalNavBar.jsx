import React from 'react';
import { changeActiveItemTabDashboard, collapseDashboard, changeActiveMenuTabDashboard } from "../../actions/navigationAction";
import { connect } from "react-redux";
import { Link, NavLink  } from "react-router-dom"
import PropTypes from "prop-types";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import Logo from '../../assets/logo-vector.svg'
import authServices from '../../services/authServices';
import Help from '../../assets/help.svg'
import HelpForm from './helpForm';
import Modals from '../common/modals/modal'
import ModalHelp from './ModalHelp'
import userServices from '../../services/userServices'
import 'react-pro-sidebar/dist/css/styles.css';
import './verticalNavBar.css'


class VerticalNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.auth.tabDashboard,
            visible: false,
            count: 0,
            show: false,
            loading: false,
            collapsed: true,
            currentHelp: {
                Subject: '',
                Nom: '',
                Prenom: '',
                Phone: '',
                Commentaire: ''
            },
        }
        //this.collapseDashboard = this.collapseDashboard.bind(this);
    }
    

    toggle = () => {
        this.setState({ ...this.state, show: !this.state.show })
    }
    onChange = e => {
        e.preventDefault();
        this.setState({ currentHelp: { ...this.state.currentHelp, [e.target.name]: e.target.value }, errors: { ...this.state.errors, [e.target.name]: "" }, error: {} })
    };
    onChangePhone = value => {
        this.setState({ currentHelp: { ...this.state.currentHelp, Phone: value } })
    };


    onSubmit = () => {
        userServices.help(this.state.currentHelp).then(res => {
            this.toggle()
            this.toggleVisible()
        })
    }

    toggleVisible = () => {
        this.setState({ visible: !this.state.visible })
    }

    renderModalHelpOK = () => {
        return <ModalHelp visible={this.state.visible} toggleVisible={this.toggleVisible}> </ModalHelp>
    }
    
    renderModalHelp() {

        const subject = ["Scénario", "Panel", "Mot de passe", "Résiliation", "Autre"]
        return (
            <Modals
                // modalSize="modal-lg"
                show={this.state.show}
                toggleShow={this.toggle}
                header='Demande d’aide'
            >
                <HelpForm
                    //  tog_standard={this.toggle}
                    confirmText='Envoyer la demande'
                    handleSubmit={this.onSubmit}
                    onchange={this.onChange}
                    subject={subject}
                    currentHelp={this.state.currentHelp}
                    loading={this.state.loading}
                    onChangePhone={this.onChangePhone}
                    error={this.state.error}
                />

            </Modals>
        )
    }


    handleCollapsed = (state) => {
        this.setState({ ...this.state, collapsed: !this.state.collapsed })
        this.props.collapseDashboard(this.state.collapsed)
    }

    handleToggleSubMenu = (menu) => {
        const { changeActiveMenuTabDashboard, navigation } = this.props;
    
        // Inverse l'état du menu uniquement si le menu actuel est différent de celui cliqué
        if (navigation?.menu !== menu) {
            changeActiveMenuTabDashboard(menu);
        } else {
            changeActiveMenuTabDashboard(""); // Ferme le menu si c'est déjà ouvert
        }
    }

    handleCloseMenu = (menu) => {
        this.props.changeActiveItemTabDashboard(menu)
        this.props.changeActiveMenuTabDashboard("")
    }

    handleChangeActiveItem = (item) => {
        this.props.changeActiveItemTabDashboard(item)
        setTimeout(() => {
            this.props.changeActiveMenuTabDashboard(item.slice(0, -1))
        },0.5)
    }

    render() {
        let dropDown = ["Scenarios", "Statistiques", "Recommandations UX", "Résulats", "Analyse IA", "Analyse", "Statistique", "Espace Admin","Rapports"];
        return (
            <ProSidebar width="240px" collapsed={this.props.navigation?.collapseDashboard}>
                {this.renderModalHelp()}
                {this.renderModalHelpOK()}
                <SidebarHeader>
                    <img src={Logo} alt="Labsoft" style={this.props.navigation?.collapseDashboard ? { maxWidth: "60px", maxHeight: "100px" }: { maxWidth: "160px" }} onClick={this.handleCollapsed} />
                </SidebarHeader>
                <SidebarContent>
                    {this.props.Menu.map((route, index) => {
                        return (route.Name !== "") && 
                            <Menu iconShape="square" key={index}>
                                {
                                    !(dropDown.includes(route.Name)) &&
                                    <MenuItem 
                                        icon={route.icon} 
                                        active={route.Name === this.props.navigation?.tab} 
                                        onClick={() => this.handleCloseMenu(route.Name)}
                                        className={route.Name === this.props.navigation?.tab && "submenu-title"}
                                    >
                                        {route.Name} 
                                        {this.props.auth.user.roles[0] === "ROLE_ADMIN" && <NavLink activeClassName="activeLink" exact to={`/admin${route.path}`} />}
                                        {this.props.auth.user.roles[0] === "ROLE_CLIENT" && <NavLink activeClassName="activeLink" exact to={`/client${route.path}`} />}
                                        {this.props.auth.user.roles[0] === "ROLE_TESTER" && <NavLink activeClassName="activeLink" exact to={`/tester${route.path}`} />}
                                        {this.props.auth.user.roles[0] === "ROLE_CLIENT_TESTER" && <NavLink activeClassName="activeLink" exact to={`/client-tester${route.path}`} />}
                                    </MenuItem>
                                }
                                {
                                    route.Name === "Scenarios" && (
                                        <SubMenu 
                                            title={route.Name} 
                                            icon={route.icon} 
                                            onClick={() => this.handleToggleSubMenu(route.Name)}
                                            open={this.props.navigation?.menu === route.Name}
                                            className={this.props.navigation?.menu === route.Name && "submenu-title"}
                                        >
                                            <MenuItem 
                                                active={route.Name+"1" === this.props.navigation?.tab} 
                                                onClick={() => this.handleChangeActiveItem(route.Name+"1")}
                                            >
                                                Création de scenario
                                                <NavLink exact activeClassName="activeLink" to="/client/createscenario" />
                                            </MenuItem>
                                            <MenuItem 
                                                active={route.Name+"2" === this.props.navigation?.tab} 
                                                onClick={() => this.handleChangeActiveItem(route.Name+"2")}
                                            >
                                                Création d'un panel
                                                <NavLink exact activeClassName="activeLink" to="/client/testerpanel" />
                                            </MenuItem >
                                            <MenuItem 
                                                active={route.Name+"3" === this.props.navigation?.tab} 
                                                onClick={() => this.handleChangeActiveItem(route.Name+"3")}
                                            >
                                                Mes panels
                                                <NavLink exact activeClassName="activeLink" to="/client/panelList" />
                                            </MenuItem>
                                        </SubMenu>
                                    )
                                }
                                {
                                    route.Name === "Résulats" &&
                                    <SubMenu 
                                        title={route.Name} 
                                        icon={route.icon} 
                                        onClick={() => this.handleToggleSubMenu(route.Name)}
                                        open={this.props.navigation?.menu === route.Name}
                                        className={this.props.navigation?.menu === route.Name && "submenu-title"}
                                    >
                                        <MenuItem 
                                            active={route.Name+'2' === this.props.navigation?.tab} 
                                            onClick={() => this.handleChangeActiveItem(route.Name+'2')}
                                        >
                                            Statistiques du Panel 
                                            <NavLink exact activeClassName="activeLink" to="/client/panelStatistics" />
                                        </MenuItem>
                                        <MenuItem 
                                            active={route.Name+'1' === this.props.navigation?.tab}  
                                            onClick={() => this.handleChangeActiveItem(route.Name+'1')}
                                        >
                                            Retours Utilisateurs
                                            <NavLink exact activeClassName="activeLink" to="/client/statistics" />
                                        </MenuItem>
                                    </SubMenu>
                                }
                                {
                                    route.Name === "Recommandations UX" &&
                                    <SubMenu 
                                        title={route.Name} 
                                        icon={route.icon} 
                                        onClick={() => this.handleToggleSubMenu(route.Name)}
                                        open={this.props.navigation?.menu === route.Name}
                                        className={this.props.navigation?.menu === route.Name && "submenu-title"}
                                    >
                                        <MenuItem 
                                            active={route.Name+"1" === this.props.navigation?.tab} 
                                            onClick={() => this.props.changeActiveItemTabDashboard(route.Name+"1")}
                                        >
                                    
                                            Synthèse
                                            <NavLink exact activeClassName="activeLink" to="/client/recommendations" />
                                        </MenuItem>
                                        <MenuItem 
                                            active={route.Name+"2" === this.props.navigation?.tab} 
                                            onClick={() => this.props.changeActiveItemTabDashboard(route.Name+"2")}
                                        >
                                    
                                            Concrete
                                            <NavLink exact activeClassName="activeLink" to="/client/recommendations/concrete" />
                                        </MenuItem>
                                    </SubMenu>
                                }
                                {
                                    route.Name === "Analyse IA" &&
                                    <SubMenu 
                                        title={route.Name} 
                                        icon={route.icon} 
                                        onClick={() => this.handleToggleSubMenu(route.Name)}
                                        open={this.props.navigation?.menu === route.Name}
                                        className={this.props.navigation?.menu === route.Name && "submenu-title"}
                                    >
                                        <MenuItem 
                                            title="Sémantique" 
                                            active={route.Name+"1" === this.props.navigation?.tab} 
                                            onClick={() => this.handleChangeActiveItem(route.Name+"1")}
                                        >
                                            Analyse Sémantique
                                            <NavLink exact activeClassName="activeLink" to="/client/step-analyze" />
                                        </MenuItem>
                                        {/* <MenuItem 
                                            title="Reconnaissance" 
                                            active={route.Name+"2" === this.props.navigation?.tab} 
                                            onClick={() => this.props.changeActiveItemTabDashboard(route.Name+"2")}
                                        >
                                            Analyse Emotionnelle
                                            { <Link to="/client/facial-recognition" /> }
                                        </MenuItem> */}
                                    </SubMenu>
                                }

                                {
                                    route.Name === "Espace Admin" &&
                                    <SubMenu title={route.Name} icon={route.icon}>
                                        <MenuItem>Gestion clients <Link exact to="/admin/clientValidation" /></MenuItem>
                                        <MenuItem>Gestion testeurs <Link exact to="/admin/testerValidation" /></MenuItem>
                                        <MenuItem>Gestion sous comptes <Link exact to="/admin/sousComptes" /></MenuItem>
                                        <MenuItem>Gestion licences <Link exact to="/admin/licences" /></MenuItem>
                                    </SubMenu>
                                }
                                {
                                    route.Name === "Statistique" &&
                                    <SubMenu title={route.Name} icon={route.icon}>
                                        <MenuItem active={route.Name === this.props.navigation?.tab}>Retours utilisateurs<Link exact to="/admin/statistics" /></MenuItem>
                                        <MenuItem active={route.Name === this.props.navigation?.tab}>Panel d'utilisateurs <Link exact to="/admin/panelStatistics" /></MenuItem>
                                    </SubMenu>
                                }
                                {
                                    route.Name === "Analyse" &&
                                    <SubMenu title={route.Name} icon={route.icon} className='side-bar-menu'>
                                        <MenuItem> Analyse Sémantique <Link exact to="/admin/step-analyze" /></MenuItem>
                                    </SubMenu>
                                }
                                {
                                    route.Name === "Rapports" &&
                                    <SubMenu title={route.Name} icon={route.icon}>
                                        <MenuItem>Rapport pre-audit UX Flash <Link exact to="/admin/pre-audit/ux/flash/form" /></MenuItem>
                                        <MenuItem>Rapport audit UX Flash <Link exact to="/admin/audit/ux/flash/form" /></MenuItem>
                                    </SubMenu>
                                    
                                }
                            </Menu>
                        })
                    }
                </SidebarContent>
                <SidebarFooter>
                    {
                        this.props.auth.user.roles[0] === "ROLE_CLIENT" ? 
                        <img src={Help} style={{ height: '18px', cursor: 'pointer' }} alt="" className='mr-4' onClick={() => this.toggle()} />
                        : null
                    }
                    <a style={{ textDecoration: 'none' }} href="/" onClick={() => {
                        authServices.logout();
                    }}>
                        <i className="fa fa-sign-out fa-lg" aria-hidden="true" style={{ color: '#00A359' }} />
                    </a>
                </SidebarFooter>
            </ProSidebar>
        );
    }
}

VerticalNavBar.propTypes = {
    auth: PropTypes.object,
    changeActiveItemTabDashboard: PropTypes.func,
    collapseDashboard: PropTypes.func,
    changeActiveMenuTabDashboard: PropTypes.func
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    navigation: state.navigation
});
export default connect(mapStateToProps, { changeActiveItemTabDashboard, collapseDashboard, changeActiveMenuTabDashboard })(VerticalNavBar);


import { NavLink } from 'react-router-dom';
import { cilBasket, cilChartLine, cilGrid, cilHome, cilLocationPin } from "@coreui/icons";
import CIcon from '@coreui/icons-react';
import { CNavGroup, CNavItem, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { useUsuario } from '../hooks/useUsuario';
import "../styles/SideBar.css"


export function Sidebar() {

    const { usuario } = useUsuario();

    console.log(JSON.stringify(usuario))

    return (
        <div className="d-flex " >
            <CSidebar position='fixed' colorScheme="dark" className="collapse border-end d-md-block d-block" id="sidebarCollapse" style={{ position: 'relative', height: '100%', backgroundColor: '#52493a' }} unfoldable>
                <CSidebarNav>
                    <CNavGroup toggler={
                        <>
                            <CIcon customClassName={"nav-icon"} icon={cilHome} />
                            Home
                        </>

                    } >
                        <CNavItem >
                            <NavLink to="/home" className="nav-link">
                                <CIcon icon={cilHome} />
                                HOME
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to="/dondeEstamos" className="nav-link">
                                <CIcon icon={cilLocationPin} />
                                DONDE ESTAMOS
                            </NavLink>
                        </CNavItem>
                    </CNavGroup>

                    <CNavGroup toggler={
                        <>
                            <CIcon customClassName={"nav-icon"} icon={cilBasket} />
                            PRODUCTOS
                        </>

                    } >
                        <CNavItem>
                            <NavLink to="/producto" className="nav-link">
                                <CIcon icon={cilBasket} />
                                PRODUCTOS
                            </NavLink>
                        </CNavItem>
                        {usuario.nombre &&
                            <CNavItem>
                                <NavLink to="/grilla" className="nav-link">
                                    <CIcon icon={cilGrid} />
                                    GRILLA
                                </NavLink>
                            </CNavItem>
                        }
                    </CNavGroup>

                    {usuario.nombre &&
                        <CNavGroup toggler={
                            <>
                                <CIcon customClassName={"nav-icon"} icon={cilChartLine} />
                                GRAFICOS
                            </>

                        } >

                            <CNavItem>
                                <NavLink to="/chartsGoogle" className="nav-link">
                                    <CIcon icon={cilChartLine} />
                                    GRAFICOS
                                </NavLink>
                            </CNavItem>
                        </ CNavGroup>
                    }
                </CSidebarNav>
            </CSidebar>
        </div>
    );
}

export default Sidebar;
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'
import { URLEnum } from '../RouterEnum'
// import { getUserActiveRole } from '../util'

import './MainLayout.css';

function MainLayout(item: { token?: string, username?: string, component: JSX.Element }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const navigate = useNavigate()

    // Retrieve the user object from localStorage or any other storage mechanism
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const roles = user?.roles || [];
    const username = user?.name || 'User'; // Retrieve the name from the user object or use a default value

    const fncLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate(URLEnum.BASE);
        // window.location.href = URLEnum.BASE;
        // window.location.replace(URLEnum.HOME);
    }

    const navigateToDashboard = () => {
        // const role = getUserActiveRole()
        // console.log('role:::', role)
        // if (role == null)
        //   return URLEnum.LOGIN

        // switch (role) {
        //   case 'FARS_ADMIN':
        //     return URLEnum.DASHBOARD
        //   case 'FARS_DISTIBUTION_STAFF':
        //     return URLEnum.DASHBOARD
        //   case 'FARS_COLLECTION_STAFF':
        //     return URLEnum.DASHBOARD
        //   default:
        //     return URLEnum.LOGIN
        // }
        return URLEnum.HOME;
    }

    const handleWindowResize = () => {
        setIsSidebarExpanded(window.innerWidth >= 768);
    };

    useEffect(() => {
        // Add window resize event listener
        window.addEventListener("resize", handleWindowResize);

        // Initialize sidebar state based on window width
        setIsSidebarExpanded(window.innerWidth >= 768);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const fncSideBarToggle = () => {
        setIsSidebarExpanded((prevState) => !prevState);
    };

    const sidebarClass = isSidebarExpanded
        ? "sidebar-expanded"
        : "sidebar-collapsed";


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light fixed-size">
                <div className="container-fluid">

                    <button className="btn btn-sm btn-outline-secondary d-block d-md-none ml-auto mb-2" onClick={fncSideBarToggle}>
                        <span className="fas fa-bars"></span>
                    </button>

                    <div className="d-flex align-items-center">
                        <NavLink className="navbar-brand" to={URLEnum.DASHBOARD}>Fars</NavLink>

                        <a className="nav-link" href={URLEnum.BASE}>Welcome Page</a>
                    </div>

                    <div className="d-flex align-items-center">
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {username}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={fncLogOut} href="#">Logout</a></li>
                                    {/* <li><button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                        Log Out
                                        </button></li> */}
                                </ul>
                            </li>
                        </ul>

                    </div>

                </div>
            </nav>


            <div className="big_wrapper">
                <div className="wrapper">
                    {/* <div className="collapse sidebar-collapse d-md-block" id="sidebarSupportedContent"> */}
                    <div className={`sidebar ${sidebarClass}`} id="sidebarSupportedContent">
                        <Nav className="flex-column" id="sidebar">
                            {roles.includes('management-staff') && (
                            <>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.FOOD}>Food</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.DISTRIBUTION_POINT}>Distribution Points</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.COLLECTION_POINT}>Collection Points</NavLink>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.INVENTORY}>Inventory</NavLink>
                                </Nav.Item> */}
                            </>
                            )}
                            {roles.includes('admin') && (
                            <>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.USERS}>Users</NavLink>
                                </Nav.Item>
                            </>
                            )}
                            {roles.includes('distribution-staff') && (
                            <>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.DEMANDS}>Demands</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.TRANSPORTATION}>Transportation</NavLink>
                                </Nav.Item>
                            </>
                            )}
                            {roles.includes('collection-staff') && (
                            <>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.INVENTORY}>Inventory</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.TRANSPORTATION}>Transportation</NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink className="nav-link" to={URLEnum.OPEN_DEMANDS}>Open Demands</NavLink>
                                </Nav.Item>
                            </>
                            )}
                            
                           
                            {/* <hr className="mb-3" /> */}
                            
                        </Nav>

                    </div>
                    <div className="main-content">
                        <div className="wrapper_inner">{item.component}</div>
                    </div>
                </div>




            </div>

        </>
    );
}

export default MainLayout
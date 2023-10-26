import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to='/' className={styles.brand}>
                    Johnny-<strong>Line</strong>
                </NavLink>
                <ul className={styles.linksList}>
                    <li key='flowchart'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Flow
                        </NavLink>
                    </li>
                    <li key='about'>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Sobre
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to='/' className={styles.brand}>
                    Johnny-<strong>Line</strong>
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;

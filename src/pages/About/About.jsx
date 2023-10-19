import { Link } from "react-router-dom";
import styles from "./About.module.css";
const About = () => {
    return (
        <div className={styles.about}>
            <h2>
                Sobre o Johnny-<span>Line</span>
            </h2>
            <p>
                Esse projeto consiste em um flowchart para ser executado por um
                carrinho em Arduino
            </p>
            <Link to='/' className='btn'>
                Criar fluxo
            </Link>
        </div>
    );
};

export default About;

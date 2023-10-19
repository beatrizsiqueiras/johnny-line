import { Link } from "react-router-dom";
import styles from "./About.module.css";
import { useNodesContext } from "../../hooks/useNodesContext";
const About = () => {
    const { nodesContext } = useNodesContext();

    const handlePrintNodes = (e) => {
        e.preventDefault();
        // nodes.map((node) => {
        //     console.log(node);
        // });
        console.log(nodesContext);
    };
    return (
        <div className={styles.about}>
            <h2>
                Sobre o Johnny-<span>Line</span>
            </h2>
            <p>
                Esse projeto consiste em um flowchart para ser executado por um
                carrinho em Arduino
            </p>
            {/* <Link to='/' className='btn'>
                Criar fluxo
            </Link> */}
            <button className="btn" onClick={handlePrintNodes}>
                clicA
            </button>
        </div>
    );
};

export default About;

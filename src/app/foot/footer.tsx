import style from './footer.module.css'
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";


const footer: React.FC = () => {
    return (
        <div className={style.bgDynamic}>
            <h2>Buscas algo mas ?</h2>
            <h3>Para servicios de mezcla y/o Master, o si quieres agendar una cita en nuestro estudio para grabar tu tema, no dudes en contactarnos y pedir tu cotización </h3>
            <img src='Assets Bsp\Vector 5.png' alt=""className={style.black} />
            <button><FaWhatsapp /> WhatsApp</button>
            <img src="Assets Bsp\Line 9.png" alt="" className={style.black}/>
            <button><CiMail /> Mail</button>
            <h5>Todos los derechos reservados por BSP ®</h5>
        </div>
    )
}

export default footer;
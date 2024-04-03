import React from "react";
import style from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div className={style.dad}>
      <nav className={style.header}>
        <ul>
          <li>Tienda</li>
          <li>Contacto</li>
          <li className={style.title}>BSP</li>
          <li>Ubicacion</li>
          <li>Equipos</li>
        </ul>
      </nav>
      <div className={style.imagenPrincipal}>
        <img src="Assets Bsp\pexels-pixabay-164938.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;

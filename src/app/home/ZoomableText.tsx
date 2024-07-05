import React, { useRef, useState } from "react";
import styles from "./home.module.css";

const ZoomableText: React.FC = () => {
  return (
    <div className={styles.container} style={{userSelect:"none"}}>
      <h3 style={{fontSize:"1em"}}>
        Descubre un espacio donde la música cobra vida en cada nota. En BSP,
        nuestro estudio de música ubicado en José Mármol 1324, te invitamos a
        explorar tus talentos y pasiones. Somos más que un estudio; somos un
        lugar donde tus ideas se convierten en realidad. Con equipos de alta
        calidad y un ambiente acogedor, te damos la oportunidad de expresarte y
        crear música que llegue al corazón.
      </h3>
    </div>
  );
};

export default ZoomableText;

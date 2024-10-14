import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import Lista from "../beatsfhome/beatslist";

interface FavProps {
  show: boolean; // Define una prop booleana llamada `show`
}

const Fav: React.FC<FavProps> = ({ show }) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);
  const wrapperFav = useRef<HTMLDivElement>(null);
  const favContainer = useRef<HTMLDivElement>(null);

  const eliminar = () => {
    favContainer.current?.classList.add("style_limpiar__suvfL");
    wrapperFav.current?.classList.add("style_desvanecer__bxvFb");

    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  useEffect(() => {
    show ? setIsVisible(true) : eliminar();
  }, [show]);

  return (
    <div>
      {isVisible ? (
        <div className={`${style.wrapperFav}`} ref={wrapperFav}>
          <div className={style.favContainer} ref={favContainer}>
            <div className={style.favContainerWrpper}>
              <Lista></Lista>
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Fav;

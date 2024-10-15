import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { useGetFavoritesByUserIdQuery } from "../redux/service/music";
import { useSession } from "next-auth/react";

const Fav = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperFav = useRef(null);
  const favContainer = useRef(null);
  const { data: session } = useSession(); // Usa useSession para obtener la sesión
  const userId = session?.user?.id || "";

  // Aquí obtenemos los datos con el hook
  const { data: favItems, error, isFetching } = useGetFavoritesByUserIdQuery({ userId });

  // Función para manejar la eliminación
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

  // Verificar que favItems no sea undefined antes de acceder a documents
  const hasFavorites = favItems && favItems.documents && Array.isArray(favItems.documents) && favItems.documents.length > 0;

  return (
    <div>
      {isVisible ? (
        <div className={`${style.wrapperFav}`} ref={wrapperFav}>
          <div className={style.favContainer} ref={favContainer}>
            <div className={style.favContainerWrpper}>
              {isFetching ? (
                <p>Cargando...</p>
              ) : error ? (
                <p>Error al cargar favoritos: {error.message}</p>
              ) : hasFavorites ? (
                favItems.documents.map((doc) => {
                  const beatId = doc.fields.beatId?.stringValue; // Asegúrate de acceder al valor correcto
                  return (
                    <h2 key={doc.name}>
                      {beatId ? beatId : 'ID no disponible'}
                    </h2>
                  );
                })
              ) : (
                <p>No favorites found</p>
              )}
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

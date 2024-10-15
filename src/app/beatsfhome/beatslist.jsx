import style from "./beatsfhome.module.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { playMusic } from "../redux/slices/generealSlice";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import styles from "./../header/style.module.css";
import { useFavorites } from "../hooks/useFavorite";
import LoadingIcon from "./loadingIcon/LoadingIcon";
const Lista = () => {
  const dispatch = useDispatch();
  const ListaDeBeats = useSelector((state) => state.general.allMusic);
  const { favorites, addFavoriteCall, removeFavorite, loading } =
    useFavorites();

  const reproducirBeat = (id) => {
    dispatch(playMusic(id));
  };

  const handleFavoriteClick = async (beatId) => {
    try {
      if (favorites.includes(beatId)) {
        await removeFavorite(beatId);
      } else {
        await addFavoriteCall(beatId);
      }
    } catch (error) {
      console.error("Error in handleFavoriteClick: ", error);
    }
  };

  return (
    <div className={style.fatherOfList}>
      {ListaDeBeats.length > 0 &&
        ListaDeBeats.slice(0, 6).map((beat) => (
          <div
            key={beat.id}
            className={style.cardOfBeat}
            onClick={() => reproducirBeat(beat.id)}
          >
            <img
              src={`/api/proxy?url=${encodeURIComponent(beat.pic)}`}
              alt={beat.pic}
              className={style.pic}
            />
            <h2 className={style.name}>
              {beat.nombre.length > 15
                ? `${beat.nombre.substring(0, 15)}...`
                : beat.nombre}
            </h2>
            <h2 className={style.genero}>{beat.genero}</h2>

            <div
              className={style.coraIcon}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(beat.id);
              }}
            >
              {loading[beat.id] ? ( // Usa loading[beat.id] para verificar el estado de carga
                <LoadingIcon></LoadingIcon> // Muestra un indicador de carga
              ) : favorites.includes(beat.id) ? (
                <MdOutlineFavorite
                  className={`${style.favIcon} ${styles.one}`}
                />
              ) : (
                <MdFavoriteBorder
                  className={`${style.favIcon} ${styles.two}`}
                />
              )}
            </div>

            <div className={style.bpm}>
              <h2>{beat.bpm}</h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Lista;

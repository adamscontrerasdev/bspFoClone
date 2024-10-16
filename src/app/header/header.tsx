import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./style.module.css";
import { MdOutlineFavorite, MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeMusic } from "../redux/slices/generealSlice";
import { FaCheckCircle, FaUserAltSlash } from "react-icons/fa";
import Modal from "./../modal/Modal";
import Login from "../login/login";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";

interface HeaderProps {
  setShowFav?: React.Dispatch<React.SetStateAction<boolean>>; // Definimos el tipo de la prop
}

const Header: React.FC<HeaderProps> = ({ setShowFav }) => {
  const router = usePathname();
  const [buscar, setBuscar] = useState(false);
  const beatRef = useRef<HTMLAnchorElement | null>(null);
  const sampleRef = useRef<HTMLAnchorElement | null>(null);
  const music = useSelector((state: any) => state.general.musicPlay);
  const dispatch = useDispatch();
  const ubi = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [iniciado, setIniciado] = useState<Boolean>(false);
  const [localSession, setLocalSession] = useState<any>(null);

  const fetchSession = async () => {
    const session = await getSession();
    session ? setIniciado(true) : setIniciado(false);
    session ? setLocalSession(session) : setLocalSession("");
  };
  useEffect(() => {
    fetchSession();
    router != "/" ? setBuscar(true) : setBuscar(false);
    router == "/beats"
      ? beatRef.current?.classList.add("style_borroso__p0bLb")
      : beatRef.current?.classList.remove("style_borroso__p0bLb");
    router == "/samples-pack"
      ? sampleRef.current?.classList.add("style_borroso__p0bLb")
      : sampleRef.current?.classList.remove("style_borroso__p0bLb");
  }, [router]);

  const cerrar = (ubiAhora: string) => {
    if (ubiAhora !== ubi) {
      dispatch(removeMusic());
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showFavorite = () => {
    setShowFav ? setShowFav((prev) => !prev) : alert; // Alternamos el valor de showFav
  };

  return (
    <div className={styles.father}>
      <Link href="/" className={styles.logo} onClick={() => cerrar("/")}>
        <h1>BSP</h1>
      </Link>
      {buscar && (
        <input className={styles.buscador} placeholder="Buscar" type="text" />
      )}
      <div className={styles.options}>
        <div className={styles.circleOfLogin} onClick={toggleModal}>
          {iniciado ? (
            <div className={styles.imageContainer}>
              <Image
                src={`/api/proxy?url=${
                  encodeURIComponent(localSession.user.image) ||
                  "/AssetsBsp/Sample_User_Icon.png"
                }`}
                alt="Perfil"
                width={96}
                height={96}
                quality={100}
                className={styles.imgPerfil}
              />
              <FaCheckCircle
                style={{
                  position: "absolute",
                  fontSize: "12px",
                  left: "0",
                  bottom: "0",
                  fill: "#0d0",
                }}
              />
            </div>
          ) : (
            <FaUserAltSlash className={styles.userIcon} />
          )}
        </div>
        <Modal show={showModal} onClose={toggleModal}>
          <Login></Login>
        </Modal>
        <Link
          href="/beats"
          className={`${styles.beats}`}
          ref={beatRef}
          onClick={() => cerrar("/beats")}
        >
          <h4>Beats</h4>
        </Link>
        <Link
          href="/samples_packs"
          className={styles.samples_packs}
          ref={sampleRef}
          onClick={() => cerrar("/sample")}
        >
          <h4>samples packs</h4>
        </Link>
        <div className={styles.coraContainer} onClick={showFavorite}>
          <MdOutlineFavorite className={`${styles.favIcon} ${styles.one}`} />
          <MdFavoriteBorder className={`${styles.favIcon} ${styles.two} `} />
        </div>
      </div>
    </div>
  );
};

export default Header;

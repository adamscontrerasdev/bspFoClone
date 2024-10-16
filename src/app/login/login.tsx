import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn, getSession, signOut } from "next-auth/react";
import Image from "next/image";
import style from "./login.module.css";
import stylesLoader from "./../Loader.module.css";

const Login = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      const session = await getSession();
      console.log(session); // Agrega este log para verificar la sesión
      setSession(session);
      setIsLoading(false);
    };
    fetchSession();
  }, []);

  if (isLoading) {
    return (
      <div className={style.containerLogin}>
        <div className={style.loadingContainer}>
          <div className={stylesLoader.loader}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.containerLogin}>
      {!session ? (
        <div className={style.iniciarContainer}>
          <h2>Inicia sesión con Google</h2>
          <p>Inicio sesión y datos protegidos por Google®</p>
          <button
            onClick={() => signIn("google", { prompt: "select_account" })}
          >
            Iniciar sesión <FcGoogle style={{ fontSize: "24px" }} />
          </button>
        </div>
      ) : (
        <div className={style.iniciadoContainer}>
          <h2 className={style.titleLogin}>Bienvenido, {session.user.name}</h2>
          <div className={style.imgContainer}>
            <Image
              src={`/api/proxy?url=${
                encodeURIComponent(session.user.image) ||
                "/AssetsBsp/Sample_User_Icon.png"
              }`}
              alt="Perfil"
              width={96}
              height={96}
              quality={100}
              className={style.imageUser}
            />
            <div className={style.lineDraw}></div>
            <div className={style.lineDraw2}></div>
            <div className={style.lineDraw3}></div>
          </div>
          <p className={style.emailUser}>{session.user.email}</p>
          <button onClick={() => signOut()} className={style.buttonCerrar}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

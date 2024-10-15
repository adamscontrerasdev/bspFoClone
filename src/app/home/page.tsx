// pages/index.js
"use client";
import React, { useRef } from "react";
import style from "./home.module.css";
import { useState, useEffect } from "react";
import MapComponent from "./map";
import Link from "next/link";
import ZoomableText from "./ZoomableText";
import Data from "./data.json";
import Image from "next/image";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import useDeviceWidth from "./../../useDeviceWidth";

const Home: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const navComponent = useRef<HTMLDivElement>(null);
  const navComponentFather = useRef<HTMLUListElement>(null);
  const [WNav, setWNav] = useState(0);
  const containerTwoVisible = useRef<HTMLDivElement>(null);
  const BSPContainer = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>(600);
  const header = useRef<HTMLDivElement>(null);
  const [ubicacionDelUsuario, setUbicacionDelUsuario] = useState(3);
  const visibleContainerTwo = useRef<HTMLDivElement>(null);
  const Contacto = useRef<HTMLDivElement>(null);
  const [data] = useState(Data);
  const [widthDiviceItsEnough, setWidthDiviceItsEnough] = useState(false);
  const auris = useRef<HTMLDivElement>(null);
  const cuerdas = useRef<HTMLDivElement>(null);
  const micros = useRef<HTMLDivElement>(null);
  const monitores = useRef<HTMLDivElement>(null);
  const Ids = useRef<HTMLDivElement>(null);
  const pedales = useRef<HTMLDivElement>(null);
  const teclados = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e) => {
    if (isHovering) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const getLeftPosition = () => {
    if (navComponentFather.current) {
      const navRect = navComponentFather.current.getBoundingClientRect();
      const navLeft = navRect.left;
      const cursorX = position.x - 50;
      const leftPosition = cursorX - navLeft;
      return leftPosition;
    }
    return 0;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  //TODO------Funciones para ver que pagina esta viendo el usuario----------------
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerTwoVisible.current &&
        BSPContainer.current &&
        containerTwoVisible.current.getBoundingClientRect().top <= 0 &&
        containerTwoVisible.current.getBoundingClientRect().top > -100
      ) {
        setUbicacionDelUsuario(4);
      } else if (
        BSPContainer.current &&
        BSPContainer.current.getBoundingClientRect().top <= 0 &&
        BSPContainer.current.getBoundingClientRect().top > -100
      ) {
        setUbicacionDelUsuario(3);
      } else if (
        visibleContainerTwo.current &&
        visibleContainerTwo.current.getBoundingClientRect().top <= 0 &&
        visibleContainerTwo.current.getBoundingClientRect().top > -100
      ) {
        setUbicacionDelUsuario(5);
      } else if (
        Contacto.current &&
        Contacto.current.getBoundingClientRect().top <= 0 &&
        Contacto.current.getBoundingClientRect().top > -100
      ) {
        setUbicacionDelUsuario(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //TODO---------------------------------------------------------
  useEffect(() => {
    if (navComponentFather.current) {
      setWNav(navComponentFather.current.offsetWidth);
    }
  }, [WNav]);

  useEffect(() => {
    if (
      navComponent.current &&
      ubicacionDelUsuario == 4 &&
      widthDiviceItsEnough
    ) {
      navComponent.current.classList.remove("home_objMov__QBfMb");
      navComponent.current.classList.remove("home_equipos__AuPR4");
      navComponent.current.classList.remove("home_contacto__4BK_n");
      //!----------------------------------------------------------------
      navComponent.current.classList.add("home_ubicacion__8chJa");
      //!----------------------------------------------------------------
      // setHoverredFUbicacion(true);
    } else if (
      navComponent.current &&
      ubicacionDelUsuario == 3 &&
      widthDiviceItsEnough
    ) {
      navComponent.current.classList.remove("home_ubicacion__8chJa");
      navComponent.current.classList.remove("home_equipos__AuPR4");
      navComponent.current.classList.remove("home_contacto__4BK_n");
      //!----------------------------------------------------------------
      navComponent.current.classList.add("home_objMov__QBfMb");
      //!----------------------------------------------------------------
      // setHoverredFUbicacion(false);
    } else if (
      navComponent.current &&
      ubicacionDelUsuario == 5 &&
      widthDiviceItsEnough
    ) {
      navComponent.current.classList.remove("home_objMov__QBfMb");
      navComponent.current.classList.remove("home_ubicacion__8chJa");
      navComponent.current.classList.remove("home_contacto__4BK_n");

      //!----------------------------------------------------------------
      navComponent.current.classList.add("home_equipos__AuPR4");
      //!----------------------------------------------------------------
    } else if (
      navComponent.current &&
      ubicacionDelUsuario == 1 &&
      widthDiviceItsEnough
    ) {
      navComponent.current.classList.remove("home_equipos__AuPR4");
      navComponent.current.classList.remove("home_ubicacion__8chJa");
      navComponent.current.classList.remove("home_objMov__QBfMb");
      //!----------------------------------------------------------------
      navComponent.current.classList.add("home_contacto__4BK_n");
    }

    if (!isHovering && widthDiviceItsEnough) {
      if (navComponent.current && ubicacionDelUsuario == 3) {
        navComponent.current.classList.add("home_objMov__QBfMb");
      } else if (
        navComponent.current &&
        ubicacionDelUsuario == 4 &&
        widthDiviceItsEnough
      ) {
        navComponent.current.classList.add("home_ubicacion__8chJa");
      } else if (
        navComponent.current &&
        ubicacionDelUsuario == 5 &&
        widthDiviceItsEnough
      ) {
        navComponent.current.classList.add("home_equipos__AuPR4");
      } else if (navComponent.current) {
        navComponent.current.classList.add("home_contacto__4BK_n");
      }
    } else {
      if (navComponent.current && widthDiviceItsEnough) {
        navComponent.current.classList.remove("home_objMov__QBfMb");
        navComponent.current.classList.remove("home_ubicacion__8chJa");
        navComponent.current.classList.remove("home_equipos__AuPR4");
        navComponent.current.classList.remove("home_contacto__4BK_n");
      }
    }
  }, [isHovering, ubicacionDelUsuario]);

  //?Effect para el ancho de pantalla-----------------------------------
  const widthDevice = useDeviceWidth();
  useEffect(() => {
    widthDevice
      ? widthDevice >= 1920
        ? setWidthDiviceItsEnough(true)
        : setWidthDiviceItsEnough(false)
      : setWidthDiviceItsEnough(false);
  }, [widthDevice, widthDiviceItsEnough]);

  // useEffect(() => {
  //   if (ContentGeneralOfSize.current) {
  //     const cards = ContentGeneralOfSize.current.querySelectorAll<HTMLElement>(
  //       `.${style.cards}`
  //     );
  //     const totalWidth = Array.from(cards).reduce(
  //       (acc, card) => acc + card.offsetWidth,
  //       0
  //     );
  //     ContentGeneralOfSize.current.style.width = `${totalWidth}px`;
  //   }
  // }, [data]);

  useEffect(() => {
    const calculateTotalWidth = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        const cards = ref.current.querySelectorAll<HTMLElement>(
          `.${style.cards}`
        );
        const totalWidth = Array.from(cards).reduce(
          (acc, card) => acc + card.offsetWidth,
          0
        );
        return totalWidth;
      }
      return 0;
    };

    const setContainerWidth = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref.current) {
        const totalWidth = calculateTotalWidth(ref);
        ref.current.style.width = `${totalWidth}px`;
      }
    };

    setContainerWidth(auris);
    setContainerWidth(cuerdas);
    setContainerWidth(micros);
    setContainerWidth(monitores);
    setContainerWidth(Ids);
    setContainerWidth(pedales);
    setContainerWidth(teclados);
  }, [data]);

  return (
    <div className={style.dad} onMouseMove={handleMouseMove}>
      {ubicacionDelUsuario != 3 && <div className={style.paCambiar}></div>}
      {widthDiviceItsEnough ? (
        <nav className={style.header} ref={header}>
          <ul
            className={style.navbar}
            ref={navComponentFather}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovering && (
              <div
                className={style.objMov}
                ref={navComponent}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${getLeftPosition()}px`,
                  width: "20%",
                  height: "100%",
                  background: "#FFF",
                  zIndex: -10,
                  borderRadius: "0 0 20px 20px",
                }}
              ></div>
            )}
            {!isHovering && (
              <div className={`${style.objMov}`} ref={navComponent}></div>
            )}
            <li>Tienda</li>
            {ubicacionDelUsuario == 1 ? (
              <li style={{ color: "#000" }}>
                <Link href="#Contacto">Contacto</Link>
              </li>
            ) : (
              <li>
                <Link href="#Contacto">Contacto</Link>
              </li>
            )}
            {ubicacionDelUsuario == 3 ? (
              <li className={style.title}>
                <Link href="#BSP">BSP</Link>
              </li>
            ) : (
              <li className={style.title2}>
                <Link href="#BSP">BSP</Link>
              </li>
            )}
            {ubicacionDelUsuario == 4 ? (
              <li style={{ color: "#000" }}>
                <Link href="#Ubicacion">Ubicacion</Link>
              </li>
            ) : (
              <li>
                <Link href="#Ubicacion">Ubicacion</Link>
              </li>
            )}
            {ubicacionDelUsuario == 5 ? (
              <li style={{ color: "#000" }}>
                <Link href="#Equipos">Equipos</Link>
              </li>
            ) : (
              <li>
                <Link href="#Equipos">Equipos</Link>
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <nav className={style.navFoPhone}>
          <ul>
            <Link href="#Tienda">
              <li>Tienda</li>
            </Link>
            <Link href="#Contacto">
              <li>Contacto</li>
            </Link>
            <Link href="#BSP">
              <li className={style.titleOfPhone}>BSP</li>
            </Link>
            <Link href="#Ubicacion">
              <li>Ubicacion</li>
            </Link>
            <Link href="#Equipos">
              <li>Equipos</li>
            </Link>
          </ul>
        </nav>
      )}
      <div className={style.imagenPrincipal}>
        <img src={data.principal} alt="" />
      </div>
      <div className={style.padreDeLaInfo} id="BSP" ref={BSPContainer}>
        <div className={style.contenedoresInformativos}>
          <div className={style.firstContainer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut
            quod sint quia sequi! Exercitationem rerum laudantium voluptatibus
            cum architecto consequuntur nam, similique impedit optio eius earum?
            Necessitatibus, a corporis?
          </div>
          <div className={style.secondContainer}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatibus rem excepturi blanditiis atque iure sapiente minima
            porro error enim? Fugiat est sit eius magnam consequatur quos
            incidunt modi voluptatum nisi!
          </div>
        </div>
      </div>
      <div className={style.containerTwo}>
        <div
          className={style.visibleContainer}
          id="Ubicacion"
          ref={containerTwoVisible}
        >
          <div className={style.containerOfmap}>
            <MapComponent bool={widthDiviceItsEnough}></MapComponent>
            <div className={style.infoEnText}>
              <h1>BSP®</h1>
              <ZoomableText></ZoomableText>
            </div>
          </div>
        </div>
      </div>
      <div className={style.containerThree}>
        <div
          id="Equipos"
          className={`${style.visibleContainerTwo}`}
          ref={visibleContainerTwo}
        >
          <div className={style.equipoosTitle}>
            <h2 className={style.E}>E</h2>
            <h2 className={style.Q}>q</h2>
            <h2 className={style.U}>u</h2>
            <h2 className={style.I}>i</h2>
            <h2 className={style.P}>p</h2>
            <h2 className={style.O}>o</h2>
            <h2 className={style.S}>s</h2>
          </div>
          <br />
          <h2
            style={{
              color: "#fff",
              position: "relative",
              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Auriculares
          </h2>
          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsAuris}
              style={{ background: "#000" }}
            >
              {data.categorias[0].Auriculares &&
                data.categorias[0].Auriculares.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsAuris} ref={auris}>
                  {data.categorias[0].Auriculares &&
                    data.categorias[0].Auriculares.map((item, index) => (
                      <div key={index} className={style.cards}>
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",
              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Cuerdas
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsCuerdas}
              style={{ background: "#000" }}
            >
              {data &&
                data.categorias[1].Cuerdas &&
                data.categorias[1].Cuerdas.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt={item.name} />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsCuerdas} ref={cuerdas}>
                  {data &&
                    data.categorias[1].Cuerdas &&
                    data.categorias[1].Cuerdas.map((item, index) => (
                      <div key={index} className={style.cards}>
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",
              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Microfonos
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsMicros}
              style={{ background: "#000" }}
            >
              {data.categorias[2].Microfonos &&
                data.categorias[2].Microfonos.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsMicros} ref={micros}>
                  {data.categorias[2].Microfonos &&
                    data.categorias[2].Microfonos.map((item, index) => (
                      <div key={index} className={style.cards}>
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",

              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Monitores
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsMonitores}
              style={{ background: "#000" }}
            >
              {data.categorias[3].Monitores &&
                data.categorias[3].Monitores.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsMonitores} ref={monitores}>
                  {data.categorias[3].Monitores &&
                    data.categorias[3].Monitores.map((item, index) => (
                      <div
                        key={index}
                        className={style.cards}
                        style={{ width: "80vw !important" }}
                      >
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",

              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Interfaces de sonido
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsIDS}
              style={{ background: "#000" }}
            >
              {data.categorias[4].InterfazDeSonido &&
                data.categorias[4].InterfazDeSonido.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsIDS} ref={Ids}>
                  {data.categorias[4].InterfazDeSonido &&
                    data.categorias[4].InterfazDeSonido.map((item, index) => (
                      <div key={index} className={style.cards}>
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",
              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Pedales
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsPedales}
              style={{ background: "#000" }}
            >
              {data.categorias[5].Pedales &&
                data.categorias[5].Pedales.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsPedales} ref={pedales}>
                  {data.categorias[5].Pedales &&
                    data.categorias[5].Pedales.map((item, index) => (
                      <div
                        key={index}
                        className={style.cards}
                        style={{ width: "88vw !important" }}
                      >
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <h2
            style={{
              color: "#fff",
              position: "relative",
              fontSize: "26px",
              fontWeight: "300",
            }}
          >
            Teclados
          </h2>

          {widthDiviceItsEnough ? (
            <div
              className={style.contentOFCardsTeclados}
              style={{ background: "#000" }}
            >
              {data.categorias[6].Teclados &&
                data.categorias[6].Teclados.map((item, index) => (
                  <div key={index} className={style.cards}>
                    <div className={style.pic}>
                      <img src={item.pic} alt="" />
                    </div>
                    <div className={style.nameOfCard}>
                      <h2>{item.name}</h2>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className={style.container}>
              <div className={style.contentWrapper}>
                <div className={style.contentOFCardsTeclados} ref={teclados}>
                  {data.categorias[6].Teclados &&
                    data.categorias[6].Teclados.map((item, index) => (
                      <div key={index} className={style.cards}>
                        <div className={style.pic}>
                          <img src={item.pic} alt="" />
                        </div>
                        <div className={style.nameOfCard}>
                          <h2>{item.name}</h2>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className={style.containerFour}>
            <div className={style.contenidoFour} id="Contacto" ref={Contacto}>
              <div className={style.contactContainer}>
                <h2>
                  <a
                    href={`https://wa.me/${data.contacto.Whatsapp}`}
                    target="_blank"
                  >
                    <BsWhatsapp />
                  </a>
                </h2>
                <h2>
                  <a href={`${data.contacto.ig}`} target="_blank">
                    <FaInstagram color="blue" />
                  </a>
                </h2>
                <h2>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${data.contacto.correo}&su=Asunto%20del%20correo&body=Cuerpo%20del%20correo`}
                    target="_blank"
                  >
                    <CiMail />
                  </a>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

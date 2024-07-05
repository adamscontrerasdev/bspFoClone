import React, { useRef, useState, useEffect } from "react";
import style from "./repro.module.css";
import { ListOfBeatsInterface } from "./beatslist";
import { FaPlay, FaPause } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoReturnDownBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeMusic } from "../redux/slices/generealSlice";
import { IoIosMenu } from "react-icons/io";
import Vibrant from "node-vibrant";
import { GoX } from "react-icons/go";
import ColorAdaptiveDiv from "./colorAdaptativeDiv";
import classNames from "classnames";

interface BeatDetailProps {
  beat: ListOfBeatsInterface;
}

interface Colors {
  vibrant?: string;
  muted?: string;
}

const Reproductor: React.FC<BeatDetailProps> = ({ beat }) => {
  const [iconColor, setIconColor] = useState<string>(null);
  const [vibrantIdErr, setVibrantIdErr] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [colors, setColors] = useState<Colors>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [viewDetailOfBuy, setViewDetailOfBuy] = useState<boolean>(false);
  const detailOfBuy = useRef<HTMLDivElement>(null);
  const [itsOpen, setItsOpen] = useState<boolean>(false);
  const music = useSelector((state: any) => state.general.musicPlay);
  const [musicInPlay, setMusicInPlay] = useState({
    nombre: "",
    audio: "",
    key: "",
    pic: "",
    bpm: "",
    genero: "",
    id: "",
  });
  const dispatch = useDispatch();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fatherReprRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const updateTimeHandler = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const seekHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    setMusicInPlay(music);
  }, [music]);

  useEffect(() => {
    setCurrentTime(0);
  }, [beat]);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTimeHandler();
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const cerrar = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    dispatch(removeMusic());
    setItsOpen(false);
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const initialY = e.clientY;
    const initialHeight = fatherReprRef.current?.offsetHeight || 0;

    const doDrag = (event: MouseEvent) => {
      const newHeight = initialHeight + (initialY - event.clientY);
      if (fatherReprRef.current) {
        fatherReprRef.current.style.height = `${newHeight}px`;
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);

      if (fatherReprRef.current) {
        const finalHeight = fatherReprRef.current.offsetHeight;
        if (finalHeight < 150) {
          fatherReprRef.current.style.height = "90px";
        } else if (finalHeight < window.innerHeight / 2) {
          fatherReprRef.current.style.height = "90vh";
        } else {
          fatherReprRef.current.style.height = "90vh";
        }
      }
    };

    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const abrir = () => {
    if (fatherReprRef.current?.style.height === "90px") {
      fatherReprRef.current.style.height = "90vh";
      setItsOpen(true);
      // setTimeout(() => {
      //   setViewDetailOfBuy(true);
      // }, 500);
      setViewDetailOfBuy(true);
    } else {
      fatherReprRef.current.style.height = "90px";
      setTimeout(() => {
        setItsOpen(false);
      }, 300);

      setTimeout(() => {
        setViewDetailOfBuy(false);
      }, 500);

      if (detailOfBuy.current && viewDetailOfBuy === true) {
        detailOfBuy.current.classList.toggle("repro_cerrarDetailOfBuy__iRRnk");
      }
    }
  };

  const handleVibrantError = (error: any) => {
    console.error("Error al detectar colores con Vibrant:", error);
    setColors({
      vibrant: "#FFFFFF", // Blanco u otro color predeterminado
      muted: "#fff", // Gris claro u otro color predeterminado
    });
    setVibrantIdErr(true);
  };

  useEffect(() => {
    if (musicInPlay.pic && imgRef.current) {
      const proxyUrl = `api/proxy?url=${encodeURIComponent(musicInPlay.pic)}`;
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = proxyUrl;
      img.onload = () => {
        const vibrant = new Vibrant(img, { quality: 1 });

        vibrant.getPalette((err, palette) => {
          if (err) {
            handleVibrantError(err);
            return;
          }
          if (palette) {
            setColors({
              vibrant: palette.Vibrant?.getHex(),
              muted: palette.Muted?.getHex(),
            });
            setVibrantIdErr(false);
          } else {
            handleVibrantError("Palette is null or undefined");
          }
        });
      };
      img.onerror = (err) => {
        handleVibrantError(err);
      };
      imgRef.current.src = proxyUrl;
    }
  }, [musicInPlay.pic]);

  useEffect(() => {
    // Función para calcular la luminosidad del color
    const isDarkColor = (color: string) => {
      // Convertir color a RGB
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;

      // Calcular la luminosidad relativa
      const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // Comparar con umbral de luminosidad
      return luminosity <= 128; // Umbral de luminosidad (ajustable según necesidad)
    };

    // Aplicar estilo basado en la luminosidad del color de fondo
    if (fatherReprRef.current && colors.vibrant) {
      const backgroundColor = colors.vibrant;
      // const iconColor = isDarkColor(backgroundColor) ? "#FFFFFF" : "#000000";
      isDarkColor(backgroundColor)
        ? setIconColor("#FFFFFF")
        : setIconColor("#000000");

      // Obtener todos los iconos dentro de fatherReprRef
      const icons = fatherReprRef.current.querySelectorAll(".icono");

      // Aplicar color blanco a los iconos
      icons.forEach((icon: HTMLElement) => {
        icon.style.color = iconColor;
        icon.style.fill = iconColor;
        icon.style.stroke = iconColor;

        console.log(icon);
      });
    }
  }, [colors.vibrant]);

  //--------------------------------------

  return (
    <>
      {musicInPlay.nombre && (
        <div
          className={style.container}
          ref={fatherReprRef}
          style={{
            backgroundColor: vibrantIdErr ? colors.muted : colors.vibrant,
          }}
        >
          <div
            className={style.dragHandle}
            ref={dragRef}
            onMouseDown={startDrag}
            onClick={abrir}
            style={{
              backgroundColor: vibrantIdErr ? colors.muted : colors.vibrant,
            }}
          >
            <IoIosMenu
              style={{
                fill: iconColor,
                color: iconColor,
                stroke: iconColor,
                transition: "all .5s",
              }}
            />
          </div>
          <div
            className={`${style.fatherOfRep} ${itsOpen ? style.openRep : ""}`}
            style={{ resize: "vertical", overflow: "auto" }}
          >
            <audio
              src={musicInPlay.audio ?? ""}
              controls
              ref={(node) => (audioRef.current = node)}
              className={style.reproductor}
              onTimeUpdate={updateTimeHandler}
              hidden
            ></audio>
            <img src={musicInPlay.pic ?? ""} alt="Album Art" ref={imgRef} />
            <span className={style.lineOfSep1}></span>
            <div className={style.nameAndGenero}>
              <h2
                style={{
                  fill: iconColor,
                  color: iconColor,
                  stroke: iconColor,
                  transition: "all .5s",
                }}
              >
                {musicInPlay.nombre ?? ""}
              </h2>
              <p
                style={{
                  fill: iconColor,
                  color: iconColor,
                  stroke: iconColor,
                  transition: "all .5s",
                }}
              >
                {musicInPlay.genero ?? ""}
              </p>
            </div>
            <input
              type="range"
              value={currentTime}
              max={audioRef.current ? audioRef.current.duration : 0}
              onChange={seekHandler}
              className={
                iconColor === "#FFFFFF" ? style.inputClear : style.inputDark
              }
            />
            <button onClick={handlePlayPause} className={style.buttonOfRep}>
              {isPlaying ? (
                <FaPause
                  style={{
                    fill: iconColor,
                    color: iconColor,
                    stroke: iconColor,
                    transition: "all .5s",
                  }}
                />
              ) : (
                <FaPlay
                  style={{
                    fill: iconColor,
                    color: iconColor,
                    stroke: iconColor,
                    transition: "all .5s",
                  }}
                />
              )}
            </button>
            <div className={style.cornerButons}>
              {" "}
              <button
                onClick={handleRestart}
                className={style.buttonOfRepReiniciar}
              >
                <IoReturnDownBack
                  style={{
                    fill: iconColor,
                    color: iconColor,
                    stroke: iconColor,
                    transition: "all .5s",
                  }}
                />
              </button>
              <div className={style.cerrar} onClick={cerrar}>
                <GoX
                  style={{
                    fill: iconColor,
                    color: iconColor,
                    stroke: iconColor,
                    transition: "all .5s",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            {viewDetailOfBuy && (
              <div className={style.purchaseInfo} ref={detailOfBuy}>
                <div className={style.nombreGenero}>
                  <h2 style={{ color: iconColor }}>
                    PISTA: {musicInPlay.nombre}
                  </h2>
                  <h2 style={{ color: iconColor }}>
                    GENERO: {musicInPlay.genero}
                  </h2>
                </div>
                <div className={style.escalaTempo}>
                  <h2 style={{ color: iconColor }}>
                    ESCALA: {musicInPlay.key}
                  </h2>
                  <h2 style={{ color: iconColor }}>BPM: {musicInPlay.bpm}</h2>
                </div>
                <h2 style={{color: iconColor}}>PRECIO: 15$</h2>

                <button
                  className={`${
                    iconColor === "#FFFFFF" ? style.fondoNegro : style.fondoBlanco
                  }`}
                >
                  COMPRAR
                </button>

                <p style={{color:iconColor}}>Todos los derechos reservados por BSP. Compra protegida por Stripe para garantizar la seguridad de tus transacciones. Encuentra y compra los mejores beats para tus proyectos musicales de manera fácil y segura. En BSP, nos comprometemos a ofrecerte calidad y un excelente servicio al cliente. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos. Gracias por confiar en BSP para tus necesidades musicales.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Reproductor;

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
import "./../globals.css";
interface BeatDetailProps {
  beat: ListOfBeatsInterface;
}

interface Colors {
  vibrant?: string;
  muted?: string;
  lightVibrant?: string;
  darkMuted?: string;
  lightMuted?: string;
  secondary?: string;
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
  const [immediateClosure, setImmediateClosure] = useState<boolean>(false);
  const priceStems = useRef<HTMLDivElement>(null);
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

  const [totalPrice, setTotalPrice] = useState(0);
  const priceWav = useRef(null);
  const priceStems2 = useRef(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [errCompra, setErrCompra] = useState<boolean>(false);
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

    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
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
    setViewDetailOfBuy(false);
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
      setImmediateClosure(false);
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

      setImmediateClosure(true);

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
              secondary: palette.DarkVibrant?.getHex(),
              lightVibrant: palette.LightVibrant?.getHex(),
              darkMuted: palette.DarkMuted?.getHex(),
              lightMuted: palette.LightMuted?.getHex(),
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
      const backgroundColor = colors.secondary;
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

      });
    }
  }, [colors.vibrant]);

  //--------------------------------------
  const togglePrice = (priceElement, isChecked, setIsChecked) => {
    const priceH2 = parseInt(priceElement.current.textContent, 10);
    if (!isChecked) {
      setTotalPrice(totalPrice + priceH2);
    } else {
      setTotalPrice(totalPrice - priceH2);
    }
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    // Actualiza la variable CSS
    document.documentElement.style.setProperty("--checked-bg", colors.vibrant);
    document.documentElement.style.setProperty(
      "--sencondaryMusic",
      colors.secondary
    );
  }, [colors.vibrant]);

  useEffect(() => {
    const updateBackground = () => {
      if (sliderRef.current && audioRef.current) {
        const value = parseFloat(sliderRef.current.value);
        const max = parseFloat(sliderRef.current.max);
        const percentage = (value / max) * 100;
        sliderRef.current.style.background = `linear-gradient(to right, #000, ${colors.secondary} ${percentage}%, #000 ${percentage}%)`;
      }
    };

    if (sliderRef.current) {
      updateBackground();
      sliderRef.current.addEventListener("input", updateBackground);
    }

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("input", updateBackground);
      }
    };
  }, [currentTime, audioRef.current?.duration]);

  const selectAll = () => {
    const total =
      parseInt(priceStems2.current.textContent) +
      parseInt(priceWav.current.textContent);
    setIsChecked1(true);
    setIsChecked2(true);
    setTotalPrice(total);
  };

  const playErrorSound = () => {
    const errorSound = new Audio("sonidos/errSound.wav");
    errorSound.volume = 0.3; 
    errorSound.play();
  };
  const gestorDeCompra = () => {
    if (totalPrice !== 0) {
      alert("voy");
    } else {
      setErrCompra(false);
      setTimeout(() => {
        setErrCompra(true);
        playErrorSound();
      }, 10); // Retraso corto para forzar el re-render
    }
  };
  return (
    <>
      {musicInPlay.nombre && (
        <div
          className={style.container}
          ref={fatherReprRef}
          style={{
            background: `linear-gradient(to bottom, #000, ${colors.vibrant})`,
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
            <img
              src={musicInPlay.pic ?? ""}
              alt="Album Art"
              ref={imgRef}
              className={`${immediateClosure ? style.cierra : ""}`}
            />
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
              ref={sliderRef}
              type="range"
              value={currentTime}
              min="0"
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
                <div
                  className={`${style.trackInfo} ${style.boxs}`}
                  style={{
                    background: `linear-gradient(to bottom, #000, ${colors.secondary})`,
                  }}
                >
                  <h2>DETALLES DE BEAT</h2>
                  <div className={style.itemsOfInformation}>
                    <h2>
                      <span className={style.letraChica}>NOMBRE: </span>
                      {musicInPlay.nombre}
                    </h2>
                    <h2>
                      <span className={style.letraChica}>GENERO: </span>
                      {musicInPlay.genero}
                    </h2>
                    <h2>
                      <span className={style.letraChica}>BPM: </span>
                      {musicInPlay.bpm}
                    </h2>
                    <h2>
                      <span className={style.letraChica}>ESCALA: </span>
                      {musicInPlay.key}
                    </h2>
                  </div>
                </div>
                <div className={style.price}>
                  <h2>
                    {totalPrice}
                    <span style={{ fontSize: "16px" }}>$</span>
                  </h2>

                  <div
                    className={style.line}
                    style={{ background: colors.secondary }}
                  ></div>
                  <button
                    className={style.buttonOfBuy}
                    style={{
                      background: `linear-gradient(to bottom, #000, ${colors.secondary})`,
                    }}
                    onClick={gestorDeCompra}
                  >
                    Comprar
                  </button>
                </div>
                <div
                  className={`${style.modeBuy} ${style.boxs}`}
                  style={{
                    background: `linear-gradient(to bottom, #000, ${colors.secondary})`,
                  }}
                >
                  <h2 className={style.titleMode}>TIPO DE COMPRA</h2>
                  <label
                    htmlFor="circularCheckbox"
                    className={`${style.cardOfMode} ${style.wav}`}
                  >
                    <input
                      type="checkbox"
                      id="circularCheckbox"
                      className={style.checkboxCircular}
                      checked={isChecked1}
                      onChange={() =>
                        togglePrice(priceWav, isChecked1, setIsChecked1)
                      }
                    />
                    <span className={style.labelCircular}></span>
                    <div className={style.info}>
                      <h2>{musicInPlay.nombre}.wav</h2>
                      <p>
                        obtén un archivo de tu instrumental en formato .wav,
                        ideal para tu canción profesional
                      </p>
                    </div>
                    <div className={style.modePrice}>
                      <h2 ref={priceWav}>15$</h2>
                    </div>
                  </label>
                  <label
                    htmlFor="circularCheckbox2"
                    className={`${style.cardOfMode} ${style.wav}`}
                  >
                    <input
                      type="checkbox"
                      id="circularCheckbox2"
                      className={style.checkboxCircular}
                      checked={isChecked2}
                      onChange={() =>
                        togglePrice(priceStems2, isChecked2, setIsChecked2)
                      }
                    />
                    <span className={style.labelCircular}></span>
                    <div className={style.info}>
                      <h2>{musicInPlay.nombre}/stems</h2>
                      <p>
                        obtén tu instrumental separado pista por pista todo en
                        archivo wav (ideal para productores y/o artistas con
                        conocimiento en producción).
                      </p>
                    </div>
                    <div className={style.modePrice}>
                      <h2 ref={priceStems2}>15</h2>
                      <span>$</span>
                    </div>
                  </label>
                  {errCompra ? (
                    <p className={style.errCompra}>
                      Debes seleccionar un tipo de compra
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    className={style.buttonOfBuy}
                    style={{
                      background: `linear-gradient(to bottom, #000, ${colors.secondary})`,
                    }}
                    onClick={selectAll}
                  >
                    Seleccionar todo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Reproductor;

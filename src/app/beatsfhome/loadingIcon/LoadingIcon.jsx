import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import style from "./../beatsfhome.module.css"

const LoadingIcon = () => {
  return (
    <div
      style={{  fontSize:"24px", color: "#000" , display:"flex", justifyContent:"center", alignItems:"center"}}
    >
      <AiOutlineLoading className={style.rotateFoLoadingIcon}/>
    </div>
  );
};

export default LoadingIcon;

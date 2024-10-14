import React, { useEffect, useRef } from 'react';
import style from "./repro.module.css";

function getLuminance(color) {
  const rgb = color.match(/\d+/g);
  const r = parseInt(rgb[0], 10) / 255;
  const g = parseInt(rgb[1], 10) / 255;
  const b = parseInt(rgb[2], 10) / 255;

  const a = [r, g, b].map(v => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function isDark(color) {
  return getLuminance(color) < 0.5;
}

const ColorAdaptiveDiv = ({ children, bgColor }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    const adjustTextColorBasedOnBg = () => {
      const color = window.getComputedStyle(div).backgroundColor;
      if (isDark(color)) {
        div.style.color = 'white';
      } else {
        div.style.color = 'black';
      }
    };

    adjustTextColorBasedOnBg();

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'style') {
          adjustTextColorBasedOnBg();
        }
      });
    });

    observer.observe(div, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={divRef} style={{ backgroundColor: bgColor }} className={style.container}>
      {children}
    </div>
  );
};

export default ColorAdaptiveDiv;

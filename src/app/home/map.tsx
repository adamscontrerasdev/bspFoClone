interface MapComponentProps {
  bool: boolean;
}

const MapComponent = ({ bool }: MapComponentProps) =>
  bool ? (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.967322732083!2d-58.425728023502344!3d-34.630266058902066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbaca731d0b7%3A0xd6a78342f700b114!2sJos%C3%A9%20M%C3%A1rmol%201324%2C%20C1255ABH%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713890481497!5m2!1ses-419!2sar"
      width="600px"
      height="100%"
      style={{
        border: "none",
        borderRadius: "30px",
        outline: "none !important",
        boxShadow: "none !important",
        userSelect: "none",
        zIndex: "15",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  ) : (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.967322732083!2d-58.425728023502344!3d-34.630266058902066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbaca731d0b7%3A0xd6a78342f700b114!2sJos%C3%A9%20M%C3%A1rmol%201324%2C%20C1255ABH%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1713890481497!5m2!1ses-419!2sar"
      height="50%"
      width="100%"
      style={{
        border: "none",
        borderRadius: "30px",
        outline: "none !important",
        boxShadow: "none !important",
        userSelect: "none",
        zIndex: "15",
      }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );

export default MapComponent;

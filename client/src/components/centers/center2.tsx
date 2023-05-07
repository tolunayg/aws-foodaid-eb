import React from "react";

const MapEmbed: React.FC = () => {
  return (
    <div>
      <iframe
        style={{ border: 0, width: "100%", height: "270px" }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980721.896368497!2d36.014887011620424!3d37.28762163487584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1525f31774ce652b%3A0x9be32962060d1ed3!2sHatay!5e0!3m2!1str!2str!4v1683494282131!5m2!1str!2str"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapEmbed;

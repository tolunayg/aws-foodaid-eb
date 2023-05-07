import React from "react";
import { FaWheelchair, FaUtensils, FaLanguage } from "react-icons/fa";
 import './center4.css' 

const ServicesList = () => {
  const services = [
    {
      icon: <FaWheelchair />,
      name: "Accessibility for people with disabilities",
    },
    {
      icon: <FaUtensils />,
      name: "Food and supplies available",
    },
    {
      icon: <FaLanguage />,
      name: "Language accessibility",
    },
  ];

  return (
    <div>
      <h2>Services and Resources</h2>
      <ul>
        {services.map((service) => (
          <li key={service.name}>
            {service.icon}
            {service.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;

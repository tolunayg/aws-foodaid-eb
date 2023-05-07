import React from "react";
import './center3.css'

const DistributionCenters = () => {
  const centers = [
    {
      name: "Adana Food Center",
      address: "123 Main Street, Adana",
      phone: "(123) 456-7890",
      hours: "Monday-Friday: 9am-5pm",
    },
    {
      name: "Hatay Food Center",
      address: "456 Elm Street, Hatay",
      phone: "(123) 456-7890",
      hours: "Monday-Friday: 8am-4pm",
    },
    {
      name: "Maraş Food Center",
      address: "789 Oak Street, Maraş",
      phone: "(123) 456-7890",
      hours: "Monday-Friday: 9am-5pm",
    },
    {
      name: "Adıyaman Food Center",
      address: "789 Oak Street, Maraş",
      phone: "(123) 456-7890",
      hours: "Monday-Friday: 9am-5pm",
    },
    {
      name: "Gaziantep Food Center",
      address: "789 Oak Street, Maraş",
      phone: "(123) 456-7890",
      hours: "Monday-Friday: 9am-5pm",
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Hours of Operation</th>
        </tr>
      </thead>
      <tbody>
        {centers.map((center) => (
          <tr key={center.name}>
            <td>{center.name}</td>
            <td>{center.address}</td>
            <td>{center.phone}</td>
            <td>{center.hours}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DistributionCenters;

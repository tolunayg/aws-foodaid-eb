import React, { useState } from "react";
import './center5.css'

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [eligibility, setEligibility] = useState("yes");
  const [documentation, setDocumentation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit the form data to the server or perform any other necessary actions
    console.log("Form submitted:", {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      eligibility,
      documentation,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="tel"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="state">State:</label>
      <input
        type="text"
        id="state"
        value={state}
        onChange={(event) => setState(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="zipCode">Zip Code:</label>
      <input
        type="text"
        id="zipCode"
        value={zipCode}
        onChange={(event) => setZipCode(event.target.value)}
        required
      />
<br></br><br></br><br></br>
      <label htmlFor="eligibility">Are you eligible for food aid?</label>
      <select
        id="eligibility"
        value={eligibility}
        onChange={(event) => setEligibility(event.target.value)}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <br></br><br></br><br></br>
      <label htmlFor="documentation">Documentation:</label>
      <textarea
        id="documentation"
        value={documentation}
        onChange={(event) => setDocumentation(event.target.value)}
      ></textarea>
<br></br><br></br>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm
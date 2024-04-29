import React, { useState } from "react";
import "./Weather.css";
import { FaSearch } from "react-icons/fa";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();

  const API_KEY = "a790199dcc731c702e9b466591705be4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  function handleOnChange(event) {
    setCity(event.target.value);
    // console.log(event.target.value);
  }

  async function fetchData() {
    try {
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter any city name"
        />
        <button>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Weather;

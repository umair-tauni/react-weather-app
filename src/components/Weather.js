import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  // Access environment variables
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_URL = process.env.REACT_APP_API_URL;

  console.log("API Key:", API_KEY);
  console.log("API URL:", API_URL);

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  async function fetchData() {
    const url = `${API_URL}weather?q=${city}&units=metric&appid=${API_KEY}`;
    console.log("Request URL:", url);
    try {
      let res = await fetch(url);
      let data = await res.json();

      if (res.ok) {
        setWeather(data);
        setError("");
      } else {
        setError("No data found. Please enter a valid city name.");
      }
    } catch (error) {
      setError("An error occurred while fetching the data.");
      console.error("Fetch error:", error);
    }
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
        <button onClick={() => fetchData()}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather-icon"
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>
              {Math.round(weather.main.temp)}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name}, <span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>

            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

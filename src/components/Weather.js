import React, { useState } from "react";
import "./Weather.css";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const API_KEY = "a790199dcc731c702e9b466591705be4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  function handleOnChange(event) {
    setCity(event.target.value);
    // console.log(event.target.value);
  }

  async function fetchData() {
    try {
      let res = await fetch(url);
      let data = await res.json();

      if (res.ok) {
        setWeather(data);
        // console.log(data);
        setError("");
      } else {
        setError("No data found. Please enter a valid city name.");
      }
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
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
          </div>

          <p>
            {weather.name}, <span>{weather.sys.country}</span>
          </p>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
                <h3 className="wind-speed">
                  {weather.wind.speed}
                  <span>Km/h</span>
                </h3>
                <h3 className="wind-heading">Wind Speed</h3>
              </div>
            </div>

            <div className="humidity">
              <div className="humdity-icon">
                <WiHumidity />
                <h3 className="humidity-percent">
                  {weather.main.humidity}
                  <span>%</span>
                </h3>
                <h3 className="humidity-heading">Humidity</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

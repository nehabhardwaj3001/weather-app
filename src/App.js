import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(" ");
  const [weatherData, setWeatherData] = useState(null);

  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSearch();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() !== "") {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=89f551cc72931ac0642c29c0e0db8885`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error("Failed to fetch weather data.", error);
          toast.error(error?.response?.data?.message);
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <ToastContainer />
      <div className={`common data`}>
        <h2 className="header"> Weather App </h2>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            className="textfield"
            id="outlined-basic"
            label="city"
            variant="outlined"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ width: "80px", height: "50px", marginLeft: "20px" }}
            type="submit"
          >
            Search 
          </Button>
        </form>
        {weatherData?.name ? (
          <div className="data_wrap">
            <h1>{weatherData?.name}</h1>
            <h2>
              <span>Temperature:- </span>
              {(weatherData?.main?.temp - 273)?.toFixed(2)}°C
            </h2>
            <h2>
              <span>Humidity:- </span>
              {weatherData?.main.humidity} %
            </h2>
            <h2>
              <span>Wind Speed:- </span>
              {weatherData?.wind?.speed} meter/sec
            </h2>
            <h2>
              <span>Weather Condition:- </span>
              {weatherData?.weather[0].description}
            </h2>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
}

export default App;

import axios from "axios";
import { useEffect, useState } from "react";

const useWeatherAndDate = (lat, lon) => {
    const [weather, setWeather] = useState(null);
    const [dateTime, setDateTime] = useState("");
  
    // Update date and time every second
    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const options = {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
          // second: "numeric",
        };
        setDateTime(now.toLocaleString("en-US", options).replace(" at", ","));
      };
  
      const timer = setInterval(updateDateTime, 1000);
      updateDateTime(); // Call once immediately to set initial value
  
      return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);
  
    // Fetch weather data
    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const apiKey = "ECiTtj39HM1IFg9dqdxlRgxFyas2wtdg";
          const response = await axios.get(
            `https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=ECiTtj39HM1IFg9dqdxlRgxFyas2wtdg`
          );
  
          setWeather(response.data.data.timelines[0].intervals[0].values.temperature);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
  
      if (lat && lon) {
        fetchWeather();
      }
    }, [lat, lon]);
  
    return { weather, dateTime };
  };
  
  export default useWeatherAndDate;
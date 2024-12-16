import { useEffect, useState } from "react";
import axios from "axios";

const useWeatherAndDate = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("...");

  // Get the user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          setLocation("Location not available");
        }
      );
    }
  }, []);

  // Update date and time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const screenWidth = window.innerWidth;

      const options =
        screenWidth < 900 // Adjust the breakpoint as needed
          ? {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          : {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            };

      setDateTime(now.toLocaleString("en-US", options).replace(" at", ","));
    };

    const timer = setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    return () => clearInterval(timer); // Cleanup
  }, []);

  // Fetch weather data when latitude and longitude are available
  useEffect(() => {
    if (lat && lon) {
      const fetchWeather = async () => {
        try {
          const apiKey = import.meta.env.VITE_WEATHER_API;
          const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${apiKey}`;

          const response = await axios.get(url);
          const timelines = response.data?.timelines;

          if (!timelines) {
            console.error("No timelines found in the response.");
            return;
          }

          const hourlyData = timelines.hourly;
          if (hourlyData && hourlyData.length > 0) {
            const temperature = Math.round(hourlyData[0]?.values?.temperature); // Round to whole number
            setWeather(temperature);
          }

          // Fetch location info (city name) from reverse geocoding
          const cityUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
          const cityResponse = await axios.get(cityUrl);
          setLocation(cityResponse.data.locality || "Unknown location");
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

      fetchWeather();
    }
  }, [lat, lon]);

  return { weather, dateTime, location };
};

export default useWeatherAndDate;

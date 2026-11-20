const PLACE = "New York";
const LATITUDE = 40.71;
const LONGITUDE = -74.01;
const REFRESH_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 1000;

const placeEl = document.getElementById("place");
const tempEl = document.getElementById("temp");
const summaryEl = document.getElementById("summary");
const statusEl = document.getElementById("status");

const url =
  "https://api.open-meteo.com/v1/forecast" +
  `?latitude=${LATITUDE}&longitude=${LONGITUDE}` +
  "&current=temperature_2m,weather_code,wind_speed_10m" +
  "&temperature_unit=fahrenheit&wind_speed_unit=mph";

const describe = (code) => {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Fog";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable = (status) => status === 429 || status >= 500;

const fetchWithRetry = async (requestUrl) => {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(requestUrl);
      if (response.ok) return await response.json();
      if (!isRetryable(response.status)) throw new Error(`Request failed (${response.status})`);
      if (attempt === MAX_ATTEMPTS) throw new Error(`Server error (${response.status})`);
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      if (!isNetworkError || attempt === MAX_ATTEMPTS) throw error;
    }
    const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
    statusEl.textContent = `Retrying in ${delay / 1000}s (attempt ${attempt + 1} of ${MAX_ATTEMPTS})`;
    await wait(delay);
  }
};

const render = (data) => {
  const { temperature_2m, weather_code, wind_speed_10m } = data.current;
  tempEl.textContent = `${Math.round(temperature_2m)}°`;
  summaryEl.textContent = `${describe(weather_code)}, wind ${Math.round(wind_speed_10m)} mph`;
  statusEl.textContent = `Updated ${new Date().toLocaleTimeString([], { timeStyle: "short" })}`;
};

const update = async () => {
  try {
    render(await fetchWithRetry(url));
  } catch (error) {
    summaryEl.textContent = "Couldn't load the weather";
    statusEl.textContent = `${error.message}. Trying again in 10 minutes.`;
  }
};

placeEl.textContent = PLACE;
update();
setInterval(update, REFRESH_MS);

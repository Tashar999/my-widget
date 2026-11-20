const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const greetingEl = document.getElementById("greeting");

const getGreeting = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const update = () => {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString([], { timeStyle: "short" });
  dateEl.textContent = now.toLocaleDateString([], { dateStyle: "full" });
  greetingEl.textContent = getGreeting(now.getHours());
};

update();
setInterval(update, 1000);

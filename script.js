const randomBtn = document.getElementById("randomBtn");
let websites = [];

fetch("./relics.json")
  .then(response => response.json())
  .then(data => {
    websites = data;
  });

randomBtn.addEventListener("click", () => {
  if (websites.length === 0) {
    alert("Websites are still loading.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * websites.length);
  const randomWebsite = websites[randomIndex];

  window.open(randomWebsite.url, "_blank");
});
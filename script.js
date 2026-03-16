const randomBtn = document.getElementById("randomBtn")

const taglines = [

"The Internet’s Time Machine",

"Explore forgotten corners of the early web",

"Discover websites from the early days",

"The Internet’s Checkpoint",

"Relics of the Web",

"The Internet’s History Museum",

"Forgotten pages of the web",

"Discover abandoned internet websites",

"Feelin' old yet?",

"Powered by 90s HTML",

"Early 2000s web vibes",

"Where forgotten websites live on",

"Its legacy still lives on",

"Nostalgia vibes",

"Click if you dare",

"The internet’s hidden gems"

]

const taglineElement = document.getElementById("tagline")

const randomIndex = Math.floor(Math.random() * taglines.length)

taglineElement.textContent = taglines[randomIndex]


let websites = []
let queue = []
let history = []

function shuffleArray(array) {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

function refillQueue() {
  queue = shuffleArray(websites)

  if (
    history.length > 0 &&
    queue.length > 1 &&
    queue[0].url === history[history.length - 1].url
  ) {
    ;[queue[0], queue[1]] = [queue[1], queue[0]]
  }
}

fetch("./relics.json")
  .then(res => res.json())
  .then(data => {
    websites = data
    refillQueue()
  })
  .catch(error => {
    console.error("Failed to load relics.json:", error)
  })

randomBtn.addEventListener("click", () => {
  if (queue.length === 0) {
    refillQueue()
  }

  if (queue.length === 0) {
    alert("No websites available right now.")
    return
  }

  const website = queue.shift()
  history.push(website)

  if (history.length > 1000) {
    history.shift()
  }

  window.open(website.url, "_blank", "noopener,noreferrer")
})

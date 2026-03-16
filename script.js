const randomBtn = document.getElementById("randomBtn")

const taglines = [

"The Internet’s Time Machine",

"Preserving the Internet's Classics",

"A Trip down Memory Lane",

"Disclaimer: May Cause Intense Nostalgia",

"Explore Forgotten Corners of the Early Web",

"Discover Websites From the Early Days",

"The Internet’s Checkpoint",

"Relics of the Web",

"The Internet’s History Museum",

"Forgotten Pages of the Web",

"Discover Abandoned Internet Websites",

"Feelin’ Old Yet?",

"Powered by 90s HTML",

"Early 2000s Web Vibes",

"Where Forgotten Websites Live On",

"Its Legacy Still Lives On",

"Nostalgia Vibes",

"Click If You Dare",

"The Internet’s Hidden Gems"

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

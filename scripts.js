const text = document.querySelector("#text")
const input = document.querySelector("#input")
const restart = document.querySelector("#restart")
const result = document.querySelector("#result")
const history = document.querySelector("#history")
const changeThemeBtn = document.querySelector("#changeTheme")

wordsCount = 0

const texts = [
    "When in doubt, go to the library",
    "I solemnly swear that I am up to no good",
    "Hogwarts will always be there to welcome you home",
    "Don't let the muggles get you down",
    "It does not do to dwell on dreams and forget to live",
]

function newText() {
    const index = Math.floor(Math.random() * texts.length)
    textChosen = texts[index]
    wordsCount = textChosen.split(" ").length
    text.textContent = textChosen
}

function updateTest() {
    start()

    if (input.value === text.textContent) {
        verify()
    }
}

function start() {

    const testStatus = JSON.parse(localStorage.getItem("testInCourse")) // transforma uma string em um booleano

    if (!testStatus) {
        localStorage.setItem("startTime", new Date().getTime())
        localStorage.setItem("testInCourse", true)
    }
}

function verify() {
    const finalTime = new Date().getTime()
    const startTime = parseInt(localStorage.getItem("startTime"))
    const timeSpent = (finalTime - startTime) / 1000
    const WPM = Math.floor(wordsCount / (timeSpent / 60))

    result.textContent = `Awesome! You did ${WPM} words per minute!`

    addToHistory(text.textContent, WPM)

    localStorage.setItem("testInCourse", false)
    input.value = ""
    newText()
}

function addToHistory(typedText, WPM) {
    const itemHistory = document.createElement("p")

    itemHistory.textContent = `Text "${typedText}" - WPM: ${WPM}`

    history.appendChild(itemHistory)
}

function restartTest() {
    input.value = ""
    result.textContent = ""
    newText()
    localStorage.setItem("testInCourse", false)
    history.innerHTML = ""
}

function changeTheme() {
    const body = document.body

    body.classList.toggle("light")
    body.classList.toggle("dark")
}

input.addEventListener("keyup", updateTest)
restart.addEventListener("click", restartTest)
changeThemeBtn.addEventListener("click", changeTheme)

newText()
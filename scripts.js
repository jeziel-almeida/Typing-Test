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

    const testStatus = JSON.parse(localStorage.getItem("testInCourse")) //transforma uma string em um booleano

    if (!testStatus) {
        localStorage.setItem("startTime", new Date().getTime())
        localStorage.setItem("testInCourse", true)
    }
}

function verify() {
    const finalTime = new Date().getTime()
    const startTime = parseInt(localStorage.getItem("startTime"))
    const timeSpent = (finalTime - startTime) / 1000
    const wordsPerSecond = wordsCount / timeSpent

    result.textContent = `Awesome! You did it in ${timeSpent} seconds!`

    localStorage.setItem("testInCourse", false)
    input.value = ""
    newText()
}

input.addEventListener("keyup", updateTest)

newText()
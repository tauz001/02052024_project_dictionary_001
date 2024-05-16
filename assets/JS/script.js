let word

function fetchFun() {
  word = document.getElementById("bar").value
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then(data => {
      let allDefinitions = ""
      data.forEach(entry => {
        allDefinitions += `<strong>Word: </strong>${entry.word}<br><strong>Phonetic: </strong>${entry.phonetic}<br>`
        entry.meanings.forEach(meaning => {
          allDefinitions += `<strong>Part of Speech: </strong>${meaning.partOfSpeech}<br>`
          meaning.definitions.forEach(definition => {
            console.log("Definition:", definition.definition)
            allDefinitions += `<strong>Definition: </strong>${definition.definition}<br>`
          })
        })
      })
      document.getElementById("word").innerHTML = allDefinitions
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error)
    })

  document.getElementById("bar").value = null
}

document.addEventListener("keydown", function (event) {
  if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
    fetchFun()
  }
})

let randomWord

function fetchFunrandom() {
  fetch("https://random-word-api.herokuapp.com/word")
    .then(response => response.json())
    .then(data => {
      const randomWord = data[0] // Extract the first word from the response array
      console.log("Random Word:", randomWord)

      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`

      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          let allDefinitions = ""
          data.forEach(entry => {
            allDefinitions += `<strong>Word: </strong>${entry.word}<br><strong>Phonetic: </strong>${entry.phonetic}<br>`
            entry.meanings.forEach(meaning => {
              allDefinitions += `<strong>Part of Speech: </strong>${meaning.partOfSpeech}<br>`
              meaning.definitions.forEach(definition => {
                console.log("Definition:", definition.definition)
                allDefinitions += `<strong>Definition: </strong>${definition.definition}<br>`
              })
            })
          })
          document.getElementById("word").innerHTML = allDefinitions
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation:", error)
        })
    })
    .catch(error => {
      console.error("Error fetching random word:", error)
    })

  document.getElementById("bar").value = null
}

var button = document.getElementsByTagName("button")[1]
var originalColor = button.style.backgroundColor // Store the original color

button.addEventListener("click", function () {
  var targetColor = "#090618" // Change this to your desired specific color

  // Change the background color of the button
  button.style.backgroundColor = targetColor

  // After a delay (in this example, 1 second), revert back to the original color
  setTimeout(function () {
    button.style.backgroundColor = originalColor
  }, 200) // Adjust the duration as needed
})

function getQuestions() {
    let amountQuestions = document.getElementById("amountQuestion").value;
    const url = `https://opentdb.com/api.php?amount=${amountQuestions}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => printData(data))
}


function printData(data) {
    let container = document.getElementById('questions-container');
    let html = ``;
    data.results.forEach(element => {
        html += `<div class="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <p>${element.question}</p>
                                        ${getAnswer(element)}

                                    </div>
                                </div>
                            </div>`

    });
    container.innerHTML = html
}

function getAnswer(element) {
    let correctAnswer = element.correct_answer;
    let incorrectAnswer = element.incorrect_answers;
    let truefalseAnswer = element.type;
    let multChoice = element.type
    let html = ``
    let answers = [];
    answers = [...incorrectAnswer]
    answers.splice(Math.floor(Math.random() * correctAnswer.length + incorrectAnswer.length), 0, correctAnswer)

    if (multChoice == "multiple") {
        html = `
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[0]+1}" value="${answers[0]}">
    <label class="form-check-label" for="${answers[0]+1}">${answers[0]}</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[1]+1}" value="${answers[1]}">
    <label class="form-check-label" for="${answers[1]+1}">${answers[1]}</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[2]+1}" value="${answers[2]}">
    <label class="form-check-label" for="${answers[2]+1}">${answers[2]}</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[3]+1}" value="${answers[3]}">
    <label class="form-check-label" for="${answers[3]+1}">${answers[3]}</label>
  </div>`
    }

    if (truefalseAnswer == "boolean") {

        html = `
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[0]+1}" value="${answers[0]}">
    <label class="form-check-label" for="${answers[0]+1}">${answers[0]}</label>
  </div>
  
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="${answers[0]}" id="${answers[1]+1}" value="${answers[1]}">
    <label class="form-check-label" for="${answers[1]+1}">${answers[1]}</label>
  </div>
            `

    }
    return html

}


function getCaterogies() {
    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => printCategories(data.trivia_categories))
}

function printCategories(categories) {
    const categoryContainer = document.getElementById("category-container")
    categories.forEach((category) => {
        categoryContainer.innerHTML += `<option value="${category.id}" >${category.name}</option>`
    })

}


function getFullResponse() {
    let amountQuestions = document.getElementById("amountQuestion").value;
    let category = document.getElementById("category-container").value;
    let dificult = document.getElementById("dificult").value;
    let type = document.getElementById("type").value;

    fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&category=${category}&difficulty=${dificult}&type=${type}`)
        .then(response => response.json())
        .then(data => printData(data))

}

getCaterogies()
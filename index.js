function getQuestions() {
    let amountQuestions = document.getElementById("amountQuestion").value;
    const url = `https://opentdb.com/api.php?amount=${amountQuestions}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => printData(data))
}

let correctAnswer = [];
let SeletectedAnswer = [];
let count = 0;

function printData(data) {
    let container = document.getElementById('questions-container');
    let buttomContainer = document.getElementById("buttom-container")
    let html = ``;
    correctAnswer = [];
    data.results.forEach((element, index) => {
        let aux = element.correct_answer;
        correctAnswer.push(aux)
        html += `<div class="col-md-4">
                                <div class="card margin">
                                    <div class="card-body">
                                        <p>${element.question}</p>
                                        ${getAnswer(element,index)}
                                       
                                    </div>
                                </div>  
                            </div>`
    });
    botton = `<button type="button" onclick='getValidateAnswer()' class="btn btn-lg btn-primary bottom-style">Enviar Respuestas</button>`

    container.innerHTML = html
    buttomContainer.innerHTML = botton
}





function getAnswer(element, index) {
    let correctAnswer = element.correct_answer;
    let incorrectAnswer = element.incorrect_answers;
    let truefalseAnswer = element.type;
    let multChoice = element.type
    let html = ``
    let answers = [];
    answers = [...incorrectAnswer]
    answers.splice(Math.floor(Math.random() * (answers.length)), 0, correctAnswer)
    for (let i = 0; i < answers.length; i++) {
        if (multChoice == "multiple") {

            html += `
            <div class="form-check form-check-inline">
                <input required class="form-check-input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]}'>
                <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
            </div>`
        }


        if (truefalseAnswer == "boolean") {

            html += `
                <div class="form-check form-check-inline">
                     <input required class="form-check-input" type="radio" name='${answers[0]+index}' id='${answers[i]+index}' value='${answers[i]}' >
                    <label class="form-check-label" for='${answers[i]+index}'>${answers[i]}</label>
                </div>`
        }
    }

    return html

}



function validateInputsradio() {
    let flat = false;
    let radioButtons = document.querySelectorAll('input');
    let radio = radioButtons.getAttribute("required");

    if (radio) {
        flat = true
    }

    return flat
}




function getValidateAnswer() {

    SeletectedAnswer = []
    count = 0
    let validador = validateInputsradio()
    console.log(validador)
    let radioButtons = document.querySelectorAll('input');

    radioButtons.forEach((input) => {
        if (input.checked) {
            SeletectedAnswer.push(input.value)
        }
    })

    for (let i = 0; i < correctAnswer.length; i++) {
        if (SeletectedAnswer[i] == correctAnswer[i]) {
            count += 1
        }
    }

    if (validador) {
        modalScore(count, correctAnswer.length)
    } else {
        alert("Verifica que hallas seleccionado todas las respustas antes de enviarlas!!")
    }




    console.log(SeletectedAnswer)
    console.log(correctAnswer)


}

function questionNotExist() {
    let container = document.getElementById('questions-container');
    let html = ``
    html = `<div class="alert alert-danger margin" role="alert">No Existen Preguntas para esta categoria</div>`

    container.innerHTML = html
}

function fillInputs() {
    let container = document.getElementById('questions-container');
    let html = ``
    html = `<div class="alert alert-danger margin" role="alert">Asegurate de que allas completado todos los inputs correctamente</div>`
    container.innerHTML = html
}

function modalScore(score, amountQuestion) {
    let container = document.getElementById('questions-container');
    let html = ``
    html = `<div class="alert alert-success" role="alert">
    ${`Seleccionaste ` + score + ` respuestas correctas de ` + amountQuestion }
  </div>`

    container.innerHTML = html
}



function getCaterogies() {
    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => printCategories(data.trivia_categories))
}

function printCategories(categories) {
    const categoryContainer = document.getElementById("category-container")
    categories.forEach((category) => {
        categoryContainer.innerHTML += `<option value='${category.id}' >${category.name}</option>`
    })

}


function getFullResponse() {
    let amountQuestions = document.getElementById("amountQuestion").value;
    let category = document.getElementById("category-container").value;
    let dificult = document.getElementById("dificult").value;
    let type = document.getElementById("type").value;

    fetch(`https://opentdb.com/api.php?amount=${amountQuestions}&category=${category}&difficulty=${dificult}&type=${type}`)
        .then(response => response.json())
        .then(data => {
            if (data.response_code == 1) {
                questionNotExist()
            }
            if (data.response_code == 0) {
                printData(data)
            } else {
                fillInputs()
            }
        })



}

getCaterogies()
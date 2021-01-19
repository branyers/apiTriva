"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getQuestions() {
  var amountQuestions = document.getElementById("amountQuestion").value;
  var url = "https://opentdb.com/api.php?amount=".concat(amountQuestions);
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    return printData(data);
  });
}

var correctAnswer = [];
var SeletectedAnswer = [];
var count = 0;

function printData(data) {
  var container = document.getElementById('questions-container');
  var buttomContainer = document.getElementById("buttom-container");
  var html = "";
  correctAnswer = [];
  data.results.forEach(function (element, index) {
    var aux = element.correct_answer;
    correctAnswer.push(aux);
    html += "<div class=\"col-md-4\">\n                                <div class=\"card margin\">\n                                    <div class=\"card-body\">\n                                        <p>".concat(element.question, "</p>\n                                        ").concat(getAnswer(element, index), "\n                                       \n                                    </div>\n                                </div>  \n                            </div>");
  });
  botton = "<button type=\"button\" onclick='getValidateAnswer()' class=\"btn btn-lg btn-primary bottom-style\">Enviar Respuestas</button>";
  container.innerHTML = html;
  buttomContainer.innerHTML = botton;
}

function getAnswer(element, index) {
  var correctAnswer = element.correct_answer;
  var incorrectAnswer = element.incorrect_answers;
  var truefalseAnswer = element.type;
  var multChoice = element.type;
  var html = "";
  var answers = [];
  answers = _toConsumableArray(incorrectAnswer);
  answers.splice(Math.floor(Math.random() * answers.length), 0, correctAnswer);

  for (var i = 0; i < answers.length; i++) {
    if (multChoice == "multiple") {
      html += "\n            <div class=\"form-check form-check-inline\">\n                <input class=\"form-check-input\" type=\"radio\" name='".concat(answers[0] + index, "' id='").concat(answers[i] + index, "' value='").concat(answers[i], "'>\n                <label class=\"form-check-label\" for='").concat(answers[i] + index, "'>").concat(answers[i], "</label>\n            </div>");
    }

    if (truefalseAnswer == "boolean") {
      html += "\n                <div class=\"form-check form-check-inline\">\n                     <input class=\"form-check-input\" type=\"radio\" name='".concat(answers[0] + index, "' id='").concat(answers[i] + index, "' value='").concat(answers[i], "' >\n                    <label class=\"form-check-label\" for='").concat(answers[i] + index, "'>").concat(answers[i], "</label>\n                </div>");
    }
  }

  return html;
}

function validateInputsradio() {
  var flat = false;
  var radioButtons = document.querySelectorAll('input');
  var SeletectedAnswer = [];
  radioButtons.forEach(function (input) {
    if (input.checked) {
      SeletectedAnswer.push(input.value);
    }
  });

  if (SeletectedAnswer.length == correctAnswer.length) {
    flat = true;
  }

  return flat;
}

function getValidateAnswer() {
  SeletectedAnswer = [];
  count = 0;
  var validador = validateInputsradio();
  console.log(validador);
  var radioButtons = document.querySelectorAll('input');
  radioButtons.forEach(function (input) {
    if (input.checked) {
      SeletectedAnswer.push(input.value);
    }
  });

  for (var i = 0; i < correctAnswer.length; i++) {
    if (SeletectedAnswer[i] === correctAnswer[i]) {
      count += 1;
      console.log(count);
    }
  }

  if (validador) {
    modalScore(count, correctAnswer.length);
  } else {
    alert("Verifica que hallas seleccionado todas las respustas antes de enviarlas!!");
  }

  console.log(SeletectedAnswer);
  console.log(correctAnswer);
}

function questionNotExist() {
  var container = document.getElementById('questions-container');
  var html = "";
  html = "<div class=\"alert alert-danger margin\" role=\"alert\">No Existen Preguntas para esta categoria</div>";
  container.innerHTML = html;
}

function fillInputs() {
  var container = document.getElementById('questions-container');
  var html = "";
  html = "<div class=\"alert alert-danger margin\" role=\"alert\">Asegurate de que allas completado todos los inputs correctamente</div>";
  container.innerHTML = html;
}

function modalScore(score, amountQuestion) {
  var container = document.getElementById('questions-container');
  var html = "";
  html = "<div class=\"alert alert-success\" role=\"alert\">\n    ".concat("Seleccionaste " + score + " respuestas correctas de " + amountQuestion, "\n  </div>");
  container.innerHTML = html;
}

function getCaterogies() {
  fetch("https://opentdb.com/api_category.php").then(function (response) {
    return response.json();
  }).then(function (data) {
    return printCategories(data.trivia_categories);
  });
}

function printCategories(categories) {
  var categoryContainer = document.getElementById("category-container");
  categories.forEach(function (category) {
    categoryContainer.innerHTML += "<option value='".concat(category.id, "' >").concat(category.name, "</option>");
  });
}

function getFullResponse() {
  var amountQuestions = document.getElementById("amountQuestion").value;
  var category = document.getElementById("category-container").value;
  var dificult = document.getElementById("dificult").value;
  var type = document.getElementById("type").value;
  fetch("https://opentdb.com/api.php?amount=".concat(amountQuestions, "&category=").concat(category, "&difficulty=").concat(dificult, "&type=").concat(type)).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data.response_code == 1) {
      questionNotExist();
    }

    if (data.response_code == 0) {
      printData(data);
    } else {
      fillInputs();
    }
  });
}

getCaterogies();
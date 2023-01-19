const submitQuizName = document.getElementById("submitQuizName")
const quizNameField = document.getElementById("quizNameField")
const warningQuizName = document.getElementById("warningQuizName")
const quizNameInput = document.getElementById("quizNameInput")
const menuOfQuestions = document.getElementById("menuOfQuestions")
const one = document.getElementById("sel1")
const two = document.getElementById("sel2")
const three = document.getElementById("sel3")
const four = document.getElementById("sel4")
const five = document.getElementById("sel5")
const oneDiv = document.getElementById("1Div")
const twoDiv = document.getElementById("2Div")
const threeDiv = document.getElementById("3Div")
const fourDiv = document.getElementById("4Div")
const fiveDiv = document.getElementById("5Div")
const quizButtonSubmit = document.getElementById("quizButtonSubmit")


let questions = []
let quizName = ""
let oneType, twoType, threeType, fourType, fiveType = "ABCD"

submitQuizName.addEventListener('click', () => {
    if (quizNameField.value === "") {
        warningQuizName.innerHTML = "Name cannot be null"
    } else {
        quizName = quizNameField.value
        quizNameInput.classList.add('hide')
        menuOfQuestions.classList.remove('hide')
        quizButtonSubmit.classList.remove('hide')
    }
})


one.addEventListener("change", () => {
    oneType = one.value
    console.log(oneType)
    addQuestion(oneType, "1Div")
})
two.addEventListener("change", () => {
    twoType = two.value
    console.log(twoType)
    addQuestion(twoType, "2Div")
})
three.addEventListener("change", () => {
    threeType = three.value
    console.log(threeType)
    addQuestion(threeType, "3Div")
})
four.addEventListener("change", () => {
    fourType = four.value
    console.log(fourType)
    addQuestion(fourType, "4Div")
})
five.addEventListener("change", () => {
    fiveType = five.value
    console.log(fiveType)
    addQuestion(fiveType, "5Div")
})

function addQuestion(questionType, divNumber) {
    const div = document.getElementById(divNumber)
    while (div.firstChild) {
        div.removeChild(div.lastChild)
    }
    const type = document.getElementById(questionType);
    const clonedChild = type.cloneNode(true)
    console.log(clonedChild)
    div.appendChild(clonedChild)
    questions.push(clonedChild)
    console.log(questions)
}

quizButtonSubmit.addEventListener("click", () => submit())

function submit() {
    const quizResult = {}
    quizResult.quizName = quizName
    quizResult.questions = []

    for (let i = 1; i < 6; i++) {
        let questionObj = {}
        questionObj.questionType = "a";
        console.log("GDZIE JEST KURWA QUESTION TYPE" + questionObj.questionType)
        questionObj.question = "";
        questionObj.answers = [];

        const divID = i.toString()
        const divNumber = document.getElementById(divID);
        console.log(divNumber);
        ([...divNumber.childNodes]).forEach((questionData, index) => {
            document.getElementById(questionData).childNodes
            console.log("Wchodzę se tu o")
            let questionType;
            if (index === 1) {
                questionType = questionData.value;
                questionObj.questionType = questionData.value
            }
            if (index === 2) {
                ([...questionData.childNodes]).forEach((questionDataInner, indexInner) => {
                    switch (questionType) {
                        case "ABCD":
                            if (indexInner === 1) {
                                questionObj.question = questionDataInner.value
                            } else if (indexInner === 3) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = true
                                questionObj.answers.push(innerQuestion)
                            } else if (indexInner === 5 || indexInner === 7 || indexInner === 9) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = false
                                questionObj.answers.push(innerQuestion)
                            }
                            break;
                        case "TF":
                            if (indexInner === 1) {
                                questionObj.question = questionDataInner.value
                            } else if (indexInner === 3) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = true
                                questionObj.answers.push(innerQuestion)
                            } else if (indexInner === 5) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = false
                                questionObj.answers.push(innerQuestion)
                            }
                            break;
                        case "List":
                            if (indexInner === 1) {
                                questionObj.question = questionDataInner.value
                            } else if (indexInner === 3) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = true
                                questionObj.answers.push(innerQuestion)
                            } else if (indexInner === 5 || indexInner === 7 || indexInner === 9) {
                                let innerQuestion = {}
                                innerQuestion.text = questionDataInner.value
                                innerQuestion.correct = false
                                questionObj.answers.push(innerQuestion)
                            }
                            break;
                    }
                })
            }
        })
        quizResult.questions.push(questionObj)
    }
    const quizes = JSON.parse(localStorage.getItem("quizes"))
    if (!quizes) {
        localStorage.setItem("quizes", JSON.stringify(
            [quizResult]));
    } else {
        quizes.push(quizResult)
        localStorage.setItem("quizes", JSON.stringify(quizes))
    }
}




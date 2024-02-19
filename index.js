const questions =[
    {
        question: 'What is the capital of India?',
        answers: [
            {text:'Noida', correct: false},
            {text:'New Delhi', correct: true},
            {text:'Delhi', correct: false},
            {text:'Mumbai', correct: false},
        ]
    },
    {
        question:'Who is the Prime Minister of India?',
        answers: [
            {text:'Shri Narendra Modi', correct: true},
            {text:'Srimati Sonia Ghandi', correct: false},
            {text:'Shre Amit Shah', correct: false},
            {text:'Dr. Manmohan singh', correct: false},
        ]
    },
    {
        question:'Who is the captain of Indian women circket team captain?',
        answers: [
            {text:'Smriti Mandhana', correct: false},
            {text:'Mitali Raj', correct: false},
            {text:'Jemimah Rodrigues', correct: false},
            {text:'Harmanpreet Kaur', correct: true},
        ]
    },
    {
        question:'HOw many states in India?',
        answers: [
            {text:'27', correct: false},
            {text:'30', correct: false},
            {text:'28', correct: true},
            {text:'29', correct: false},
        ]
    },
    {
        question:'Who is the captain of Indian men circket team captain?',
        answers: [
            {text:'Virat kohli', correct: false},
            {text:'Rohit Sharma', correct: true},
            {text:'K.L. Rahul', correct: false},
            {text:'M.S. Dhoni', correct: false},
        ]
    }
    
]
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=> {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        statQuiz();
    }
})

startQuiz();

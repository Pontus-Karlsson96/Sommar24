function renderStructure(parent) {
    const wrapper = document.getElementById(parent);
    renderHeader(wrapper);
    renderQuiz(wrapper);
}

function renderHeader(parent) {

    const header = document.createElement('header');
    header.id = 'header';
    parent.innerHTML = "";

    const scoreCounter = document.createElement('p');
    scoreCounter.id = "scoreCounter";
    scoreCounter.innerText = `Score: ${score}/10`;

    const title = document.createElement('h1');
    title.id = 'title';
    title.innerText = 'Quiz';

    const restartButton = document.createElement('button');
    restartButton.id = 'restartButton';
    restartButton.innerText = 'restart';
    restartButton.addEventListener("click", stateHandler.update);

    parent.appendChild(header);
    header.appendChild(scoreCounter);
    header.appendChild(title);
    header.appendChild(restartButton);
}

function renderQuiz(parent) {
    const container = document.createElement('div');
    container.id = 'container';
    container.innerText = `Question number: ${numQuestion + 1} ${_state[numQuestion].category}. Difficulty: ${_state[numQuestion].difficulty} `;
    const currentPage = numQuestion;
    parent.appendChild(container);
    const questionContainer = document.createElement('div');

    questionContainer.id = 'questionItem';
    questionContainer.innerText = _state[currentPage].question;

    const answerContainer = document.createElement('div');
    answerContainer.id = 'answerContainer';
    questionContainer.appendChild(answerContainer);

    const answers = [];
    answers.push(_state[currentPage].correct_answer)
    for (item of _state[currentPage].incorrect_answers) {
        answers.push(item);
    }
    console.log(answers);

    let newAnswers = answers.slice();

    for (let i = newAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newAnswers[i], newAnswers[j]] = [newAnswers[j], newAnswers[i]];
    }
    console.log(newAnswers);

    for (let item of newAnswers) {
        const quizItem = document.createElement('div');
        quizItem.classList = 'quizItem';
        quizItem.textContent = item;


        answerContainer.appendChild(quizItem);

        quizItem.addEventListener("click", function clickFunction(event) {
            event.preventDefault();
            const quizItem = event.currentTarget;


            if (event.target.textContent !== _state[currentPage].correct_answer) {
                quizItem.classList.toggle('wrong');
                quizItemClicked('wrong');
                answeredQuestions.push(
                    {
                        question: _state[currentPage].question,
                        correct_answer: _state[currentPage].correct_answer,
                        user_answer: event.currentTarget.textContent
                    })
                numQuestion++;
            }
            else {
                quizItem.classList.toggle('right');
                quizItemClicked('right');
                answeredQuestions.push(
                    {
                        question: _state[currentPage].question,
                        correct_answer: _state[currentPage].correct_answer,
                        user_answer: event.currentTarget.textContent
                    })
                numQuestion++;
                score++;
            }
        })
    }
    container.appendChild(questionContainer);
};

function quizItemClicked(answer) {
    const wrapper = document.getElementById('wrapper');
    const popUp = document.createElement('div');

    switch (answer) {
        case 'wrong': popUp.id = 'popUpWrong';
            popUp.innerHTML = `<h1>Wrong</h1><br><p>Current score: ${score}/10</p>`;
            break;
        case 'right': popUp.id = 'popUpRight';
            popUp.innerHTML = `<h1>CORRECT</h1><br><p>Current score: ${score + 1}/10</p>`;
            break;
    }

    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT';
    nextButton.id = 'nextButton';

    wrapper.appendChild(popUp);
    popUp.appendChild(nextButton);

    nextButton.addEventListener("click", function (event) {
        event.preventDefault;
        popUp.remove();
        if (answeredQuestions.length < 10) {
            renderHeader(wrapper);
            renderQuiz(wrapper);
        } else {
            gameFinished(wrapper);
        }
    });
}

function gameFinished(parent) {
    const displayFinished = document.createElement('div');
    displayFinished.id = 'displayFinished';
    displayFinished.innerText = 'FINISHED';

    const scoreFinished = document.createElement('div');
    scoreFinished.innerHTML = `Score: ${score}/10`;
    displayFinished.appendChild(scoreFinished);

    const answersTable = document.createElement('ul');
    answersTable.id = 'answersTable';
    scoreFinished.appendChild(answersTable);

    for (let i = 0; i < answeredQuestions.length; i++) {
        const item = document.createElement('li');
        item.textContent = `${answeredQuestions[i].question} Your answer: ${answeredQuestions.user_answer} Correct answer: ${answeredQuestions.correct_answer}
        `;
        item.classList = 'answerTableItem';
        answersTable.appendChild(item);
    }


    const restartButton = document.createElement('button');
    restartButton.id = 'restartButtonFinished';
    restartButton.innerText = 'Restart';
    parent.appendChild(displayFinished);
    displayFinished.appendChild(restartButton);
    restartButton.addEventListener("click", stateHandler.update)
}



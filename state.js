let _state = {};
let numQuestion = 0;
let score = 0;
let answeredQuestions = [];

const stateHandler = {
    start: function runApp() {
        const url = "https://opentdb.com/api.php?amount=10";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.response_code !== 0) {
                    console.warn("Object received faulty");
                    runApp();
                } else if (!Array.isArray(data.results)) {
                    console.warn("Results is not an array");
                    runApp();
                } else {
                    let isValid = data.results.every(item => {
                        return typeof item.category === 'string' &&
                            typeof item.type === 'string' &&
                            typeof item.difficulty === 'string' &&
                            typeof item.question === 'string' &&
                            typeof item.correct_answer === 'string' &&
                            Array.isArray(item.incorrect_answers) &&
                            item.incorrect_answers.every(ans => typeof ans === 'string');
                    });

                    if (!isValid) {
                        console.warn("One or more items in results are invalid");
                        runApp();
                    } else {
                        _state = data.results.map(item => {
                            return {
                                ...item,
                                category: decodeHTMLEntities(item.category),
                                type: decodeHTMLEntities(item.type),
                                difficulty: decodeHTMLEntities(item.difficulty),
                                question: decodeHTMLEntities(item.question),
                                correct_answer: decodeHTMLEntities(item.correct_answer),
                                incorrect_answers: item.incorrect_answers.map(ans => decodeHTMLEntities(ans))
                            };
                        });
                        console.log(_state);
                        renderStructure('wrapper');
                    }
                }
            })
            .catch(error => {
                console.error('Fetch error: ', error);
            });
    },

    update: function refreshApp() {
        numQuestion = 0;
        score = 0;
        answeredQuestions = [];
        console.log("update");
        const url = "https://opentdb.com/api.php?amount=10";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.response_code !== 0) {
                    console.warn("Object received faulty");
                    refreshApp();
                } else if (!Array.isArray(data.results)) {
                    console.warn("Results is not an array");
                    refreshApp();
                } else {
                    let isValid = data.results.every(item => {
                        return typeof item.category === 'string' &&
                            typeof item.type === 'string' &&
                            typeof item.difficulty === 'string' &&
                            typeof item.question === 'string' &&
                            typeof item.correct_answer === 'string' &&
                            Array.isArray(item.incorrect_answers) &&
                            item.incorrect_answers.every(ans => typeof ans === 'string');
                    });

                    if (!isValid) {
                        console.warn("One or more items in results are invalid");
                        refreshApp();
                    } else {
                        _state = data.results.map(item => {
                            return {
                                ...item,
                                category: decodeHTMLEntities(item.category),
                                type: decodeHTMLEntities(item.type),
                                difficulty: decodeHTMLEntities(item.difficulty),
                                question: decodeHTMLEntities(item.question),
                                correct_answer: decodeHTMLEntities(item.correct_answer),
                                incorrect_answers: item.incorrect_answers.map(ans => decodeHTMLEntities(ans))
                            };
                        });
                        console.log(_state);
                        renderStructure('wrapper');
                    }
                }
            })
            .catch(error => {
                console.error('Fetch error: ', error);
            });
    }
};

function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

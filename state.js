let _state = {

};
let numQuestion = 0;
let score = 0;

const stateHandler = {

    start: function runApp() {

        const url = "https://opentdb.com/api.php?amount=10";
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data.response_code);
                _state = data.results;
                console.log(_state);
                renderStructure('wrapper');
            })
    },

    update: function refreshApp() {
        numQuestion = 0;
        console.log("update");
        const url = "https://opentdb.com/api.php?amount=10";
        fetch(url)
            .then(response => { return response.json() })
            .then(data => {
                console.log(data.response_code);
                let _state = data;
                console.log(_state);
            })
    }
};

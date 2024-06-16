
const fetchHandler = {

    start: function startApp() {
        const apiKey = '9d64eb8fc67143c9925994ff4b5aa5c1'
        const lat = 37.848200815794605;
        const lon = 20.64653087024984;


        const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;

        fetch(url)
            .then(r => {
                return r.json();
            })
            .then(data => {
                let _state = data.data[0];
                console.log(_state);

                const wrapper = document.getElementById('wrapper');
                wrapper.innerHTML = ` <div class="video-background">
                <video autoplay loop muted>
                  <source src="./videos/video1.mp4" type="video/mp4">
                </video>
              </div>`
                const header = document.createElement('header');
                header.id = 'header';
                header.innerHTML = `<h1>Zakynthos</h1> <p id='dateTime'>${_state.ob_time} <br> ${_state.timezone}`
                wrapper.appendChild(header);

                const main = document.createElement('main');
                main.id = 'main';
                main.innerHTML = `
                <div id='today'>
                    <h2>IDAG</h2>
                    <div id='info'>
                        ${_state.app_temp} <br>
                        ${_state.weather.description} <br>
                        Luftfuktighet: ${_state.rh} <br>
                        Molnighet: ${_state.clouds} <br>
                        Vind: ${_state.wind_cdir_full} ${_state.wind_spd} <br>
                        Risk of rain: ${_state.precip}
                    </div>
                </div>
            `;
                wrapper.appendChild(main);

            })

    }
}
fetchHandler.start();
const container = document.querySelector('.container');

const resultado = document.querySelector('#resultado');

const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima);

})

function buscarClima(e) {

    e.preventDefault();

    //  validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === "" || pais === "") {

        mostrarError('Ambos campos son obligatorios');
        return;

    }

    // Limpiar pantalla
    limpiarHTML();

    // CargarSpinner
    spinner();

    // Consoltamos la API
    consultaAPI(ciudad, pais);

}


function mostrarError(mensaje) {

    // Valirar si ya hay un mensaje de alerta en mantalla
    const bandera = document.querySelector('.bandera');

    if (bandera === null) {
        // Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-nd', 'mx-auto', 'mt-6', 'text-center', 'bandera');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
            `
        container.appendChild(alerta);

        setTimeout(() => alerta.remove(), 3000)

    };

}

// API key openwheather
const appId = 'ea5dfe3dd7bf4f3e1e1a3eac88704882';

function consultaAPI(ciudad, pais) {

    const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&appid=${appId}`
    console.log(urlGeo);
    fetch(urlGeo)
        .then(respuesta => respuesta.json())
        .then(resultado => {




            if (resultado.length === 0) {

                mostrarError('Ciudad no encontrada');

            } else {


                consultaAPI2(resultado[0].lat, resultado[0].lon)

            }

        })

}

function consultaAPI2(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`



    fetch(url)
        .then(resultado => resultado.json())
        .then(resultado => mostrarClima(resultado))

}

function mostrarClima(datos) {



    console.log(datos)

    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centrigrados = kelvinACentigrados(temp);

    const maxima = kelvinACentigrados(temp_max);

    const minima = kelvinACentigrados(temp_min);

    const city = document.createElement('p');
    city.textContent = `Clima en ${name}`;
    city.classList.add('fond-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centrigrados} &#8451;`
    actual.classList.add('fond-bold', 'text-6xl');

    const temperaturaMaxima = document.createElement('p');
    temperaturaMaxima.innerHTML = `Maxima ${maxima} &#8451;`;
    temperaturaMaxima.classList.add('text-xl');

    const temperaturaMinima = document.createElement('p');
    temperaturaMinima.innerHTML = `Minima ${minima} &#8451;`;
    temperaturaMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(city);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temperaturaMaxima);
    resultadoDiv.appendChild(temperaturaMinima);

    limpiarHTML();

    resultado.appendChild(resultadoDiv);

}

function kelvinACentigrados(temp) {
    console.log(temp)

    return (temp - 273.15).toFixed(1);
}


function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


function spinner() {
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    `
    resultado.appendChild(divSpinner);

    console.log('hola.spiner')
}
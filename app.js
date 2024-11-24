//Atributos poke rival
const imgRival = document.querySelector('#pokeRival');
const nombreRival = document.querySelector('#nombreRival');
const tipo1Rival = document.querySelector('#tipo1Rival');
const tipo2Rival = document.querySelector('#tipo2Rival');
const atkFisRival = document.querySelector('#ataqueFisRival'); 
const atkEspRival = document.querySelector('#ataqueEspRival');
const vidaRival = document.querySelector('#vidaRival');
const defensaEspRival = document.querySelector('#defensaEspRival');
const defensaFisRival = document.querySelector('#defensaFisRival');
const velocidadRival = document.querySelector('#velocidadRival');

//Atributos poke propio
const imgPropio = document.querySelector('#pokePropio');
const nombrePropio = document.querySelector('#nombrePropio');
const tipo1Propio = document.querySelector('#tipo1Propio');
const tipo2Propio = document.querySelector('#tipo2Propio');
const atkFisPropio = document.querySelector('#ataquePropio'); 
const atkEspPropio = document.querySelector('#ataqueEspPropio');
const vidaPropio = document.querySelector('#vidaPropio');
const defensaEspPropio = document.querySelector('#defensaEspPropio');
const defensaFisPropio = document.querySelector('#defensaFisPropio');
const velocidadPropio = document.querySelector('#velocidadPropio');

//Interfaz de usuario

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = ()=>{
    const num = input.value;

    console.log(num)

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{
        console.log(res.data)
        return res.data
    }).then((res)=>{
        imgPropio.src = res.sprites.back_default;
        nombrePropio.innerHTML = res.name;
        tipo1Propio.innerHTML = res.types[0].type.name;
        try{
            tipo2Propio.innerHTML = res.types[1].type.name;
            if(tipo2Propio.innerHTML === undefined){
                throw Error
            }
        }catch(Error){
            tipo2Propio.innerHTML = ""
        }
        vidaPropio.innerHTML = res.stats[0].base_stat;
        atkFisPropio.innerHTML = res.stats[1].base_stat;
        defensaFisPropio.innerHTML = res.stats[2].base_stat;
        atkEspPropio.innerHTML = res.stats[3].base_stat;
        defensaEspPropio.innerHTML = res.stats[4].base_stat;
        velocidadPropio.innerHTML = res.stats[5].base_stat;
    })
}
//Se generará un pokemon rival aleatorio 
const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res.data);
        return res.data
    }).then((res)=>{
        
        imgRival.src = res.sprites.front_default;
        nombreRival.innerHTML = res.name;
        tipo1Rival.innerHTML = res.types[0].type.name;
        try{
            tipo2Rival.innerHTML = res.types[1].type.name;
            if(tipo2Rival.innerHTML === undefined){
                throw Error
            }
        }catch(Error){
            tipo2Rival.innerHTML = ""
        }
        vidaRival.innerHTML = res.stats[0].base_stat;
        atkFisRival.innerHTML = res.stats[1].base_stat;
        defensaFisRival.innerHTML = res.stats[2].base_stat;
        atkEspRival.innerHTML = res.stats[3].base_stat;
        defensaEspRival.innerHTML = res.stats[4].base_stat;
        velocidadRival.innerHTML = res.stats[5].base_stat;

    })
}
//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador
// Combate, el pokemon perdedor será el que se le acabe primero su vida.
// El pokemon que tenga más velocidad va a pegar primero
// Variables de combate y referencias
let turno = 'propio';  // Empieza el turno del jugador (propio)
let combateActivo = true;  // Indica si el combate está activo

// Función para calcular el daño
const calcularDaño = (ataque, defensa) => {
    let daño = ataque - defensa;
    return daño > 0 ? daño : 1;  // Si el daño es negativo o cero, devolver 1
};

const combate = () => {
    if (!combateActivo) return;  // Si el combate no está activo, no hacer nada

    console.log("Turno de combate:", turno);

    // Obtener los valores de vida, ataque, defensa y velocidad de ambos Pokémon
    const vidaPropioValor = parseInt(vidaPropio.innerHTML);
    const vidaRivalValor = parseInt(vidaRival.innerHTML);

    const atkFisPropioValor = parseInt(atkFisPropio.innerHTML);
    const atkEspPropioValor = parseInt(atkEspPropio.innerHTML);

    const defensaFisRivalValor = parseInt(defensaFisRival.innerHTML);
    const defensaEspRivalValor = parseInt(defensaEspRival.innerHTML);

    const atkFisRivalValor = parseInt(atkFisRival.innerHTML);
    const atkEspRivalValor = parseInt(atkEspRival.innerHTML);

    const defensaFisPropioValor = parseInt(defensaFisPropio.innerHTML);
    const defensaEspPropioValor = parseInt(defensaEspPropio.innerHTML);

    const velocidadPropioValor = parseInt(velocidadPropio.innerHTML);
    const velocidadRivalValor = parseInt(velocidadRival.innerHTML);

    // Determinar qué tipo de ataque usar según el botón seleccionado
    let tipoAtaque = '';
    if (btnAtkFis.classList.contains('active')) {
        tipoAtaque = 'fisico';
    } else if (btnAtkEsp.classList.contains('active')) {
        tipoAtaque = 'especial';
    }

    // Función para realizar un turno de ataque
    const realizarTurno = (atacante, defensor, tipoAtaque) => {
        let daño;
        let vidaRestanteDefensor;

        if (atacante === 'propio') {
            if (tipoAtaque === 'fisico') {
                daño = calcularDaño(atkFisPropioValor, defensor === 'rival' ? defensaFisRivalValor : defensaFisPropioValor);
                vidaRestanteDefensor = defensor === 'rival' ? vidaRivalValor - daño : vidaPropioValor - daño;
                console.log(`El Pokémon propio atacó con ataque físico causando ${daño} de daño. Vida restante ${defensor}: ${vidaRestanteDefensor}`);
            } else if (tipoAtaque === 'especial') {
                daño = calcularDaño(atkEspPropioValor, defensor === 'rival' ? defensaEspRivalValor : defensaEspPropioValor);
                vidaRestanteDefensor = defensor === 'rival' ? vidaRivalValor - daño : vidaPropioValor - daño;
                console.log(`El Pokémon propio atacó con ataque especial causando ${daño} de daño. Vida restante ${defensor}: ${vidaRestanteDefensor}`);
            }
        } else if (atacante === 'rival') {
            if (tipoAtaque === 'fisico') {
                daño = calcularDaño(atkFisRivalValor, defensor === 'propio' ? defensaFisPropioValor : defensaFisRivalValor);
                vidaRestanteDefensor = defensor === 'propio' ? vidaPropioValor - daño : vidaRivalValor - daño;
                console.log(`El Pokémon rival atacó con ataque físico causando ${daño} de daño. Vida restante ${defensor}: ${vidaRestanteDefensor}`);
            } else if (tipoAtaque === 'especial') {
                daño = calcularDaño(atkEspRivalValor, defensor === 'propio' ? defensaEspPropioValor : defensaEspRivalValor);
                vidaRestanteDefensor = defensor === 'propio' ? vidaPropioValor - daño : vidaRivalValor - daño;
                console.log(`El Pokémon rival atacó con ataque especial causando ${daño} de daño. Vida restante ${defensor}: ${vidaRestanteDefensor}`);
            }
        }

        // Actualizar las vidas de los Pokémon
        if (defensor === 'propio') {
            vidaPropio.innerHTML = vidaRestanteDefensor;
        } else if (defensor === 'rival') {
            vidaRival.innerHTML = vidaRestanteDefensor;
        }

        // Verificar si alguno de los Pokémon ha sido derrotado
        if (vidaRestanteDefensor <= 0) {
            combateActivo = false;
            alert(`${defensor === 'propio' ? 'El Pokémon propio' : 'El Pokémon rival'} ha sido derrotado. ¡${defensor === 'propio' ? 'El rival' : 'El jugador'} gana!`);
        }
    };

    // Determinar quién ataca primero según la velocidad
    if (velocidadPropioValor >= velocidadRivalValor) {
        // El Pokémon propio ataca primero
        realizarTurno('propio', 'rival', tipoAtaque);
        if (combateActivo) {
            setTimeout(() => realizarTurno('rival', 'propio', tipoAtaque), 1000);  // El rival responde después de 1 segundo
        }
    } else {
        // El rival ataca primero
        realizarTurno('rival', 'propio', tipoAtaque);
        if (combateActivo) {
            setTimeout(() => realizarTurno('propio', 'rival', tipoAtaque), 1000);  // El jugador responde después de 1 segundo
        }
    }
};

// Agregar evento a los botones de ataques
btnAtkFis.addEventListener('click', () => {
    if (combateActivo) {
        btnAtkFis.classList.add('active');
        btnAtkEsp.classList.remove('active');
        combate();
    }
});

btnAtkEsp.addEventListener('click', () => {
    if (combateActivo) {
        btnAtkEsp.classList.add('active');
        btnAtkFis.classList.remove('active');
        combate();
    }
});


window.addEventListener('load', obtenerPokeRival);

btnElegir.addEventListener('click', obtenerPokePropio);

btnAtkFis.addEventListener('click', combate);
btnAtkEsp.addEventListener('click', combate);

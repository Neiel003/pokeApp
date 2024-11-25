// Atributos del Pokémon rival
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


const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis = document.querySelector('#btn-atk-fis');
const btnAtkEsp = document.querySelector('#btn-atk-esp');


const getNumRandom = () => Math.floor(Math.random() * 1001);


const efectividad = {
    "Normal": { "Roca": 0.5, "Fantasma": 0, "Acero": 0.5 },
    "Fuego": { "Planta": 2, "Hielo": 2, "Bicho": 2, "Acero": 2, "Fuego": 0.5, "Agua": 0.5, "Roca": 0.5, "Dragón": 0.5 },
    "Agua": { "Fuego": 2, "Tierra": 2, "Roca": 2, "Agua": 0.5, "Planta": 0.5, "Dragón": 0.5 },
    "Planta": { "Agua": 2, "Tierra": 2, "Roca": 2, "Fuego": 0.5, "Planta": 0.5, "Veneno": 0.5, "Volador": 0.5, "Bicho": 0.5, "Dragón": 0.5, "Acero": 0.5 },
    "Eléctrico": { "Agua": 2, "Volador": 2, "Tierra": 0, "Eléctrico": 0.5, "Planta": 0.5, "Dragón": 0.5 },
    "Hielo": { "Planta": 2, "Tierra": 2, "Volador": 2, "Dragón": 2, "Fuego": 0.5, "Agua": 0.5, "Hielo": 0.5, "Acero": 0.5 },
    "Lucha": { "Normal": 2, "Hielo": 2, "Roca": 2, "Siniestro": 2, "Acero": 2, "Veneno": 0.5, "Volador": 0.5, "Psíquico": 0.5, "Bicho": 0.5, "Hada": 0.5, "Fantasma": 0 },
    "Veneno": { "Planta": 2, "Hada": 2, "Veneno": 0.5, "Tierra": 0.5, "Roca": 0.5, "Fantasma": 0.5, "Acero": 0 },
    "Tierra": { "Fuego": 2, "Eléctrico": 2, "Veneno": 2, "Roca": 2, "Acero": 2, "Planta": 0.5, "Bicho": 0.5, "Volador": 0 },
    "Volador": { "Planta": 2, "Lucha": 2, "Bicho": 2, "Eléctrico": 0.5, "Roca": 0.5, "Acero": 0.5 },
    "Psíquico": { "Lucha": 2, "Veneno": 2, "Psíquico": 0.5, "Acero": 0.5, "Siniestro": 0 },
    "Bicho": { "Planta": 2, "Psíquico": 2, "Siniestro": 2, "Fuego": 0.5, "Lucha": 0.5, "Veneno": 0.5, "Volador": 0.5, "Fantasma": 0.5, "Acero": 0.5, "Hada": 0.5 },
    "Roca": { "Fuego": 2, "Hielo": 2, "Volador": 2, "Bicho": 2, "Lucha": 0.5, "Tierra": 0.5, "Acero": 0.5 },
    "Fantasma": { "Psíquico": 2, "Fantasma": 2, "Normal": 0, "Siniestro": 0.5 },
    "Dragón": { "Dragón": 2, "Acero": 0.5, "Hada": 0 },
    "Siniestro": { "Psíquico": 2, "Fantasma": 2, "Lucha": 0.5, "Siniestro": 0.5, "Hada": 0.5 },
    "Acero": { "Hielo": 2, "Roca": 2, "Hada": 2, "Fuego": 0.5, "Agua": 0.5, "Eléctrico": 0.5, "Acero": 0.5 },
    "Hada": { "Lucha": 2, "Dragón": 2, "Siniestro": 2, "Fuego": 0.5, "Veneno": 0.5, "Acero": 0.5 }
};


const calcularMultiplicador = (tipoAtaque, tipoDefensa) => {
    if (!efectividad[tipoAtaque] || efectividad[tipoAtaque][tipoDefensa] === undefined) {
        return 1; 
    }
    return efectividad[tipoAtaque][tipoDefensa];
};


const calcularDaño = (ataque, defensa, tipoAtaque, tipoDefensa1, tipoDefensa2) => {
    let daño = ataque - defensa;
    daño = daño > 0 ? daño : 1; 
    const modificador1 = calcularMultiplicador(tipoAtaque, tipoDefensa1);
    const modificador2 = tipoDefensa2 ? calcularMultiplicador(tipoAtaque, tipoDefensa2) : 1;
    return Math.floor(daño * modificador1 * modificador2);
};

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




//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemondefensor




//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias

//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;







// Variables de combate y referencias

let turno = 'propio';  // Empieza el turno del jugador (propio)
let combateActivo = true;  // Indica si el combate está activo

// Función para calcular el daño
//Combate, el pokemon perdedor será el que se le acabe primero su vida.


const combate = () => {
    if (!combateActivo) return;  // Si el combate no está activo, no hacer nada

    console.log("Turno de combate:", turno);
    turno = turno === 'propio' ? 'rival' : 'propio';


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
    //Se turnarán los pokemon hasta que haya un ganador
    const realizarTurno = (atacante, defensor, tipoAtaque) => {
        let daño;
        let vidaRestanteDefensor;

//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
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
//Mostrar el ganador

// Combate, el pokemon perdedor será el que se le acabe primero su vida.
        // Verificar si alguno de los Pokémon ha sido derrotado
        if (vidaRestanteDefensor <= 0) {
            combateActivo = false;
            alert(`${defensor === 'propio' ? 'El Pokémon propio' : 'El Pokémon rival'} ha sido derrotado. ¡${defensor === 'propio' ? 'El rival' : 'El jugador'} gana!`);
        }
    };
    
// El pokemon que tenga más velocidad va a pegar primero
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
    // Tabla de efectividad completa
const efectividad = {
    "Normal": { "Roca": 0.5, "Fantasma": 0, "Acero": 0.5 },
    "Fuego": { "Planta": 2, "Hielo": 2, "Bicho": 2, "Acero": 2, "Fuego": 0.5, "Agua": 0.5, "Roca": 0.5, "Dragón": 0.5 },
    "Agua": { "Fuego": 2, "Tierra": 2, "Roca": 2, "Agua": 0.5, "Planta": 0.5, "Dragón": 0.5 },
    "Planta": { "Agua": 2, "Tierra": 2, "Roca": 2, "Fuego": 0.5, "Planta": 0.5, "Veneno": 0.5, "Volador": 0.5, "Bicho": 0.5, "Dragón": 0.5, "Acero": 0.5 },
    "Eléctrico": { "Agua": 2, "Volador": 2, "Tierra": 0, "Eléctrico": 0.5, "Planta": 0.5, "Dragón": 0.5 },
    "Hielo": { "Planta": 2, "Tierra": 2, "Volador": 2, "Dragón": 2, "Fuego": 0.5, "Agua": 0.5, "Hielo": 0.5, "Acero": 0.5 },
    "Lucha": { "Normal": 2, "Hielo": 2, "Roca": 2, "Siniestro": 2, "Acero": 2, "Veneno": 0.5, "Volador": 0.5, "Psíquico": 0.5, "Bicho": 0.5, "Hada": 0.5, "Fantasma": 0 },
    "Veneno": { "Planta": 2, "Hada": 2, "Veneno": 0.5, "Tierra": 0.5, "Roca": 0.5, "Fantasma": 0.5, "Acero": 0 },
    "Tierra": { "Fuego": 2, "Eléctrico": 2, "Veneno": 2, "Roca": 2, "Acero": 2, "Planta": 0.5, "Bicho": 0.5, "Volador": 0 },
    "Volador": { "Planta": 2, "Lucha": 2, "Bicho": 2, "Eléctrico": 0.5, "Roca": 0.5, "Acero": 0.5 },
    "Psíquico": { "Lucha": 2, "Veneno": 2, "Psíquico": 0.5, "Acero": 0.5, "Siniestro": 0 },
    "Bicho": { "Planta": 2, "Psíquico": 2, "Siniestro": 2, "Fuego": 0.5, "Lucha": 0.5, "Veneno": 0.5, "Volador": 0.5, "Fantasma": 0.5, "Acero": 0.5, "Hada": 0.5 },
    "Roca": { "Fuego": 2, "Hielo": 2, "Volador": 2, "Bicho": 2, "Lucha": 0.5, "Tierra": 0.5, "Acero": 0.5 },
    "Fantasma": { "Psíquico": 2, "Fantasma": 2, "Normal": 0, "Siniestro": 0.5 },
    "Dragón": { "Dragón": 2, "Acero": 0.5, "Hada": 0 },
    "Siniestro": { "Psíquico": 2, "Fantasma": 2, "Lucha": 0.5, "Siniestro": 0.5, "Hada": 0.5 },
    "Acero": { "Hielo": 2, "Roca": 2, "Hada": 2, "Fuego": 0.5, "Agua": 0.5, "Eléctrico": 0.5, "Acero": 0.5 },
    "Hada": { "Lucha": 2, "Dragón": 2, "Siniestro": 2, "Fuego": 0.5, "Veneno": 0.5, "Acero": 0.5 }
  };
  
  // Función para calcular el multiplicador
  function calcularMultiplicador(tipoAtaque, tipoDefensa) {
    if (!efectividad[tipoAtaque] || efectividad[tipoAtaque][tipoDefensa] === undefined) {
      return 1; // Daño normal
    }
    return efectividad[tipoAtaque][tipoDefensa];
  }
  
  // Mostrar resultado con alert
  function mostrarResultado(tipoAtaque, tipoDefensa) {
    const multiplicador = calcularMultiplicador(tipoAtaque, tipoDefensa);
  
    let mensaje;
    if (multiplicador === 2) {
      mensaje = "¡Es súper efectivo! Daño x2";
    } else if (multiplicador === 0.5) {
      mensaje = "No es muy efectivo... Daño x1/2";
    } else if (multiplicador === 0) {
      mensaje = "¡No tiene efecto! Daño x0";
    } else {
      mensaje = "Daño normal. Daño x1";
    }
  
    alert(mensaje);
  }
  
  // Ejemplo de uso
  const tipoAtaque = "Fuego";
  const tipoDefensa = "Planta";
  
  mostrarResultado(tipoAtaque, tipoDefensa);
  
});


window.addEventListener('load', obtenerPokeRival);

btnElegir.addEventListener('click', obtenerPokePropio);

btnAtkFis.addEventListener('click', combate);
btnAtkEsp.addEventListener('click', combate);
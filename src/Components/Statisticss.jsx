"use strict";

export default function Calcular(dineroE, apuestaE) {
  //declaracion de variables globales
  const dinero = Number(dineroE);
  const apuestaInicial = Number(apuestaE);
  const arrayJugadores = [];
  const arrayEstadisticas = [];
  const arrayGEstadisticas = [];
  const cantidadIteraciones = 500000;
  let jugadoresEnObjetos = cantidadIteraciones;

  //funcion para girar la ruleta (comprobar si sale negro u otro color)
  const rollDice = () => (Math.random() > 0.514 ? 1 : 0);

  //funcion para ordenar array de menor a mayor
  const OrdenarJugadores = function (array) {
    array.sort(function (a, b) {
      if (a[0] == b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
  };

  //funcion que simula el proceso de apuesta de un solo jugador hasta que pierde
  // de esta funcion se comprueba su mayor ganancia y la cantidad de jugadas que le tomo llegar a ese numero)
  const apostar = function (dineroMovida, apuestaActual) {
    let mayorGanancia = dineroMovida;
    let cantidadJugadasActual = 0;
    let cantidadJugadasMax = 0;
    let negro = rollDice();
    cantidadJugadasActual++;

    while (dineroMovida > 0 && dineroMovida > apuestaActual) {
      (negro === 1 &&
        (dineroMovida += apuestaActual) &&
        (apuestaActual = apuestaInicial)) ||
        ((dineroMovida -= apuestaActual) && (apuestaActual *= 2));

      dineroMovida > mayorGanancia &&
        ([mayorGanancia, cantidadJugadasMax] = [
          dineroMovida,
          cantidadJugadasActual,
        ]);
      negro = rollDice();
      cantidadJugadasActual++;
    }

    return [mayorGanancia, cantidadJugadasMax];
  };

  //iteracion de jugadores y guardado en el arrayJugadores
  for (let i = 0; i < cantidadIteraciones; i++) {
    const Jugador = apostar(dinero, apuestaInicial);
    arrayJugadores.push(Jugador);
  }

  //llamar a ordenar jugadores
  OrdenarJugadores(arrayJugadores);

  //separacion de los jugadores en objetos segun su maxima ganancia
  for (const Jugador of arrayJugadores) {
    let existeObjeto = false;

    for (const objeto of arrayEstadisticas) {
      objeto.maximaGanancia === Jugador[0] &&
        objeto.arrayDeJugadores.push(Jugador) &&
        (existeObjeto = true);
    }
    existeObjeto === false &&
      arrayEstadisticas.push({
        probabilidadDeGanar: 0,
        maximaGanancia: Jugador[0],
        cantidadJugadores: 0,
        cantidadDobladas: 0,
        cantidadJugadasMedia: 0,
        arrayDeJugadores: [Jugador],
      });
  }

  //llenar los datos de cada objeto dentro del arrayEstadisticas-------------------------
  for (const objeto of arrayEstadisticas) {
    //la variable auxiliar toma como valor el jugador medio del array
    let variableAuxiliar =
      objeto.arrayDeJugadores[objeto.arrayDeJugadores.length / 2] ??
      objeto.arrayDeJugadores[(objeto.arrayDeJugadores.length + 1) / 2] ??
      objeto.arrayDeJugadores[0];

    objeto.cantidadJugadasMedia = variableAuxiliar?.[1];
    objeto.cantidadJugadores = objeto.arrayDeJugadores.length;

    objeto.probabilidadDeGanar = Math.trunc(
      (jugadoresEnObjetos * 100) / cantidadIteraciones
    );
    jugadoresEnObjetos -= objeto.cantidadJugadores;
    //la variable auxiliar toma como valor la maxima ganancia de este objeto
    variableAuxiliar = objeto.maximaGanancia;
    let doblada = apuestaInicial;
    while (variableAuxiliar > dinero) {
      variableAuxiliar -= doblada;
      doblada *= 2;
      Math.sign(variableAuxiliar) === 1 && objeto.cantidadDobladas++;
    }
  }

  //separacion segun probabilidad de ganar
  for (const objeto of arrayEstadisticas) {
    let existeObjeto = false;

    for (const gObjeto of arrayGEstadisticas) {
      if (gObjeto.probabilidadDeGanar === objeto.probabilidadDeGanar) {
        gObjeto.cantidadJugadores += objeto.cantidadJugadores;
        objeto.maximaGanancia > gObjeto.maximaGanancia[1] &&
          objeto.maximaGanancia > gObjeto.maximaGanancia[0] &&
          (gObjeto.maximaGanancia[1] = objeto.maximaGanancia);

        objeto.cantidadDobladas > gObjeto.cantidadDobladas[1] &&
          objeto.cantidadDobladas > gObjeto.cantidadDobladas[0] &&
          (gObjeto.cantidadDobladas[1] = objeto.cantidadDobladas);

        objeto.cantidadJugadasMedia > gObjeto.cantidadJugadasMedia[1] &&
          objeto.cantidadJugadasMedia > gObjeto.cantidadJugadasMedia[0] &&
          (gObjeto.cantidadJugadasMedia[1] = objeto.cantidadJugadasMedia);
        existeObjeto = true;
      }
    }
    existeObjeto === false &&
      arrayGEstadisticas.push({
        probabilidadDeGanar: objeto.probabilidadDeGanar,
        maximaGanancia: [objeto.maximaGanancia, 0],
        cantidadJugadores: objeto.cantidadJugadores,
        cantidadDobladas: [objeto.cantidadDobladas, 0],
        cantidadJugadasMedia: [objeto.cantidadJugadasMedia, 0],
      });
  }

  console.log(arrayGEstadisticas);
  return [arrayEstadisticas, arrayGEstadisticas];
}

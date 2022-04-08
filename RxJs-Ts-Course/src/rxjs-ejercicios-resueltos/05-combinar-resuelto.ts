import { interval, timer, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
/**
 * Ejercicio: Combinar ambos observables (letras$, numeros$)
 * para que las emisiones sean la concatenación de los últimos
 * valores emitidos
 */

//  Ejemplo de la tada esperada:
// a1
// a2
// b2
// b3
// c3
// c4
// d4
// d5
// e5

(() => {

  const letras = ['a', 'b', 'c', 'd', 'e'];

  /* letras empezará al de 1 seg */
  const letras$ = interval(1000).pipe(
    map<number, string>(i => letras[i]),
    take(letras.length));

  const numeros = [1, 2, 3, 4, 5];
  /* numeros empezará al de 500ms */
  const numeros$ = timer(500, 1000).pipe(
    map<number, number>(i => numeros[i]),
    take(numeros.length));

  combineLatest([letras$, numeros$]).pipe(
    map(([letra, numero]) => letra + numero)
  )
    .subscribe(console.log);

})();


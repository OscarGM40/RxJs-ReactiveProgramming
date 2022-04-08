/* Dado que of() sirve para crear Observable viene de 'rxjs' */
import { of } from 'rxjs';

/* la función of me permite crear un Observable a partir de un conjunto de valores.Automáticamente se completa tras emitir el último valor  */

const obs$ = of(1, 2, 3, 4, 5, 6);

/* el spread de un arreglo ...[] esparce cada posicion afuera de él,creando tantos elementos como posiciones */
//of(...[1, 2, 3, 4, 5,6]); es lo mismo que of(1, 2, 3, 4, 5,6);

/* Debería tipar la funcion of<T>() asinto */
const obs$2 = of<any>([1, 2], { a: 1, b: 2 }, function () { }, true, Promise.resolve(true));

console.log('Inicio de la Subscription a los obs$')
console.time("Subscription");

obs$.subscribe({
  next: (next) => console.log("Next: " + next),
  error: (error) => console.log("Error: " + error),
  complete: () => console.log("Complete")
});

obs$2.subscribe({
  next: v => console.log("Obs2$: " + v),
  error: null,
  complete: () => console.log("Obs2$ Complete")
});

console.log('Fin de la Subscription a los obs$')
console.timeEnd("Subscription");
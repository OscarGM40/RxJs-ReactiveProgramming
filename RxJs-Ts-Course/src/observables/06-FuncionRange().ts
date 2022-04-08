
/* la funcion range(initialPos,numberOfEmisions) crea un rango de números desde una posición inicial dada con el número de emisiones deseado */
import { asyncScheduler, of, range } from 'rxjs';

/* obviamente para un rango pequeño podría usar of en vez de range */
const src$ = of(...[1, 2, 3, 4, 5]);

/* pero que pasa si el rango es del 1 al 100?Sería muy inapropiado seguir con of,mejor usar range */
const src$2 = range(0, 10, asyncScheduler);


/* recuerda que tanto of como range son síncronos,pero puedo hacerlos asíncronos con asyncScheduler */
console.log('inicio');
// src$.subscribe(console.log);
src$2.subscribe(console.log);
console.log('fin');


import { interval } from 'rxjs';
import { map, scan, take } from 'rxjs/operators';

/**
 * Ejercicio: Realizar una cuenta regresiva
 * empezando de 7
 */

// Salida esperada ===
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0

(() => {

  const inicio = 7;
  const countdown$ = interval(700).pipe(
    /* El scan es como un reduce,pero no emite el acumulado,sino el acumulado parcial en cada emisión.
    Acumulado es 8-7-6-5-4-3-2-1   */
    // scan((accumulator, current) => --accumulator, inicio +1),
    /* también puedo usar un map */
    map(i => inicio - i),
    take(inicio + 1),
  );

  // No tocar esta línea ==================
  countdown$.subscribe(console.log); // =
  // ======================================

})();


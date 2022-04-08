/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

import { from } from "rxjs";
import { endWith, map, startWith } from 'rxjs/operators';

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */
(({ startMessage, endMessage }) => {

  const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];

  const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // puedo usar from u of(...nombres)
  from(nombres).pipe(
    startWith(startMessage),
    endWith(endMessage),
    map(capitalizar),
  ).subscribe(console.log);

})({ startMessage: 'Starting...', endMessage: 'Finished!' });


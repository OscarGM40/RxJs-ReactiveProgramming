import { interval, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
/**
 * Ejercicio: Realizar que los dos observables finales, 
 * emitan exactamente el mismo valor
 * 
 * Tip: Hot Observable? subjects?
 */

(() => {

  // == NO TOCAR este bloque ====================
  const reloj$ = interval(1000).pipe(
    take(5),
    map(val => Math.round(Math.random() * 100))
  );
  // ============================================
  /* la solución es usar multicasting con Subject,primero lo paso como observer a un Observable,despues me suscribo a él como Observable.Perfecto */
  const subject$ = new Subject();
  reloj$.subscribe(subject$);

  // Estos dos observables deben de emitir exactamente los mismos valores
  subject$.subscribe(val => console.log('obs 1: ', val));
  subject$.subscribe(val => console.log('obs 2: ', val));

})();


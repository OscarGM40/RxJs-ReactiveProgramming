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
  // No tocar la creación del observable
  // ============================================

  const subject$ = new Subject<number>();

  /* TIP:fijate que esto Observable.subscribe devuelve una Subscription. */
  const subscription = reloj$.subscribe(subject$); //este paso es la clave,antes de imprimir las emisiones le puedo pasar el Subject como observer a un Observable y despues suscribirme a ese subject(fijate que lo estoy usando de Observer y de Observable)

  // Estos dos observables deben de emitir exactamente los mismos valores
  subject$.subscribe({
    next:v => console.log('obs1',v),
    complete:() => subscription.unsubscribe(),
  })
  subject$.subscribe({
    next:v => console.log('obs2',v),
    complete:() => subscription.unsubscribe(),
  })

})();


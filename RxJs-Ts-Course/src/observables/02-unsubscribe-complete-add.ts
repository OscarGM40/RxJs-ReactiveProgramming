import { Observable, Observer } from 'rxjs';

const observer: Observer<number> = {
  next: value => console.log('[Next]', value),
  error: error => console.warn('[Error]', error),
  complete: () => console.info('[Complete]')
};

const intervalo$ = new Observable<number>(subscriber => {
  let count = 1;

  const interval = setInterval(() => {
    subscriber.next(count);
    count++;
  }, 1000);

  setTimeout(() => {
    /* un subscriber es un observer,asi que puedo llamar a su complete.LLamar al complete de un observer también llama automáticamente al código del return*/
    subscriber.complete();
  }, 3500);

  return () => {
    clearInterval(interval);
    console.log('Intervalo destruido');
  }
});

/* me subscribo aun Observable,haciendo que empiece a emitir con subscribe */
const sub1 = intervalo$.subscribe(observer);
const sub2 = intervalo$.subscribe(observer);
const sub3 = intervalo$.subscribe(observer);

/* con add puedo agregar una subscription a otra */
sub1.add(sub2);
sub2.add(sub3);

setTimeout(() => {
  /* si usé add,cancelar una cancela a otras en cadena */
  sub1.unsubscribe();

/* el unsubscribe de una Subscription llama al return del Observable al que escuchaban */

  // sub2.unsubscribe();
  // sub3.unsubscribe();
  console.log('Se han destruido todos los subs');
}
  , 7500);
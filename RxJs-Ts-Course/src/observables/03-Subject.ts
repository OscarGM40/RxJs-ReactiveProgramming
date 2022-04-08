import { Observable, Observer, Subject } from 'rxjs'

const observer: Observer<any> = {
  next: (value) => console.log('next:', value),
  error: (error) => console.warn('error:', error),
  complete: () => console.info('completado')
}


const intervalo$ = new Observable<number>(subs => {

  const intervalo = setInterval(() => {

    subs.next(Math.floor(Math.random() * 100));
  }, 2000);

  return () => {
    clearInterval(intervalo);
    console.log('Intervalo destruido');
  }

});


/* fijate que subject$ va con el $,además que lo importamos directamente de 'rxjs',y recuerda que alli todo lo que hay es para crear Observables  */
/* Subject es un tipo especial de Observable.Features:
1- multicast(muchas subscripciones pueden estar sujetas a este Observable,emitiendo la misma información a todas ellas)
2- también es un observer(con lo que lo puedo mandar en el subscribe como argumento)
  3- también puede manejar el Next,Error y Complete
*/
const subject$ = new Subject();
const subscriptionSource = intervalo$.subscribe(subject$);
const subscription1 = subject$.subscribe(rnd => console.log("subs 1: " + rnd));
const subscription2 = subject$.subscribe(rnd => console.log("subs 2: " + rnd));

setTimeout(() => {
  /* Recuerda que Subject también es un observer,y por ello puedo acceder a next y emitir un valor que yo quiera en multicasting */
  subject$.next(10010110);
  /* y de nuevo puedo simplemente llamar al complete */
  subject$.complete();
  /* fijate que nos dejabamos la primera */
  subscriptionSource.unsubscribe();
}, 3500);

/* NOTA, puedo llamar al observer.complete o al subscription.unsubscribe.Cualquiera de ellos llama al return del Observable en cuestión */

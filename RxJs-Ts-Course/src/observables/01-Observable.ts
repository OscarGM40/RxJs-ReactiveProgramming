/*Para crear Observables casi todo está en el core rxjs  */
import { Observable, Observer } from 'rxjs'

/* forma poco común con el método estático create */
// const obs$ = Observable.create(function (observer) {

const obs$ = new Observable<String>(subscriber => {
  subscriber.next('Hola')
  subscriber.next('Mundo')
  /* error forzado */
  const a = undefined;
  a.nombre = 'Juan';

  subscriber.complete()
})


/* La función subscribe recibe un observer?:PartialObserver<T> 
Este observer está compuesto de tres partes,el next,el error y el complete.Las tres partes son opcionales.Ya no se pasan por separado,sino como un observer(es una interfaz)*/
obs$.subscribe(
  next => console.log(next),
  error => console.warn(error),
  () => console.info('Completado'));

/* forma que debo usar con un único argumento de tipo Observer<T> */
const observer: Observer<any> = {
  next: value => console.log('next [observer]: ', value),
  error: error => console.warn('error [observer]: ', error),
  complete: () => console.info('completado [observer]')
}
obs$.subscribe(observer);




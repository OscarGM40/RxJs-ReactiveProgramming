


/* interval y timer son funciones asíncronas por naturaleza  */
import { interval, Observer, timer } from "rxjs";

const observer: Observer<any> = {
  next: val => console.log('next:', val),
  error: null,
  complete: () => console.log('complete')
}

/* interval emite una secuencia desde 0 y de 1 en 1 cada X tiempo */
const interval$ = interval(1000);
/* timer emite un único valor si sólo lleva un arg al de ese tiempo */
const timer$ = timer(2000);
/* con dos args emite al de X tiempo una secuencia igual a la de interval cada Y miliseconds */
const timerAsInterval$ = timer(2000, 1000);

/* con timer puedo programar acciones en base a momentos cualesquiera como dentro de 5 segundos */
const hoyEn5 = new Date();
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);
const timerProgrammed$ = timer(hoyEn5);


console.log('inicio');
// interval$.subscribe(observer);
// timer$.subscribe(observer);
timerAsInterval$.subscribe(observer);
console.log('fin');



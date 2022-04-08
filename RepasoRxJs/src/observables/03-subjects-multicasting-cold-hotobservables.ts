import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from "rxjs";

const observer: Observer<any> = {
  next: next => console.log('next: ', next),
  error: error => console.warn('Error: ', error),
  complete: () => console.info('Completed')
};

/*  */
const interval$ = new Observable<number>(subscriber => {
  const interval = setInterval(() => subscriber.next(+Math.ceil(Math.random() * 10).toFixed(0)), 1000);
  return (() => {
    clearInterval(interval);
    console.log('return del interval') //no se llamara mientras no llame al subscriber.complete en esta callback o al interval$.unsubcribe()
  })
})

/* const subs1 = interval$.subscribe(rnd => console.log('Subscription 1: '+rnd))
const subs2 = interval$.subscribe(rnd => console.log('Subscription 2: '+rnd)) */

/**Subject por defecto viene en casteo múltiple(sólo se creará una instancia,la cual emite los mismos valores a todas las Subscriptions,a diferencia de un Observable ) */
/* no sólo eso,sino que también es un observer(luego puede pasarse como argumento del subscribe,y también puede llamarse al next,error y complete,por ello) */
/*  */

const subject$ = new Subject<number>();
const sub = interval$.subscribe(subject$); //aqui esta actuando como subscriber/observer,ojo

/* const subs1 = subject$.subscribe(rnd => console.log('Subscription 1: '+rnd))
const subs2 = subject$.subscribe(rnd => console.log('Subscription 2: '+rnd)) */
const subs1 = subject$.subscribe(observer)
const subs2 = subject$.subscribe(observer)

setTimeout(() => {
  subject$.next(455);
  subject$.complete();
  sub.unsubscribe(); //fijate como es necesario el unsubscribe para limpiar el intervalo al haber pasado de un cold observable a un hot observable
}, 3500)
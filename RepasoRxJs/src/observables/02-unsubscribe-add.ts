import { BehaviorSubject, Observable, Observer, ReplaySubject, Subject } from "rxjs";

const observer: Observer<any> = {
  next: next => console.log('next: ', next),
  error: error => console.warn('Error: ', error),
  complete: () => console.info('Completed')
};

const interval$ = new Observable<number>(subscriber => {
  let posInitial = 1;
  let contador = setInterval(() => { subscriber.next(posInitial++) }, 1000)
  /* ojo,que este interval queda abierto,este Observable es infinito === no es finito */
  /* para limpiar procesos tengo el return del Observable,que se ejecutará cuando se llame al unsubscribe <- INTERESANTE */
  setTimeout(() => subscriber.complete(), 3000)
  return (() => { clearInterval(contador), console.log('interval destruido') })
})

const subs1 = interval$.subscribe(num => console.log('Num: ', num));
const subs2 = interval$.subscribe(num => console.log('Num: ', num));
const subs3 = interval$.subscribe(num => console.log('Num: ', num));


subs1.add(subs2.add(subs3));

setTimeout(() => {
  subs1.unsubscribe();
  // subs2.unsubscribe();
  // subs3.unsubscribe();
  console.log('completados unsubscribes') //fijate como primero se ejecuta el return del Observable,ya que va antes los unsubscribe que el console.log
}, 4100)

/* subject sólo retrasmite,cada .next(value)(el valor upcoming) pero no los anteriores o un valor predeterminado pasado por constructor(es decir,cualquier valor anterior,solo emite los upcoming values) */
let subject = new Subject();
subject.next(1);

subject.subscribe({ next: v => console.log('observerA: ' + v) });
subject.subscribe({ next: v => console.log('observerB: ' + v) });
subject.next(2)

/* BehaviourSubject,por el contrario si emite el valor del constructor,(emite one previous value + all upcoming values. */
let bSubject = new BehaviorSubject<number>(2); //fijate como espera el argumento,asinto
bSubject.subscribe({ next: v => console.log('bSubject A: ' + v) });
bSubject.next(3)
bSubject.subscribe({ next: v => console.log('bSubject B: ' + v) });

/* y también esta ReplaySubject que emitirá todos los valores previos(all previous values and upcoming values) creando un histórico.En el constructor se puede asignar el size del buffer del historico o el tiempo a guardar esos valores*/
let rSubject = new ReplaySubject(5);
rSubject.next(1);
rSubject.next(2);
rSubject.next(3);
rSubject.subscribe({ next: (v) => console.log('ReplaySubjectA: ' + v) })
rSubject.subscribe({ next: (v) => console.log('ReplaySubjectB: ' + v) })





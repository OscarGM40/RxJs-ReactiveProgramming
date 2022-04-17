import { delay, forkJoin, interval, map, of, take } from "rxjs";


const numbers$ = of(1, 2, 3, 4);
const interval$ = interval(1000).pipe(take(3), map(x => x += 1))
const letras$ = of('a', 'b', 'c').pipe(delay(3500))

/* por defecto va a ser un Array */
forkJoin(numbers$, interval$, letras$).subscribe(console.log)
/* puedo usar forkJoin({}) para que arroje un object.Las propiedades serán el nombre del los observables por defecto */
forkJoin({
  num: numbers$,
  interval: interval$,
  letra: letras$
})
  .subscribe(resp => {
    console.log(resp)
  })
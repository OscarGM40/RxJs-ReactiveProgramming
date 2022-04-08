import { forkJoin, interval, of } from "rxjs";
import { delay, take } from 'rxjs/operators';


const numeros$ = of(1, 2, 3, 4)
const interval$ = interval(1000).pipe(take(3));
const letras$ = of('a', 'b', 'c').pipe(delay(3500));

/* recuerda que forkJoin regresa un Observable(no lo hacen todos los flattening operators??).Retornará en forma de arreglo la última emisión de cada Observable interno */


/* de nuevo está deprecado usar varios argumentos.Usar un arreglo de ellos ya */
forkJoin([
  numeros$,
  interval$,
  letras$
]
).subscribe(console.log); //emitirá [4,2,'c']

/* y si quiero un objeto como salida en vez de un arreglo uso un objeto como argumento */
forkJoin({
  numeros$,
  interval$,
  letras$
}).subscribe(console.log); //emitirá {numeros: 4, interval: 2, letras: 'c'}

/* y si quisiera renombrar las propiedades de ese objeto simplemente uso esto: */
forkJoin({
  num: numeros$,
  int: interval$,
  let: letras$
}).subscribe(console.log);//emitirá {num: 4, int: 2, let: 'c'}


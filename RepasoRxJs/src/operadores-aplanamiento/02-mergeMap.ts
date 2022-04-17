import { debounceTime, fromEvent, interval, map, mergeMap, of, take, takeLast, takeUntil, tap, timer } from "rxjs";
import { ajax } from "rxjs/ajax";


const url = 'https://jsonplaceholder.typicode.com/todos/1';

const click$ = fromEvent(document, 'click');

click$.pipe(
  mergeMap(() => ajax.getJSON(url))
).subscribe(console.log) //en el click lo que voy a ver es la Response del ajax,ojo,el click pa tu tia


const letras$ = of('a', 'b', 'c')

letras$.pipe(
  mergeMap((letra) => interval(1000).pipe(
    take(3),
    map(n => letra + " " + n)
  ))
).subscribe(console.log) //emite lo del mergeMap por ser un flattening operator??

/* fijate que mergeMap recibe la emisión o emisiones del stream Source.Si tuviera una lista de urls podria realizar una petición a cada sitio */
/* la clave es que reciben la emisión del anterior y en que el nuevo Observable que crea mergeMap se le pasa la emisión a la Subscription del padre.Mientras no entienda estas dos cosas estoy jodiu */
const myPromise = (val: string | number) => new Promise((resolve) => setTimeout(() => resolve("In the resolve: " + val), 4000))

const source$ = of('Hello');

source$.pipe(
  mergeMap(myPromise) //va a recibir 'Hello',
).subscribe(console.log)

const numbers$ = of(...[1, 2, 7, 5])
numbers$.
  pipe(mergeMap(myPromise)).subscribe(console.log)

const mouseDown$ = fromEvent(document, 'mousedown')
const mouseUp$ = fromEvent(document, 'mouseup')
const interval$ = interval();

mouseDown$.pipe(
  mergeMap(() => interval$
    .pipe(
      debounceTime(500),
      takeUntil(mouseUp$))),
).subscribe(console.log)


fromEvent<MouseEvent>(document,'dblclick').pipe(
  mergeMap(() => of('doble click realizado'))
).subscribe(console.log)
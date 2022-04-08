import { fromEvent, interval, map, mergeMap, of, take, last } from "rxjs";
import { takeUntil } from 'rxjs/operators';


const letras$ = of('a', 'b', 'c');

/* con mergeMap puedo crear un Observable B al recibir un valor de un Observable A e incluso transformarlo,etc,*/

letras$.pipe(
  mergeMap((letra) => interval(1000).pipe(
    map(i => letra + i),
    take(3)
  ))
).subscribe({
  next: (letra) => console.log('next:', letra),
  complete: () => console.log('complete')
});


/* fijate que fácil sería comprobar cuanto tiempo he mantenido pulsado el mouse.Necesito tres Observables(para el inicio,la condición de fin y el conteo) Genial.*/
const mouseDown$ = fromEvent(document, 'mousedown');
const mouseUp$ = fromEvent(document, 'mouseup');
const interval$ = interval(); //un interval vacio se emite cada milisegundo,dejarlo vacio o usar interval(1) es lo mismo

mouseDown$.pipe(
  mergeMap(() => interval$.pipe(
    takeUntil(mouseUp$),
    last())))
  .subscribe(console.log);
import { exhaustMap, fromEvent, interval, take } from "rxjs";


const interval$ = interval(500);
const click$ = fromEvent(document, 'click');

/* exhaustMap va a ignorar cualquier valor que hiciera crear otra subscripcion si la primera está emitiendo.Es decir,solo tendré un Observable activo a la vez(cuando termine de emitir si que puede crearse otra ). */
click$.pipe(
  exhaustMap(() => interval$.pipe(take(3)))
).subscribe(console.log);
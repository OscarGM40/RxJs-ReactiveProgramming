import { fromEvent, interval, mergeMap, switchMap } from "rxjs";


const click$ = fromEvent(document, 'click');
const interval$ = interval(1000);

/* mergeMap creará otra subscription a interval$ por cada emisión de click$,llenando de emisiones a interval$ la salida.Sin embargo switchMap reiniciará el interval$ en cada click. */
click$.pipe(
  // mergeMap( () => interval$.pipe())
  switchMap(() => interval$.pipe())
).subscribe(console.log);








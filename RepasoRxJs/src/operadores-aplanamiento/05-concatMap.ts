import { concatMap, fromEvent, interval, take } from "rxjs";


const click$ = fromEvent(document,'click');
/* el concatMap concatenará las emisiones del inner Stream en vez de cancelarlas o mergearlas.Muy útil cuando quiera asegurarme que emite */
click$.pipe(
  concatMap( () => interval(1000).pipe(take(5)))
).subscribe(console.log)
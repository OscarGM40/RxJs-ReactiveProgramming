import { concatMap, fromEvent, interval, mergeMap, switchMap, take } from "rxjs";



const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

/* puedo observar las diferencias entre solo emitir el último,reiniciando la secuencia si es necesario (switchMap),emitir en paralelo mezclando la secuencia(mergeMap) y emitir en secuencial,nunca mezclando,sino concatenando(concatMap) */
click$.pipe(
  // switchMap( () => interval$.pipe(take(3)))
  concatMap(() => interval$.pipe(take(3)))
).subscribe(console.log);
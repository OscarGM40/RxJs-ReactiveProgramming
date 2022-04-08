import { fromEvent, map, sampleTime } from 'rxjs';


const click$ = fromEvent<PointerEvent>(window, 'click');
/* sampleTime toma una muestra cada X tiempo,las demas emisiones son ignoradas.Cuando se resetee el tiempo estará preparado para emitir,pero el Observable tiene que emitir.En cuanto emita de nuevo hay que esperar X tiempo. */
click$.pipe(
  sampleTime(2000),
  map(({ x, y }) => ({ x, y })),
).subscribe(console.log);
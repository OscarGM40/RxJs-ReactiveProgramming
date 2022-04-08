import { interval, fromEvent } from 'rxjs';
import { map, take, skip, tap, takeUntil } from 'rxjs/operators';

const button = document.createElement('button');
button.innerText = 'Detener Timer tras 2º click';
button.style.cursor = 'pointer';

/* no hace document.body para no tener a body por referencia */
document.querySelector('body').appendChild(button);

const interval$ = interval(1000);
/* imagina que no quiero que se cancele en el primer click sino en el segundo.Puedo usar skip perfectamente */
const clickBtn$ = fromEvent(button, 'click').pipe(
  tap(() => console.log('tap antes de skip')),
  skip(1),
  tap(() => console.log('tap despues de skip')));

/* takeUntil(obs$) sigue emitiendo valores de un Observable cualquiera mientras no sea un valor perteneciente al Observable que recibe por argumento.Es decir que cancela todo en cuanto el observable X emita algo.Fijate como combina con fromEvent y el evento click de botón X*/
interval$.pipe(
  takeUntil(clickBtn$)
).subscribe({
  next: val => console.log('next: ', val),
  error: null,
  complete: () => console.log('complete')
});
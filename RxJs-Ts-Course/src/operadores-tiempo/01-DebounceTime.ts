import { debounceTime, fromEvent } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';


const click$ = fromEvent(document, 'click');

/* recuerda que debounceTime(milis:number) ya retrasa incluso la primera emisión!.Emitirá la última emisión que recibió al de ese tiempo.Este operador ES SUMAMENTE ÚTIL PARA CONTROLAR OBSERVABLES QUE EMITEN UNA CANTIDAD INMENSA DE VALORES MUY RÁPIDAMENTE */
click$.pipe(
  debounceTime(3000)
).subscribe(console.log);

/* veamos un ejemplo más útil,creando un input y recogiendo todos los valores que se escriban en éld */
const input = document.createElement('input');
document.querySelector('body').append(input); //rompe la ref


/* un input que haga una petición http en cada cambio es el lugar ideal para usar debounceTime.De echo,es el lugar ideal para usar distinctUntilChanged también,para que no se repita la petición anterior */
const input$ = fromEvent<KeyboardEvent>(input, 'keyup');

input$.pipe(
  debounceTime(500),
  pluck('target', 'value'),
  distinctUntilChanged()
).subscribe(console.log);







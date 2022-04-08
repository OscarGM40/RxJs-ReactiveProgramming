import { fromEvent, throttleTime, debounceTime, asyncScheduler } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';


const click$ = fromEvent(window, 'click')
/* throttleTime recoge el primer valor emitido,espera ese tiempo X y está de nuevo receptivo a un siguiente valor.El debounceTime es un poco diferente,ya que recoge el primer valor,espera el tiempo y lo emite. */
click$.pipe(throttleTime(3000)).subscribe(console.log);

const input = document.createElement('input');
document.querySelector('body').append(input);

const input$ = fromEvent<KeyboardEvent>(input, 'keyup')
/* throttleTime permite recoger solo el primer y/o último valores en ese intervalo */
input$.pipe(
  throttleTime(1000, asyncScheduler, {
    leading: false,
    trailing: true
  }),
  // debounceTime(100),
  pluck('target', 'value'),
  distinctUntilChanged()
).subscribe(console.log);


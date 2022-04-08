import { combineLatest, fromEvent, merge } from "rxjs";
import { map, pluck } from 'rxjs/operators';


/* combineLatest combina la última emisión de cada Observable interno,no emitirá hasta que emitan al menos un valor cada uno de estos Observables internos y fusionará ambas emisiones! */
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

/* ya no recibe varios argumentos sino uno solo,que será un arreglo u objeto.Estilo Promise.all([]) */
/* combineLatest([
  keyup$.pipe(pluck('type')),
  click$.pipe(pluck('type'))
 ]).subscribe(console.log); */

const input1 = document.createElement('input');
const input2 = document.createElement('input');
input1.placeholder = 'Enter email';
input2.placeholder = 'Enter password';

input2.type = 'password';
document.querySelector('body').append(input1, input2);

const getInputStream = (elem: HTMLInputElement) => fromEvent<KeyboardEvent>(elem, 'keyup')
  .pipe(map<KeyboardEvent, string>(event =>
    (<HTMLInputElement>event.target).value));


combineLatest([
  getInputStream(input1),
  getInputStream(input2)
]).subscribe(console.log);

import { auditTime, fromEvent, map } from 'rxjs';
import { tap } from 'rxjs/operators';



const h1 = document.createElement('h1');
h1.innerText = 'auditTime operator';
document.body.appendChild(h1);

const click$ = fromEvent<PointerEvent>(document, 'click');
/* auditTime emite el ultimo valor automáticamente tras X tiempo.Es como debounceTime */
click$.pipe(
  map(({ x, y }) => ({ x, y })),
  tap(val => console.log('tap', val)),
  auditTime(2000),
).subscribe(console.log);


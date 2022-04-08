
import { fromEvent } from 'rxjs';
import { take, first, tap, map } from 'rxjs/operators';


const click$ = fromEvent<PointerEvent>(document, 'click');
type MyType = {
  clientX: number;
  clientY: number;
}

/* first(predicate?=null) tomará el primer valor sin argumentos en él o el primer valor que coincida con ese predicado */
click$.pipe(
  // first() toma el primero y cancela la Subscription
  tap<PointerEvent>(console.log),
  /* puedo usar map para desestructurar */
  /* map(event => ({
    clientY: event.clientY,
    clientX: event.clientX
  })), */
  map<PointerEvent, MyType>(({ clientY, clientX }) => ({ clientY, clientX })),
  // también puedo pasarle una condición
  first<MyType>(event => event.clientY >= 150)
).subscribe({
  next: (event) => console.log('click', event.clientX, event.clientY),
  complete: () => console.log('complete')
});

/* puedo ver que take(1) y first() es lo mismo,pero first(args) con argumentos me permite tomar la primera emisión que cumpla la condición que yo quiera.Interesante */
import { first, fromEvent, map, take, tap } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, 'click')

/* first() sin argumentos toma el primero y completa la Subscription */
/* click$.pipe(
  // take(1),
  first()
).subscribe({
  next: val => console.log('Next:', val),
  complete: () => console.log('Completed')
}); */

/* first es muy potente con el predicado */
click$.pipe(
  tap<MouseEvent>(console.log),
  map( ({ clientX, clientY }) => ({ clientY, clientX })),
  first( ({clientY}) => clientY > 200)
  // first<MouseEvent>((event) => event.clientY > 150)
).subscribe({
  next: val => console.log('Next:', val),
  complete: () => console.log('Completed')
})
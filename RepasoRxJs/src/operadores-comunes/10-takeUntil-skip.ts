import {  fromEvent, skip, skipUntil, takeUntil, tap, timer } from "rxjs";


const boton = document.createElement('button');
boton.textContent="Detener timer"
boton.style.cursor="pointer"

document.querySelector('body').append(boton);

const interval$ = timer(500,1000)
const click$ = fromEvent<MouseEvent>(boton,'click').pipe(
  skip(2)
  // skipUntil()
)

interval$.pipe(
  tap(console.log),
  takeUntil(click$)
).subscribe({
  next: val => console.log('Next:',val),
  complete: () => console.log('Completed'),
})
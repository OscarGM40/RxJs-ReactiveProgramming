import { debounceTime, distinctUntilChanged, fromEvent, pluck } from "rxjs";


const click$ = fromEvent<MouseEvent>(document,'click');

click$.pipe(
  debounceTime(3000)
).subscribe(console.log)

const input = document.createElement('input')
document.querySelector('body').append(input);

const input$ = fromEvent(input,'keyup');
input$.pipe(
  pluck('target','value'),
  debounceTime(1000),
  distinctUntilChanged(),
).subscribe(console.log)
import { asyncScheduler, debounceTime, distinctUntilChanged, fromEvent, pluck, throttleTime } from "rxjs";


const click$ = fromEvent(document, 'click')

click$.pipe(
  // debounceTime(3000),
  throttleTime(3000)
).subscribe(console.log)


const input = document.createElement('input')
document.querySelector('body').append(input);

const input$ = fromEvent(input, 'keyup');
input$.pipe(
  throttleTime(3000,asyncScheduler,{
    leading:true,
    trailing:true
  }),
  pluck('target', 'value'),
  distinctUntilChanged(),
).subscribe(console.log)
import { combineLatest, fromEvent, map, merge, pluck } from "rxjs";


/* const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

combineLatest(
  keyup$.pipe(pluck('type')),
  click$.pipe(pluck('type')),
).subscribe(console.log) */

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = "Enter email..."
input1.type = "email"
input2.placeholder = "Enter password..."
input2.type = "password"

document.querySelector('body').append(input1,input2);

const getInputStream = (elem:HTMLElement) => {
  return fromEvent<KeyboardEvent>(elem,'keyup')
    .pipe(
      map<KeyboardEvent,string>(event => (event.target as HTMLInputElement).value))
}

combineLatest(
  getInputStream(input1),
  getInputStream(input2),
).subscribe(console.log)


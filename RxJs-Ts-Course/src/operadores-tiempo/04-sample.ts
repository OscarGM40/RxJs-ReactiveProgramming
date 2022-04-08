import { fromEvent, interval, sample } from "rxjs";


const interval$ = interval(1000);

const h2 = document.createElement('h2');
h2.textContent = 'Testing sample';
document.querySelector('body').appendChild(h2);

const button = document.createElement('button');
button.textContent = 'Click me';
document.querySelector('body').appendChild(button);

const click$ = fromEvent(button, 'click');

interval$.pipe(
  sample(click$)
).subscribe(console.log);
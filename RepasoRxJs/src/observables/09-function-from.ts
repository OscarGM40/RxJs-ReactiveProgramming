import { from, Observer, of } from "rxjs";


const observer: Observer<any> = {
  next: val => console.log(`Next: ${val}`),
  error: err => console.error(`Error: ${err}`),
  complete: () => console.info('Observer completed')
}

const miGenerador = function* (){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
} 
/* recuerda que hay que invocar al generador para que suelte lo que ha almacenado,el illoputa */
from(miGenerador()).subscribe(observer);
// const source$ = from([1,2,3,4,5])
// const source$ = of([1,2,3,4,5]) //fijate que of stremea el array como un único argumento,claro que puedo usar of(...[1,2,3,4,5]) para esparcirlo

const source$ = from( fetch('https://api.github.com/users/klerith'));

// source$.subscribe(async observer => await observer.json().then(console.log));




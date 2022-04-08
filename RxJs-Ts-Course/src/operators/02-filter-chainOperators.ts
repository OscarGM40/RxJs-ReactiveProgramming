
import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/* filter evalua una expresión boleana y sólo manda a los subscriptores los valores que evaluen esa expresión a true */
range(10, 20)
  .pipe(filter((v, i) => {
    console.log('index', i);
    return v % 2 === 1;
  }))
  .subscribe(console.log);

interface Personaje {
  nombre: string;
  tipo: string;
}

const personajes: Personaje[] = [
  {
    tipo: 'heroe',
    nombre: 'Batman',
  },
  {
    tipo: 'heroe',
    nombre: 'Robin',
  },
  {
    tipo: 'villano',
    nombre: 'Joker',
  }
]

from(personajes)
  .pipe(filter(elem => elem.tipo === 'heroe'))
  .subscribe(console.log);

/* Encadenamiento de operadores:
   1º: se pueden encadenar infinitos
   2º: cada operador toma la salida del anterior operador como entrada,de forma secuencial
*/

/*imagina que solo quiero realizar algo cuando se pulse enter*/
const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup')
  .pipe(
    map(event => event.code),
    filter(key => key === 'Enter')
  );
keyup$.subscribe(console.log);

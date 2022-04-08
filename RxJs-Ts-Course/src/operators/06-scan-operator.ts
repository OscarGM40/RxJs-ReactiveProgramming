import { from, of } from 'rxjs';
import { reduce, scan, map } from 'rxjs/operators';

const numeros = [1, 2, 3, 4, 5];

const totalAcumulador = (acc: number, cur: number) => acc + cur;


/* ejercicio con reduce: UNA ÚNICA EMISIÓN*/
from(numeros)
  .pipe(
    reduce(totalAcumulador),
  )
  .subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
  });
/* forma con scan ,emisión por cada iteración */
of(...numeros)
  .pipe(
    scan(totalAcumulador),
  )
  .subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
  });

/* Redux mock veamos un ejemplo simulando cambios en un state */
interface Usuario {
  id?: string;
  autenticado?: boolean;
  token?: string;
  edad?: number;
}

const users: Usuario[] = [
  { id: 'fher', autenticado: false, token: null },
  { id: 'fher', autenticado: true, token: 'ABC' },
  { id: 'fher', autenticado: true, token: 'ABC123' },
];

const state$ = from(users).pipe(
  scan<Usuario, Usuario>((acc, cur) => {
    return { ...acc, ...cur }
  }, { edad: 33 }));

const id$ = state$.pipe(
  map(state => state))


id$.subscribe(console.log);
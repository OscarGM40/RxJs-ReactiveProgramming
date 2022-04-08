import { interval } from 'rxjs';
import { tap, take, reduce } from 'rxjs/operators';

/* recuerda que la funciòn reduce  permite ejecutar una función acumuladora a un elemento iterable */
const numbers = [1, 2, 3, 4, 5];
const totalReducer = (acumulador: number, valorActual: number) => {
  return acumulador + valorActual;
}
/* es buena práctica mejorar la legibilidad no metiendo todo en el body de la función */
const total = numbers.reduce(totalReducer, 0);

interval(1000)
  .pipe(
    take(5),
    tap(console.log),
    reduce(totalReducer, 0)
  )
  .subscribe({
    next: val => console.log(val),
    complete: () => console.log('completed')
  });
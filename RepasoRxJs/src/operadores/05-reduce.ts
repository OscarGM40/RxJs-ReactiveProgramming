import { interval, reduce, take, tap, timer } from "rxjs";


const numbers = Array.of(...Array(6).keys()).map(x => x + 1);
// const numbers = Array.from(Array(20).keys()).map(x => x + 1)
// [...Array(20).keys()]


const totalReducer = (acumulador: number, valor: number) => {
  return acumulador + valor;
}

const total = numbers.reduce(totalReducer, 0)
console.log(total)

/* fijate que el operador take(n) toma los primeros n valores y automáticamente hace terminar al Observable.Y fijate en la importancia de esto */
timer(3000, 1500).pipe(
  take(3),
  tap(console.log),
  reduce( totalReducer,5)
)
  .subscribe({
    next: val => console.log('Next:', val),
    complete: () => console.log('Completed')
  })

  numbers.some(x => x > 5) //array.some comprueba si algun elemento pasa la condicion.Iterará por todo el arreglo,como el filter(mejor un find pues)
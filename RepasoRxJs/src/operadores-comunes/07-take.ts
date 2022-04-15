import { from, take, tap } from "rxjs"

const numeros = [...Array(10).keys()].map(x => x += 1)

from(numeros).pipe(
  tap(console.log),
  take(5)
).subscribe({
  next: val => console.log('Next:', val),
  complete: () => console.log('Completed')
})
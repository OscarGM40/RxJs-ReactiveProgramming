import { fromEvent, map, range } from "rxjs";



range(1, 5).pipe(
  map<number, number | string>(val => String(val * 10))
).subscribe(console.log)

const keyup$ = fromEvent<KeyboardEvent>(document,'keyup') // <- solo los asintos tipamos fromEvent
const keyupWithCode$ = keyup$.pipe(
  map(event => event.code)
)

keyupWithCode$.subscribe(val => console.log('code: ',val))

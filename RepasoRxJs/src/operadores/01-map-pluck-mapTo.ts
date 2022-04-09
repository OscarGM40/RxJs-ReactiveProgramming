import { fromEvent, map, mapTo, pluck, range } from "rxjs";



range(1, 5).pipe(
  map<number, number | string>(val => String(val * 10))
).subscribe(console.log)

const keyup$ = fromEvent<KeyboardEvent>(document,'keyup') // <- solo los asintos tipamos fromEvent
const keyupWithCode$ = keyup$.pipe(
  map(event => event.code)
);

const keyupPluck$ = keyup$.pipe(
  pluck('key')
)

const keyupEmbebedProperty$ = keyup$.pipe(
  pluck('target','baseURI')
)

const keyupMapTo$ = keyup$.pipe(
  mapTo<KeyboardEvent,string>('tecla presionada')
)

keyupWithCode$.subscribe(val => console.log('map: ',val))
keyupPluck$.subscribe(code => console.log('pluck',code));
keyupEmbebedProperty$.subscribe( value => console.log('Embebed: ',value))
keyupMapTo$.subscribe(code => console.log('mapTo',code))

import { filter, from, fromEvent, map, pluck, range } from "rxjs";

/* fijate que si filter recibe el index es porque iterará en orden si o si */
const range$ = range(1, 10).pipe(
  filter((x, i) => x % 2 !== 0)
).subscribe(console.log)

type Personaje = {
  tipo: 'heroe' | 'villano',
  nombre: string,
}

const personajes:Array<Personaje> = [
  {
    tipo: 'heroe',
    nombre: 'Batman'
  },
  {
    tipo: 'heroe',
    nombre: 'Robin'
  },
  {
    tipo: 'villano',
    nombre: 'Joker'
  },
]
/* podria usar of(...heroes) pero haría mas operaciones... */
const heroes$ = from(personajes).pipe(
  filter(p => p.tipo === 'heroe'),
  pluck('nombre')
).subscribe(console.log)

const keyup$ = fromEvent<KeyboardEvent>(document,'keyup').pipe(
  map<KeyboardEvent,string>(event => event.code),
  filter( code => code === 'Enter')
)

keyup$.subscribe(console.log)
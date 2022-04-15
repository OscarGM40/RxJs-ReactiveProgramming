import { distinctUntilChanged, from, map, pipe, pluck, reduce, scan } from "rxjs";

const numeros = Array.of(...Array(6).keys()).map(x => x + 1);

const totalAcumulador = (acc: number, val: number) => acc + val;

from(numeros).pipe(
  // reduce(totalAcumulador, 0)
  scan(totalAcumulador, 0)
).subscribe(console.log)

/* scan funciona igual que el store de Redux,imaginemos un Usuario cualquiera */
interface Usuario {
  id?: string;
  autenticado: boolean;
  token?: string;
  edad?: number
}

const user: Usuario[] = [
  { 'id': 'fernando', autenticado: false, token: null },
  { 'id': 'fernando', autenticado: true, token: 'ABC' },
  { 'id': 'fernando', autenticado: true, token: 'ABC134' },
]
/* fijate que simplemente quiero devolver el current(cada iteración) y el acumulado.Incluso le puedo dar un valor inicial */
const state$ = from(user).pipe(
  scan<Usuario,Usuario>((acc, cur) => {
    return { ...acc, ...cur }
  }, {autenticado:false, edad: 33 })
)
/* ahora sólo quiero saber los cambios en el id del usuario */
const id$ = state$.pipe(
  // pluck('id')
  map(state => state.id),
  distinctUntilChanged()
).subscribe(console.log)
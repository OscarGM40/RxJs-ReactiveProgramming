import { of, from } from 'rxjs';
import { distinct, distinctUntilChanged } from 'rxjs/operators';


const numeros$ = of(1, '1', 2, 3, 3, 4, 2, 2, 4, 4, 5, 1)
/* el operador distinct no deja pasar cualquier valor que ya haya sido emitido,es decir,emite sólo los valores distintos.Usa triple igual para comparar */
console.log('operador distinct')
numeros$.pipe(
  distinct() // ===
).subscribe(console.log)
console.log('operador distinctUntilChanged')
/* el operador distinctUntilChanged no deja pasar el valor si el valor anterior y el actual a emitir son iguales,es decir que deja pasar todos los valores mientras no sean dos emisiones iguales.Interesante */
numeros$.pipe(
  distinctUntilChanged() // ===
).subscribe(console.log)

interface Personaje {
  nombre: string;
}

/* sin embargo,este operador si coge fuerza a la hora de comparar los valores de una propiedad,es decir,coge fuerza cuando lleve argumento */
const personajes: Personaje[] = [
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'X'
  },
  {
    nombre: 'Zero'
  },
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'Zero'
  }
]
console.log('operador distinctUntilChanged con Predicate como argumento.Muy útil para comparar valores de las keys de un objeto')
from(personajes).pipe(
  distinct(p => p.nombre)
).subscribe(console.log)
console.log('operador distinctUntilChanged con Comparable como argumento.Muy útil para comparar valores de las keys de un objeto usando compare(a,b) => a.key === b.key')
from(personajes).pipe(
  distinctUntilChanged((a, b) => a.nombre === b.nombre)
).subscribe(console.log)
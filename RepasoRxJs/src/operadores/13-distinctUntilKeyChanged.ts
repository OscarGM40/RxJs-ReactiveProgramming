import { distinct, distinctUntilChanged, distinctUntilKeyChanged, from, of } from "rxjs";

interface Personaje {
  nombre:string;
}

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
    nombre: 'Dr. Willy'
  },
  {
    nombre: 'X'
  },
  {
    nombre: 'Megaman'
  },
  {
    nombre: 'Zero'
  },
]

const personajes$ = from(personajes).pipe(
  distinctUntilKeyChanged('nombre')
).subscribe({
  next: v => console.log(`Nombre: ${v.nombre}`)
}) 


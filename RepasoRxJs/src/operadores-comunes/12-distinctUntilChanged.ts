import { distinctUntilChanged, of } from "rxjs";


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
    nombre: 'Megaman'
  },
]

of(...personajes).pipe(
  distinctUntilChanged((anterior, siguiente) => anterior.nombre === siguiente.nombre)
).subscribe(console.log)
import { of } from "rxjs";


const of$ = of<number[]>(1,2,3,4,5,6);
const obs$ = of<any>( [1,2],{a:1,b:2},function(){},true,Promise.resolve('Resolved'))

console.log('Inicio del of sincrono')
of$.subscribe({
  next: v => console.log(`Next: ${v}`),
  error: err => console.log(err),
  complete: () => console.log('Terminada la secuencia'),
})
console.log('Fin del of sincrono')

obs$.subscribe(console.log)
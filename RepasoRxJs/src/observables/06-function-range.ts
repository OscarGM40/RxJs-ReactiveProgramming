import { asyncScheduler, of, range } from "rxjs";


/* fijate que usar of no es mantenible.NOTA: of también puede llevar un scheduler y ser asíncrono,no solo el range */
const src$ = of(1,2,3,4,5,6,7,8,9,10)

console.log('inicio')
const range$ = range(-5, 10, asyncScheduler); //empezará desde -5 y emitirá 10 valores(hasta el 4)
console.log('fin')



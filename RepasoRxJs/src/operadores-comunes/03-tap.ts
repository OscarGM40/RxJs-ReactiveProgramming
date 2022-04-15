import { map, Observer, range, tap } from "rxjs";

/* fijate que la instrucción return del operador tap es auto-ignorada */
const numeros$ = range(1, 5).pipe(
  tap(x => { console.log('en el tab', x); return 100 }),
  map(val => val * 10),
  tap({
    next: valor => console.log('en el partial observer',valor),
    complete: () => console.log('Se terminó el Observable')
  })
)

/* fijate que un Partial Observer no me obliga a usar las tres propieades.Un Observer si,tengo que usar el next,el error y el complete */

numeros$.subscribe(val => console.log('en la subscription', val))
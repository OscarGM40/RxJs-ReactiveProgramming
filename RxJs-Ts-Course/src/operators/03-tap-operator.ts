import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';


const numeros$ = range(1, 5);

/* el operador tap me permite realizar acciones secundarias,y nunca mutará la data,ya que su return es ignorado(no da fallo)Como argumento pide un observer,asi que tengo acceso al next,al complete al error o a cualquier combinación de estos.Es perfecto para depurar */
numeros$
  .pipe(
    tap(x => {
      console.log('antes', x)
      return 100;
    }),
    map(val => val * 10),
    tap({
      next: val => console.log('despues', val),
      complete: () => console.log('termino todo')
    }))
  .subscribe(value => console.log('subscriber: ', value));

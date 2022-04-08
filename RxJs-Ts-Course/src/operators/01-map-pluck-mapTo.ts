


import { fromEvent, range } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

range(1, 5)
  .pipe(
    map<number, number>(x => x * 10),
  )
  .subscribe(console.log);

const keyUp$ = fromEvent<KeyboardEvent>(document, 'keyup');

/* el operador map permite transformar la data que emite el Observable antes que la reciba el subscriber */
keyUp$.pipe(
  map(event => event.key),
).subscribe(k => console.log('map', k));

/* el operador pluck permite extraer una propiedad de un Objeto.El Observable tendrá que emitir un Object y tendré que saber el nombre de la propiedad ya que se extrae por su nombre */
keyUp$
  .pipe(pluck('key'))
  .subscribe(p => console.log('pluck', p));

/* con pluck puedo acceder a una propiedad de un objeto embebido en otro,puedo acceder a cualquier nivel de propiedades de un objeto.Simplemente se usa un argumento adicional por nivel extra*/
keyUp$
  .pipe(pluck('target', 'baseURI'))
  .subscribe(p => console.log('pluck nivel 2', p));
/* mapTo<T,R>(returnedValue:R) permite transformar toda la salida de un Observable a un mismo único valor de cualquier tipo.Podría ser útil en alguna ocasión muy concreta */
const keyupMapTo$ = keyUp$
  .pipe(mapTo('Tecla presionada'))
  .subscribe(console.log);
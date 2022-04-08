
import { of, from } from 'rxjs';

/* la función of(value | values[]):Observable of toma un valor o conjunto de valores y los emite en secuencia */

/* from(arg) crea un observable a partir de un argumento que puede ser un String,un Array,una Promise.. si el tipo de dato es iterable lo itera y emite cada valor de ese elemento iterable */

const observer = {
  next: val => console.log('next:', val),
  error: err => console.warn('error:', err),
  complete: () => console.info('completado')
}

/* of emitirá cada argumento en secuencia */
const source$ = of([1, 2, 3, 4, 5, 6]);
/* from si puede iterará */
const source2$ = from([1, 2, 3, 4, 5, 6]);
/* iterará por un String tmb */
const source3$ = from('Hola Mundo');
/* incluso iterará por la response de una Promise */
const source4$ = from(fetch('https://api.github.com/users/oscargm40'));

source$.subscribe(observer); //emite [1,2,3,4,5,6]

source2$.subscribe(observer); //emite el valor de cada elemento del arreglo

source3$.subscribe(observer); //emite cada letra del string

source4$.subscribe(observer); //itera sobre la Response de la promise

/* lógicamente puedo hacer lo que quiera con la Response,como hacerle el toJson a la Response.body */
source4$.subscribe(res => {
  res.json().then(console.log)
});

/* si no quiero usar callbacks puedo usar async perfectamente*/
source4$.subscribe(async res => {
  const data = await res.json();
  console.log(data);
});

/* from me permite trabajar con funciones generadoras.El asterisco en function*() es el que me dice que es una función generadora */
const miGenerador = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  yield 6;
}
/* Ahora puedo usar un Observable sobre mi generador y obtener secuencialmente cada uno de los valores.Pero primero tengo que llamar a esa funcion,tengo que ejecutarla */
const miIterable = miGenerador();

/* podria usar un ciclo for tradicional */
for (let val of miIterable) {
  console.log(val);
}
/* pero puedo usar la funcion from para obtener el mismo resultado */
from(miIterable).subscribe(observer);
/* Usar un Observable me dará acceso a operadores extendiendo las posibilidades de tratar la data */
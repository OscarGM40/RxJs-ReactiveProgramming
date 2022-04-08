import { catchError, map, of, pluck } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";

let url = 'https://api.github.com/users/oscargm40';

/* la fetch API tiene ciertas desventajas que la programación reactiva no tiene.Por ejemplo,trabaja con Promesas y una promesa no se puede cancelar */

const fetchPromesa = fetch(url); // no cancelable

/* además para manejar errores incluso tengo que ayudar a la API,haciendo el código incluso más extenso de lo que lo es */
const manejaErrores = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.status + "");
  }
  return response;
}

const atrapaError = (err: AjaxError) => {
  console.warn('Error:', err.message);
  return of([]);
}

/*otra desventaja es que me devuelve un body de tipo Readable Stream, y para procesar ese flujo de datos tengo que ejecutar otra promesa  */

fetchPromesa
  .then(manejaErrores) //recuerda que el primer arg pasa sólo,en este caso pasa la respuesta sóla al método
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error('error en el fetch', err));

url = 'https://api.github.com/userssdffper_page=5sdf';

/* con el objeto ajax ya me viene todo en la propiedad response.Me viene lo que envie el server en este endpoint */
ajax(url).pipe(
  pluck('response'),
  /* catchError tiene que retornar un Error o un Observable */
  catchError((err) => {
    /* pero puedo incluso devolver algo que me venga bien */
    // throw new Error(err) 
    return of([])
  }))
  .subscribe((users) => console.log('usuarios', users));   
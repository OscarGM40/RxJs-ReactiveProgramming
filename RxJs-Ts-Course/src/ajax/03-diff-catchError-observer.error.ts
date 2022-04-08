

import { catchError, of } from 'rxjs';
import { ajax, AjaxError } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1asdsff';

/* el objeto ajax tiene un método getJSON(url,options?:{} ) que permite traer directamente la response.Aparte se le puede pasar un segundo argumento opcional con los headers a mandar */

const obs$ = ajax.getJSON(url, {
  'Content-Type': 'application/json',
  'mi-token': 'ABC123'
})

/* bien pero cual es la diferencia entre usar getJSON y no usarlo? */
const obs$2 = ajax(url);

const manejaError = (err: AjaxError) => {
  console.warn('Error:', err.message);
  return of("Error gordo");
}

/* puedo ver que la diferencia es que getJSON entra hasta la response,el otro trae todo(y como sabe a que propiedad entrar?) */
obs$.pipe(
  catchError(manejaError)
).subscribe(data => console.log('getJSON', data));
obs$2.pipe(
  catchError(manejaError)
).subscribe(data => console.log('ajax', data));

const obs3$ = ajax.getJSON(url);

obs3$.pipe(
  catchError(manejaError)
).subscribe({
  next: val => console.log('next', val),
  error: err => console.warn('error from observer.error', err),
  complete: () => console.log('complete')
});


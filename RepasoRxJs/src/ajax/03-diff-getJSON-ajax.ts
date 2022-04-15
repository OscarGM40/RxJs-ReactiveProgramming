import { catchError, of } from "rxjs";
import { ajax, AjaxError } from "rxjs/ajax";


const url = 'https://httpbinxxx.org/delay/1';

const handleError = (resp: AjaxError) => {
  console.warn('Error:', resp.message)
  return of({
    ok: false,
    usuarios: []
  })
}

/* const obs$ = ajax.getJSON(url, {
  "my-header": "content of my header"
}).pipe(
  catchError(handleError)
);
const obs$2 = ajax(url).pipe(
  catchError(handleError)
);
 */
const obs$ = ajax.getJSON(url, {
  "my-header": "content of my header"
})
const obs$2 = ajax(url)



obs$.subscribe({
  next: data => console.log('getJSON',data),
  error: err => handleError(err),
  complete: () => console.log('completed getJSON')
})
obs$2.subscribe({
  next: data => console.log('ajax',data),
  error: err => handleError(err),
  complete: () => console.log('completed ajax')
})
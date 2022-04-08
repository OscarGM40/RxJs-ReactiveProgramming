

import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

/* el objeto ajax tiene un método getJSON(url,options?:{} ) que permite traer directamente la response.Aparte se le puede pasar un segundo argumento opcional con los headers a mandar */

const obs$ = ajax.getJSON(url, {
  'Content-Type': 'application/json',
  'mi-token': 'ABC123'
})
  .subscribe(data => console.log('data', data));
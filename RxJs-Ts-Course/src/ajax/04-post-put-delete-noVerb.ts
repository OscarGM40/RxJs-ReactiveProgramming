










import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

/* GET ajax.get(url,headers) */
ajax.get(url);

/* POST ajax.post(url,body,headers */
ajax.post(url, {
  username: 'mosh',
  password: 'thisIsMyPassword'
}, {
  'Content-Type': 'application/json',
  'Authorization': 'sometoken'
}).subscribe(console.log);

/* PUT ajax.put(url,body,headers) */
ajax.put(url, {
  username: 'mosh',
  password: 'thisIsMyPassword'
}, {
  'Content-Type': 'application/json',
  'Authorization': 'sometoken'
}).subscribe(console.log);

/* DELETE ajax.delete(url,headers) Recuerda que una petición delete no permite mandar nada por el body(y una GET?) */
ajax.delete(url, {
  'Content-Type': 'application/json',
  'Authorization': 'sometoken'
}).subscribe(console.log);

/* puedo no usar el verbo y configurar la peticion,como con fetch o axios.Genial.Ahora podría pasarle el verbo como argumento simplemente */
ajax({
  url,
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'sometoken'
  }
}).subscribe(console.log);

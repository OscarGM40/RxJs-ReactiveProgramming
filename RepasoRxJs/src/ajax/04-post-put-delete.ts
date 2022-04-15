import { ajax } from "rxjs/ajax";



const url = 'https://httpbin.org/delay/1';

/* GET: es muy sencillo,además de ser el por defecto */
const obsGET$ = ajax.get(url,{"my-header":"custom header"});
obsGET$.subscribe(console.log);

/* POST:  por post el segundo arg es el body,el tercero los headers*/
const obsPOST$ = ajax.post(url,{id:1,nombre:"Fernando"},{"my-token":"abc123"})
obsPOST$.subscribe(post => console.log('post',post))

/* PUT: exactamente igual que el POST,3 args*/
const obsPUT$ = ajax.put(url,{id:1,nombre:"Fernando"},{"my-token":"abc123"})
obsPUT$.subscribe(put => console.log('put',put))

/* DELETE: recuerda que en una petición delete no se puede mandar nada por el body,asi que tendrá dos args,como el GET */
const obsDELETE$ = ajax.delete(url,{"other-header":"deleting..."})
obsDELETE$.subscribe(d => console.log('delete',d))

/* TIP:puedo realizar una petición con más dinamismo en las opciones,como el modo, usando ajax({options}) en vez de ajax.method */
ajax({
  url:url,//redundante desde ECMA6
  method:'POST',
  headers:{"header-programatico":"barsa apesta"},
  body:{
    id:2,
    nombre:'Spiderman'
  }
}).subscribe(prog => console.log('prog',prog))





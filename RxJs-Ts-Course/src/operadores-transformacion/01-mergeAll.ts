import { debounceTime, fromEvent, map, mergeAll, Observable, pluck } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-user.interface";
import { GithubUsersResponse } from "../interfaces/github-users.interface";

/* Referencias al DOM */
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');

/* Mutaciones del DOM (appendChild para un elemento,append para varios en secuencia) */
body.append(textInput, orderList);

/* Helpers */
const mostrarUsuarios = (usuarios: GithubUser[]) => {
  // console.log(usuarios);

  /* tuvo que purgar la ordered list(porque??) */
  orderList.innerHTML = '';

  for (const usuario of usuarios) {
    /* creo una li,una img,asigno el src,creo un enlace,le doy un href,le pongo un texto y añado todo.Genial */
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = usuario.avatar_url;
    const anchor = document.createElement('a');
    anchor.href = usuario.html_url;
    anchor.text = 'Ver página';
    anchor.target = '_blank';
    li.append(img);
    li.append(usuario.login + ' ');
    li.append(anchor);
    orderList.append(li);
  }
}

/* Streams de información */
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

/* Bien imaginemos que quiero rescatar el valor de ese input y hacer una petición ajax para ver cuantos repos coinciden con ese término.Puedo apreciar como esto crece desmesuradamente y necesito de mejores formas para transformar la información y aplanarla hasta lo que yo quiero */
/* input$.pipe(
  debounceTime(500),
  map( event => {
    const texto = (event.target as HTMLInputElement)['value']; 
    return ajax.getJSON(
      `https://api.github.com/users/${texto}/repos`
    )
  })
  ).subscribe( resp => {
    resp.subscribe(console.log);
  }); */

/* La solución son los operadores de transformación,los cuales permiten poder transformar el Observable completamente o bien cambiar la emisión para que nosotros podamos unificar los Observables o las emisiones de los mismos para así simplificar el código */
input$.pipe(
  debounceTime(500),
  map<KeyboardEvent, string>(event => (event.target as HTMLInputElement)['value']),
  map<string, Observable<GithubUsersResponse>>(texto => ajax.getJSON(
    `https://api.github.com/search/users?q=${texto}`
  )),
  mergeAll<Observable<GithubUsersResponse>>(), //aún está dentro del pipe
  map<GithubUsersResponse, GithubUser[]>(item => item.items),
).subscribe(mostrarUsuarios);


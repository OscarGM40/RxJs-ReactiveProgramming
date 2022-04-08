
import { debounceTime, fromEvent, map, mergeMap, Observable, pluck, switchMap } from "rxjs";
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

  /* tuvo que purgar la ordered list(porque,para crearla??) */
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

/* el mergeMap me permite pasarle el siguiente Observable */
const url = 'https://httpbin.org/delay/1?arg=';
input$.pipe(
  map<KeyboardEvent, string>((e) => (<HTMLInputElement>e.target)['value']),
  mergeMap<string, Observable<any>>(texto =>
    ajax.getJSON(url + texto)),
)
// .subscribe(console.log);

/* sin embargo no es muy eficiente si ese Observable emite valores 'basura' como por ejemplo realizar muchas peticiones ajax.La solución es el switchMap que actualiza la suscripción interna a ese Observable por la nueva,en vez de dejar todas como el mergeMap.Es un operador fundamental */
input$.pipe(
  map<KeyboardEvent, string>((e) => (<HTMLInputElement>e.target)['value']),
  switchMap<string, Observable<any>>(texto =>
    ajax.getJSON(url + texto)),
).subscribe(console.log);
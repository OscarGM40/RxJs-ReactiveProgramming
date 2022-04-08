
import { fromEvent, map, tap, mergeMap, pluck, catchError, of, switchMap, exhaustMap } from 'rxjs';
import { ajax } from "rxjs/ajax";

/* "email": "eve.holt@reqres.in",
   "password": "cityslicka" */

/* Helper */
const peticionHttpLogin = (userCredentials) => ajax.post('https://reqres.in/api/login?delay=1', userCredentials)
  .pipe(
    pluck('response', 'token'),
    catchError(err => of('error fatal'))
  );


const form = document.createElement('form');
// form.setAttribute('action', 'https://reqres.in/api/login')

const inputEmail = document.createElement('input');
inputEmail.type = 'email';
inputEmail.name = 'email';
inputEmail.placeholder = 'Enter email';
inputEmail.value = 'eve.holt@reqres.in'
inputEmail.style.display = 'block';

const inputPassword = document.createElement('input');
inputPassword.setAttribute('type', 'password');
inputPassword.setAttribute('name', 'password');
inputPassword.setAttribute('placeholder', 'Enter password');
inputPassword.value = 'cityslicka'
inputPassword.style.display = 'block';

const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.innerText = 'Submit';
submitButton.style.cursor = 'pointer';

form.append(
  inputEmail,
  document.createElement('br'),
  inputPassword,
  document.createElement('br'),
  submitButton,
);
document.querySelector('body').appendChild(form);

/* Streams */
const submitForm$ = fromEvent(form, 'submit').pipe(
  tap(event => event.preventDefault()),
  map(event => ({
    email: event.target[0].value,
    password: event.target[1].value
  })),

  /* mergeMap recibe una funcion que regresa un Observable y ajax.post lo es.Y como lo que recibe como arg debo mandarlo como argumento en la derecha puedo acortarlo */
  // mergeMap( user => peticionHttpLogin(user) )
  // mergeMap( peticionHttpLogin )
  /* Sin embargo con mergeMap puedo dar 5 clicks rápidos y realizaré 5 peticiones!.Mala idea usarlo con ajax! */

  // switchMap( peticionHttpLogin )
  /* SwitchMap va a cancelar cualquier otra suscripcion y solo regresa la última */

  /* exhaustMap va a ignorar(ni siquiera las lanzó,como si hizo switchMap) las anteriores suscripciones */
  exhaustMap(peticionHttpLogin));

submitForm$.subscribe(token => { console.log(token) });



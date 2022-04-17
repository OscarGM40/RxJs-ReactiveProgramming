import { catchError, exhaustMap, fromEvent, map, mergeMap, of, pluck, switchMap, tap } from "rxjs";
import { ajax } from "rxjs/ajax";

// helper
const peticionHttpLogin = (userCredentials) => ajax.post('https://reqres.in/api/login?delay=1',userCredentials).pipe(
  pluck('response','token'),
  catchError( err => of('Error.No token',err))
  )


const form = document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitBtn = document.createElement('button');

inputEmail.type = 'email';
inputEmail.placeholder = 'Enter email...';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'Enter placeholder...';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar'
submitBtn.style.cursor = 'pointer'

form.append(inputEmail, inputPass, submitBtn);
document.querySelector('body').append(form)

// streams
const submitForm$ = fromEvent<SubmitEvent>(form, 'submit')
    .pipe(
      tap((event) => event.preventDefault()),
      map( ev => ({
        email: ev.target[0].value,
        password: ev.target[1].value,
      })),
      // mergeMap(peticionHttpLogin) //no es una buena idea usar el mergeMap
      // switchMap(peticionHttpLogin) // el switch cancelará todas.Bien
      exhaustMap(peticionHttpLogin)//pero el exhaust ni siquiera las manda.
      );

submitForm$.pipe(

).subscribe( token => console.log(token))  




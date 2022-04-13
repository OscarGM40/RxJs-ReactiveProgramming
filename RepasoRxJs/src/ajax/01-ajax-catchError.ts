import { catchError, delay, map, of, pluck } from "rxjs";
import { ajax } from 'rxjs/ajax';


const sample$ = (val: string) => of(val).pipe(delay(2000));

sample$('first example')
  .toPromise()
  .then(result => console.log('from Promise', result));


const url = 'https://api.github.com/usersxxx?per_page=5';

// const fetchPromesa = fetch(url);

/* const handleError = (response:Response) => {
  if(!response.ok) throw new Error(response.statusText);
  return response
} 
fetchPromesa
  .then(handleError)
  .then(resp => resp.json())
  .then(console.log)
  .catch( err => console.warn(err)) */

 const users$ =  ajax(url); /*  */

 users$.pipe(
   pluck('response'),
   catchError(err => of(err))
 ).subscribe(console.log)
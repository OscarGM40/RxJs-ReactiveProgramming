import { catchError, forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";



/* el caso de uso más común para forkJoin es realizar peticiones ajax de forma simúltanea.Fijate que se realizarán las tres en un primer momento,y cuando estén las tres realizadas el forkJoin devuelve las tres responses */
const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'oscargm40';

forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`)

}).pipe(
  catchError(err => of(err)))
  .subscribe(console.log);
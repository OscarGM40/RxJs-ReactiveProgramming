import { catchError, forkJoin, of } from "rxjs";
import { ajax } from "rxjs/ajax";

const GITHUB_API_URL = 'https://api.github.com/users';
const GITHUB_USER = 'klerith';

forkJoin({
  usuario: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`,{"header-custom":"custom 01"}),
  repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`,{"header-custom":"custom 01"}).pipe(catchError(err => of(err,'fallo en getUsers'))),
  gists: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`,{"header-custom":"custom 01"}),
}).pipe(
  // catchError(err => of(err)),
).subscribe(console.log)
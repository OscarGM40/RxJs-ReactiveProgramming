import { debounceTime, fromEvent, map, mergeAll, Observable, pluck } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUser, GithubUsers } from "../interfaces/GithubUsers.interface";

const body = document.querySelector('body');
const textInput = document.createElement('input')
const orderedList = document.createElement('ol')

body.append(textInput, orderedList);

const showUsers= (users:GithubUser[]) => {
  // orderedList.innerHTML=""
  for(const user of users){
   const li = document.createElement('li');
   const img = document.createElement('img');
   img.src = user.avatar_url;
   const anchor = document.createElement('a')
   anchor.href = user.html_url;
   anchor.text = 'Ver página...'
   anchor.target = '_blank'

   li.append(img,user.login + " ",anchor);
   orderedList.append(li) 
  }
}

/* Forma UNO: Problemas por no usar flattening operators.*/
/* const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

input$.pipe(
debounceTime(500),
map( (event:KeyboardEvent) => {
  const texto = (event.target as HTMLInputElement).value;
  return ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)
})
).subscribe(resp => {
resp.pipe()
.subscribe(data => console.log(data))
}) */
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

input$.pipe(
  debounceTime(500),
  map<KeyboardEvent, string>(event => (<HTMLInputElement>event.target).value),
  map<string, Observable<GithubUsers>>(texto => ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)),
  mergeAll(),
  map<GithubUsers, GithubUser[]>(item => item.items)
).subscribe(showUsers)
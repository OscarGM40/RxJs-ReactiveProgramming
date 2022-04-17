import { debounceTime, fromEvent, map, mergeAll, mergeMap, Observable, pluck, switchMap } from "rxjs";
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

const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

/* input$.pipe(
  debounceTime(500),
  map<KeyboardEvent, string>(event => (<HTMLInputElement>event.target).value),
  mergeMap<string,Observable<GithubUsers>>( value => ajax.getJSON(`https://api.github.com/search/users?q=${value}`)),
  map<GithubUsers, GithubUser[]>(item => item.items)
).subscribe(showUsers) */

const url = 'https://httpbin.org/delay/1?arg=';
input$.pipe(
  // debounceTime(500),
  map<KeyboardEvent, string>(event => (<HTMLInputElement>event.target).value),
  switchMap( texto => ajax.getJSON(url+texto)) 
).subscribe(console.log)
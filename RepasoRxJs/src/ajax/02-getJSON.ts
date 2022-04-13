import { ajax } from "rxjs/ajax";

const url = 'https://httpbin.org/delay/1';
// const url = 'https://api.github.com/users?per_page=5';

ajax.getJSON(url,{
  "my-type":'texto-mu-complejoh'
}).subscribe(console.log)
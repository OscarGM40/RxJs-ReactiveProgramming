import { startWith } from "rxjs";
import { ajax } from "rxjs/ajax";

const loadingDiv = document.createElement('div');
loadingDiv.classList.add('loading'); // es una clase custom que hizo él
loadingDiv.innerText = `Cargando...`;

const body = document.querySelector('body');

// Stream 
ajax.getJSON('https://reqres.in/api/users/2?delay=3')
  .pipe(
    startWith(true)
  )
  .subscribe(data => {
    if (data === true) {
      body.append(loadingDiv);
    } else {
      loadingDiv.remove();
    }
    console.log(data);
  });

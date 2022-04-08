import { ajax } from 'rxjs/ajax';
import { map, tap, concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';

/**
 * Ejercicio: 
 *  Realizar 2 peticiones HTTP (ajax) una después de otra.
 *  
 *  La primera debe de obtener el personaje de Star Wars:
 *   Luke Skywalker, llamando el endpoint:   /people/1/
 * 
 *  La segunda petición, debe de ser utilizando el objeto
 *  de la petición anterior, y tomar la especie (species),
 *  que es un arreglo de URLs (array), dentro de ese arreglo, 
 *  tomar la primera posición y realizar la llamada a ese URL,
 *  el cual debería de traer información sobre su especie (Human)
 */

// Respuesta esperada:
// Información sobre los humanos en el universo de Star Wars
// Ejemplo de la data esperada
/*
 { name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
*/

// Respuesta esperada con Mayor dificultad
// Retornar el siguiente objeto con la información de ambas peticiones
// Recordando que se disparan una después de la otra, 
// con el URL que viene dentro del arreglo de 'species'

// Tip: investigar sobre la función zip: 
//      Que permite combinar observables en un arreglo de valores
// https://rxjs-dev.firebaseapp.com/api/index/function/zip

// Ejemplo de la data esperada:
/*
    especie: {name: "Human", classification: "mammal", designation: "sentient", average_height: "180", skin_colors: "caucasian, black, asian, hispanic", …}
    personaje: {name: "Luke Skywalker", height: "172", mass: "77", hair_color: "blond", skin_color: "fair", …}
*/


(() => {

  // No tocar la función helper ========================================================
  const SW_API = 'https://swapi.dev/api';
  const getRequest = (url: string) => ajax.getJSON<any>(url);
  // ==================================================================
  // NOTA: lo que quiere Fernando es la respuesta del segundo endpoint,pero empezando por el primero
  // PARTE UNO
  // Realizar el llamado al URL para obtener a Luke Skywalker y a travé de eso realizar la petición definitiva
  getRequest(`${SW_API}/people/1`).pipe(
    // tap(console.log),
    map(response => response.starships[0]),
    // tap(console.log),
    switchMap(url => getRequest(url)))
    .subscribe(console.log)

  // PARTE DOS- Mezclar respuestas con zip y devolverlas como un objeto
  const res1$ = getRequest(`${SW_API}/people/1`)
  const res2$ = res1$.pipe(
    map(response => response.starships[0]),
    mergeMap(url => getRequest(url)));

  zip(res1$, res2$).pipe(
    map(([res1, res2]) => ({ personaje: res1, nave: res2 })))
    .subscribe(console.log);

  // SOLUCION DE FERNANDO
  getRequest(`${SW_API}/people/1`).pipe(
    switchMap(resp=> zip( of(resp), getRequest(resp.starships[0]) ) ),
    map(([res1, res2]) => ({ personaje: res1, nave: res2 })))
    .subscribe(console.log);

  getRequest(`${SW_API}/people/1`).pipe(
    switchMap( resp => zip(of(resp),getRequest(resp.starships[1])) ),
    map( ([res1,res2]) => ({ personaje: res1, nave: res2 })))
    .subscribe(console.log);

  getRequest(`${SW_API}/people/1/`)
    /* trabajando desde aqui */
    .pipe(
      switchMap((personaje) =>
        getRequest(`${SW_API}/species/1/`).pipe(
          map((especie) => ({ especie, personaje }))
        )
      )
    )
    /* fin de la sección a modificar */
    .subscribe(console.log);
    
})();



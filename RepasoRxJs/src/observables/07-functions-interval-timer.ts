import { interval, Observer, timer } from "rxjs";

const observer: Observer<any> = {
  next: val => console.log('next',val),
  error: err => console.error('error',err),
  complete: () => console.log('complete')
}

const hoyEn5 = new Date();//ahora
hoyEn5.setSeconds(hoyEn5.getSeconds()+5); //ahora más 5 segundos

const interval$ = interval(2000)

// const timer$ = timer(2000,1000);
const timer$ = timer(hoyEn5,2000);

console.log('Inicio')
// interval$.subscribe(observer) 
/* REALMENTE LO MÁS IMPORTANTE ES QUE EN EL SUBSCRIBE PUEDO EJECUTAR CUALQUIER LOGICA A INTERVALOS REGULARES Y TRAS UNA CUENTA INICIAL CONCRETA O CON UNA DATE CONCRETA.ASI SI */
timer$.subscribe(x => console.log('hi')) 
console.log('Fin') // <- fijate que interval y timer son asincronos por naturaleza
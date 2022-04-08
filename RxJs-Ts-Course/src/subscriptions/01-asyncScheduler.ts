

/* asyncScheduler no crea un Observable sino una Subscription */
import { asyncScheduler } from 'rxjs';

/* básicamente podré ejecutar estas dos instrucciones  */
// setTimeout(() => { }, 3000);
// setInterval(() => { }, 3000);


const saludar = () => console.log('Hola Mundo');

const saludar2 = nombre => console.log(`Hola ${nombre}`);

asyncScheduler.schedule(saludar2, 2000, 'Juan');

/* para simular al setInterval será schedule(function,delay,initialState)Como condiciones la function no puede ser una arrow function y el stateInitial debe ser ún único argumento*/
const subs = asyncScheduler.schedule(function (state) {
  console.log('state', state);
  this.schedule(state + 1, 1000);
}, 3000, 0); // al de tres segundos emitirá desde el 0 de uno en uno.Fijate que aqui si que puedo definir el avance y el numero inicial,es mucho más potente que el setInterval

asyncScheduler.schedule(() => { subs.unsubscribe(); }, 6000);
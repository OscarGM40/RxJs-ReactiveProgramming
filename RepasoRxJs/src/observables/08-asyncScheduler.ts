import { asyncScheduler } from "rxjs";


const saludar = () => console.log('Hola mundo');
const saludar2 = (nombre: string) => console.log(`Hola ${nombre}`);

/* fijate la similitud con setTimeout al usar asyncScheduler.schedule asi: */
asyncScheduler.schedule(saludar, 2000);
asyncScheduler.schedule(saludar2, 3000, 'Fernando'); //tercer argumento para argumentos de la funcion del primer argumento


/*  si quiero pasar un state no puedo usar una arrow function,tiene que ser una function normal asinta.Fijate que esta forma combina setTimeout + setInterval*/
const subs = asyncScheduler.schedule(function (state) {
  console.log('state', state)
  this.schedule(state + 1, 1500)
}, 3000, 0)

setTimeout(() => subs.unsubscribe(),+'6000')
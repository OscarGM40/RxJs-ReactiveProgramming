/* fromEvent permite crear un Observable sobre un evento(click,scroll,keyup) y sobre un elemento(document,window,un botón) */
import { fromEvent, Observer } from "rxjs";

/* Eventos del DOM(del DOM es como decir del HTML) */
/* IMPORTANTE:en document no viaje el HTML realmente,viaja el DOM */
const src1$ = fromEvent<PointerEvent>(document, 'click'); //escuchar por click sobre todo el documento
const src2$ = fromEvent<KeyboardEvent>(document, 'keyup');

const observer: Observer<any> = {
  next: val => console.log('next:', val),
  error: err => console.warn('error:', err),
  complete: () => console.info('complete')
};

// src1$.subscribe(val => console.log(val.pageX,val.pageY));
/* desde ECMA6 puedo desesctructurar fácilmente lo de arriba */
src1$.subscribe(({ pageX, pageY }) => console.log(pageX, pageY));
src2$.subscribe(val => console.log(val.key));

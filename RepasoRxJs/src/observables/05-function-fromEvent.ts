import { fromEvent, Observer } from "rxjs";


const src1$ = fromEvent<MouseEvent>(document,'click')
const src2$ = fromEvent<KeyboardEvent>(document,'keyup')

const observer: Observer<any> = {
  next: (val) => console.log('next:',val),
  error: err => console.error('Error',err),
  complete: () => console.info('Observer completed')
}

src1$.subscribe( e => console.log(e.clientX,e.clientY,e.x,e.y));
src2$.subscribe( ({key}) => console.log(key));
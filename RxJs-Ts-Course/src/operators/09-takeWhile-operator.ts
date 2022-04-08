import { fromEvent } from 'rxjs';
import { tap, map, takeWhile } from 'rxjs/operators';


const click$ = fromEvent<PointerEvent>(document, 'click')

/* takeWhile(predicate,inclusive?=false) me permite tomar valores mientras el predicate se cumpla.Puedo saber el primer valor que hizo que el predicate no se cumpliera con inclusive*/

type CustomType = {
  x: number;
  y: number;
}
/* veamos como tomar valores hasta que la y sea superior a 150 */
click$.pipe(
  tap<PointerEvent>(),
  map<PointerEvent, CustomType>(({ x, y }) => ({ x, y })),
  // takeWhile( (custom:CustomType) => custom.y <= 150)
  takeWhile((custom: CustomType) => custom.y <= 150, true)
).subscribe({
  next: val => console.log('next', val),
  complete: () => console.log('complete')
})
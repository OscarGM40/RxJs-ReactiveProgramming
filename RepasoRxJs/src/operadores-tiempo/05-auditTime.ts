import { auditTime, defaultIfEmpty, fromEvent, map, of, tap } from "rxjs";


const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
  map( ({x,y}) => ({x,y})),
  tap(val => console.log('tap', val)),
  auditTime(2000),
).subscribe(console.log)

of().pipe(
  defaultIfEmpty('of operatro comes empty')
).subscribe(console.log)



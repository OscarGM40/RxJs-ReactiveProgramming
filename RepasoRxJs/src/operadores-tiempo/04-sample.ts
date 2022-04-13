import { defaultIfEmpty, empty, fromEvent, sample, timer } from "rxjs";

const interval$ = timer(500,500);
const click$ = fromEvent(document,'click')

interval$.pipe(
  sample(click$)
).subscribe(console.log)

const empty$ = empty().pipe(
  defaultIfEmpty('empty Observable esta deprecated y será removido en la v8')
).subscribe(console.log)
import { concat, of, take, timer } from "rxjs";

const interval$ = timer(500, 1000);

concat(
  interval$.pipe(take(5)),
  interval$.pipe(take(3)),
  [11,12,13,14],
  of('finished')
  )
  .subscribe(console.log)
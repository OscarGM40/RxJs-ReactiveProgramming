import { fromEvent, merge } from "rxjs";
import { pluck } from 'rxjs/operators';







/* merge es como concat pero emite todos en paralelo */
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

merge(
  keyup$.pipe(pluck('type')),
  click$.pipe(pluck('type')),
).subscribe(console.log);

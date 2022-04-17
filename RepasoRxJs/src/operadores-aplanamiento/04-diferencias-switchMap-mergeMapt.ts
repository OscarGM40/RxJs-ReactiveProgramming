import { fromEvent, interval, mergeMap, switchMap } from "rxjs";

const click$ = fromEvent(document,'click');
const interval$ = interval(1000);

/* fijate que cada vez que el Observable click$ emita cancelará el interval$ si uso switchMap(reseteando el interval).Con mergeMap terminaré con muchos,ya que simplemente mergea las emisiones.Muchas veces será necesario switchMap para que cancele la suscripciona actual  */
click$.pipe(
  // mergeMap( () => interval$)
  switchMap( () => interval$),
).subscribe(console.log)
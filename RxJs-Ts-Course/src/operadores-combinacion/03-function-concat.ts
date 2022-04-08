import { concat, interval, of, take } from "rxjs";




const interval$ = interval(1000);
/* fijate que es una función,pero igual regresa un Observable,diría que me da igual que sea una funcion que un Observable,asinto.Eso si como argumento puede tomar cualquier iterable y Observable.Concatenará en secuencia sus emisiones */
concat(
  interval$.pipe(take(3)),
  interval$.pipe(take(2)),
  of(111),
  [1, 2, 3, 4]
)
  .subscribe(console.log);
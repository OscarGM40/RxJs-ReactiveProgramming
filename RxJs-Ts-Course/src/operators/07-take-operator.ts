

import { take, tap } from 'rxjs/operators';
import { of } from 'rxjs';


const numeros$ = of(...[1, 2, 3, 4, 5]);
/* take permite tomar un determinado valor de las emisiones del Observable.CAncela la subscription tras ese valor. */
numeros$.pipe(
  tap(console.log),
  take(3)
).subscribe({
  next: val => console.log('next:', val),
  complete: () => console.log('complete')
})

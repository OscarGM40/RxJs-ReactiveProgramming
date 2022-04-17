import { endWith, of, startWith } from "rxjs";


const numbers$ = of(1,2,3)

numbers$.pipe(
  startWith('Starting the of Observable...'),
  endWith('Finished the of Observable...')
).subscribe(console.log)
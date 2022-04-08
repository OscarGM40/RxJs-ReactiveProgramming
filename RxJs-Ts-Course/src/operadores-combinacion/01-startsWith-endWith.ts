import { endWith, of, startWith } from "rxjs";

/* los operadores de combinación startsWith y endWith permiten añadir un valor cualquiera justo antes de empezar a emitir un Observable y justo despues de la última emisión,respectivamente.Da igual que emita sincronamente */

/* yo puedo usar el pipe aqui.Si lo uso aqui cualquier suscripción a numeros usará lo de ese pipe. */
const numeros$ = of(...[1, 2, 3, 4, 5]);

/* pero si uso aqui el pipe es sólo para esta suscripción.Fijate que es importante esto,pues podría usarlo arriba para todos. */
numeros$.pipe(
  endWith('termina la secuencia'),
  startWith('empieza la secuencia'),
).subscribe(console.log);
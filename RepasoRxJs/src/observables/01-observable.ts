import { Observable,Observer } from "rxjs";


const obs$ = new Observable<string>( (subscriber) => {

 subscriber.next('Hola') ;
 subscriber.next(' Mundo') ;

 subscriber.complete(); 
 //ya dejó de escuchar ,no llegan a la Subscription
 subscriber.next('Hola') ;
 subscriber.next(' Mundo') ;
})

obs$.subscribe({
  next: next => console.log('next: ',next),
  error: error => console.warn('Error: ',error),
  complete: () => console.info('Completed')
} as Observer<any>);









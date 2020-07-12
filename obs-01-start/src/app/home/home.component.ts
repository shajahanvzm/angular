import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, observable, Observable, Subscription} from 'rxjs';
import {error} from '@angular/compiler/src/util';
import {filter, map} from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private firsOpsSub : Subscription;
  constructor() { }

  ngOnInit() {
   // this.firsOpsSub =  interval(1000).subscribe(count => {
   //    console.log(count);
   //  });
    //Custom Observable

    const custonObservale = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          count++;
          if (count === 2) {
            observer.complete();
          }
          if (count >= 3 ) {
            observer.error(new Error('Count is Greater than 3'));
          }
        }, 1000);
      });
    this.firsOpsSub = custonObservale.pipe( filter(data => {
      return data > 0;
      }),
      map( (data: number) => {
      return 'Round : ' + (data + 1);
    }))
      .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed !');
    });
  }

  ngOnDestroy() {
    this.firsOpsSub.unsubscribe();
  }

}

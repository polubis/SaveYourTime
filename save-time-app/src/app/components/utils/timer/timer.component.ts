import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from 'moment';
import { Moment } from "moment";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  date = moment().format('DD-MMMM-YYYY');
  time = moment().format('HH:mm');
  second = moment().format('ss');
  dateObservable = interval(1000).pipe(map(value => {
    return moment();
  }));
  subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this.subscription = this.dateObservable.subscribe((moment: Moment) => {
      this.date = moment.format('DD-MMMM-YYYY');
      this.time = moment.format('HH:mm');
      this.second = moment.format('ss');
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, Subject, fromEvent, interval } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() classes = 'flex-center';
  @Input() infinitiveTime: number;
  @Input() values: any[];
  @Input() progressLabelKey: string[];
  @ViewChild('slider') slider: ElementRef;

  numberOfItems: number;
  widthArray: number[] = [];
  selectedItemIndex = 0;
  progressWidth: number = 0;
  progresWidthJump: number = 0;

  onScroll$ = new Subject<boolean>();
  isScrolling: boolean = false;

  scrollSubscription: Subscription;
  isScrollingSubscription: Subscription;
  infinitiveSubscription: Subscription;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.numberOfItems = this.values.length;
    this.isScrollingSubscription = this.onScroll$.subscribe((isScrolling: boolean) => {
      this.isScrolling = isScrolling;
      if (this.infinitiveSubscription.closed) {
        this.setAutoClicking();
      }
    });

    this.setAutoClicking();
  }

  ngAfterViewInit() {
    this.scrollSubscription = fromEvent(this.slider.nativeElement, "scroll").pipe(debounceTime(100))
    .subscribe((e: any) => {
      this.onScroll$.next(false);
    });

    const nodes = this.slider.nativeElement.childNodes;
    const widthArray: number[] = [];
    const nodesKeys = Object.keys(nodes);
    nodesKeys.forEach((key, index) => {
      if (nodes[key].clientWidth) {
        widthArray.push(nodes[key].clientWidth * (index - 1));
      }
    });
    this.widthArray = widthArray;
    this.progressWidth = 100 / this.widthArray.length;
    this.progresWidthJump = this.progressWidth;
    this.cd.detectChanges();
  }

  setAutoClicking() {
    if (this.infinitiveTime) {
      this.infinitiveSubscription = interval(this.infinitiveTime).subscribe(() => {
        this.onClickRightArrow();
      });
    }
  }

  onClickLeftArrow() {
    this.selectedItemIndex = this.selectedItemIndex - 1;
    this.progressWidth = this.progressWidth - this.progresWidthJump;
    this.scrollTo();
  }

  onClickRightArrow() {
    const valueAfterIncrement = this.selectedItemIndex + 1;
    const progressAfterIncrement = this.progressWidth + this.progresWidthJump;
    this.selectedItemIndex = valueAfterIncrement === this.widthArray.length ? 0 : valueAfterIncrement;
    this.progressWidth = progressAfterIncrement > 100 ? this.progresWidthJump: progressAfterIncrement;
    this.scrollTo();
  }

  scrollTo() {
    this.onScroll$.next(true);
    this.slider.nativeElement.scrollLeft = this.widthArray[this.selectedItemIndex];
    this.infinitiveSubscription.unsubscribe();
  }

  onClickProgressMarker(index: number) {
    this.selectedItemIndex = index;
    this.progressWidth = (index + 1) * this.progresWidthJump;
    this.scrollTo();
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
    this.isScrollingSubscription.unsubscribe();
    this.infinitiveSubscription.unsubscribe();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {
  AnimationOptions,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMConfigErrorEvent, BMDestroyEvent, BMEnterFrameEvent, BMRenderFrameErrorEvent,
  BMSegmentStartEvent
} from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  templateUrl: './lottie.component.html',
  styleUrls: ['./lottie.component.css']
})
export class LottieComponent implements OnInit {

  anim: any;
  animationSpeed = 1;
  public lottieConfig: object;
  @Input()
  width = 0;
  @Input()
  height = 0;
  @Input()
  path = '';
  @Input()
  start = false;
  options: AnimationOptions = {
    path: 'assets/lottie/page-not-found-animation.json',
  };

  constructor() {
    const url = `assets/lottie/page-not-found-animation.json`;
    this.lottieConfig = {
      path: url,
      autoplay: true,
      loop: true
    };
  }

  ngOnInit(): void {
    if (this.start) {
      // const url: string = `assets/lottie/${this.path}.json`;
      // console.log(url);
      // this.lottieConfig = {
      //   path: url,
      //   autoplay: true,
      //   loop: true
      // };
    }
  }

  handleAnimation(anim: any): void {
    this.anim = anim;
  }

  stop(): void {
    this.anim.stop();
  }

  animationCreated($event: import('lottie-web').AnimationItem): void {

  }

  configReady(): void {

  }

  dataReady(): void {

  }

  domLoaded(): void {

  }

  complete($event: BMCompleteEvent): void {

  }

  loopComplete($event: BMCompleteLoopEvent): void {

  }

  destroy($event: BMDestroyEvent): void {

  }

  error($event: BMRenderFrameErrorEvent | BMConfigErrorEvent): void {

  }

  segmentStart($event: BMSegmentStartEvent): void {

  }

  enterFrame($event: BMEnterFrameEvent): void {

  }
}

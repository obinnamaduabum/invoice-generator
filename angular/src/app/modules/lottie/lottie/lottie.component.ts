import {Component, Input, OnInit} from '@angular/core';
import {
  AnimationOptions,
  BMCompleteEvent,
  BMCompleteLoopEvent,
  BMConfigErrorEvent, BMDestroyEvent, BMEnterFrameEvent, BMRenderFrameErrorEvent,
  BMSegmentStartEvent
} from "ngx-lottie";

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
  width: number = 0;
  @Input()
  height: number = 0;
  @Input()
  path: string = '';
  @Input()
  start: boolean = false;
  options: AnimationOptions = {
    path: 'assets/lottie/page-not-found-animation.json',
  };

  constructor() {
    const url: string = `assets/lottie/page-not-found-animation.json`;
    console.log(url);
    this.lottieConfig = {
      path: url,
      autoplay: true,
      loop: true
    };
  }

  ngOnInit(): void {
    if(this.start) {
      console.log(this.path);
      // const url: string = `assets/lottie/${this.path}.json`;
      // console.log(url);
      // this.lottieConfig = {
      //   path: url,
      //   autoplay: true,
      //   loop: true
      // };
    }
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  animationCreated($event: import("lottie-web").AnimationItem) {

  }

  configReady() {

  }

  dataReady() {

  }

  domLoaded() {

  }

  complete($event: BMCompleteEvent) {

  }

  loopComplete($event: BMCompleteLoopEvent) {

  }

  destroy($event: BMDestroyEvent) {

  }

  error($event: BMRenderFrameErrorEvent | BMConfigErrorEvent) {

  }

  segmentStart($event: BMSegmentStartEvent) {

  }

  enterFrame($event: BMEnterFrameEvent) {

  }
}

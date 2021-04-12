import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieComponent } from './lottie/lottie.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    LottieComponent
  ],
  imports: [
    CommonModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [LottieComponent]
})
export class MyLottieModule { }

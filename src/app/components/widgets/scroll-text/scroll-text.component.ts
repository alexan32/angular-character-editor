import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-scroll-text',
  standalone: true,
  imports: [],
  templateUrl: './scroll-text.component.html',
  styleUrl: './scroll-text.component.css'
})
export class ScrollTextComponent implements AfterViewInit{

  @ViewChild('outer') outerRef: ElementRef;
  @ViewChild('inner') innerRef: ElementRef;
  inner: HTMLElement;
  outer: HTMLElement;

  constructor(){}

  ngAfterViewInit(){
    this.inner = this.innerRef.nativeElement;
    this.outer = this.outerRef.nativeElement;

    this.inner.addEventListener("mouseover", ()=>{this.handleChange()});
  }

  _text: string = "";
  @Input() set text(text:string){
    this._text = text;
  }

  @Input() animationTime:number = 4000;

  animating:boolean = false;

  handleChange(){
    if(this.inner.offsetWidth < this.outer.offsetWidth){
      return;
    }
    console.log(this.animating);
    if(!this.animating){
      this.animating = true;
      let animation = this.inner.animate([
        { transform: 'translate(0, 0)' },
        { 
          transform: `translate(calc(${this.outer.offsetWidth}px - 100%), 0)`,
          offset: 0.50 
        },
        { 
          transform: `translate(calc(${this.outer.offsetWidth}px - 100%), 0)`,
          offset: 0.75 
        },
        { 
          transform: 'translate(0, 0)',
          offset: 1.0
        },
      ], {
        duration: this.animationTime,
        iterations: 1 
      });
      animation.onfinish = ()=>{
        this.animating = false;
      }

    }
  }

}

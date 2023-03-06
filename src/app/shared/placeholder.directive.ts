import { Directive, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public viewContainerRef :ViewContainerRef) { }

}

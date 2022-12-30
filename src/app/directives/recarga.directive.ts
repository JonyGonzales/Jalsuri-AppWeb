import { ViewContainerRef } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appRecarga]'
})
export class RecargaDirective {

  @Input() appRecarga : number;

  constructor( private templateRef: TemplateRef<any>,
               private viewContainerRef:ViewContainerRef) 
  {
    this.viewContainerRef.createEmbeddedView(templateRef)
   }

   ngOnchanges(changes: SimpleChanges):void{
    if(changes['appRecarga']){
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }
   }

}

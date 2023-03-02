import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  title = 'project';

  loadedFeature = 'recipe'


  ngOnChanges(changes: SimpleChanges){
    console.log(`AppComponent on change => ${changes}`)
  }

  onNavigate(feature:string){
   this.loadedFeature = feature;
  }
}

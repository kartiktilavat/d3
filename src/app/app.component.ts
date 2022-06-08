import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'd3';
  public navLike: Array<{
    name: string,
    path: string
  }> = [{
    name: 'Bar chart',
    path: '/bar'
  },
    {
      name: 'Pie chart',
      path: '/pie'
    },
    {
      name: "scatter-plot chart",
      path: '/scatter'
    }
  ]
}

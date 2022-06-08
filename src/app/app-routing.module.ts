import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
const routes: Routes = [
  {
    path: 'bar',
    component: BarComponent
  },
  {
    path: 'pie',
    component: PieComponent
  },
  {
    path: 'scatter',
    component: ScatterPlotComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import {IDataInterface} from "../interface/chart.interface";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public chartData: IDataInterface[] = [
    {"framework": "Vue", "stars": 166443, "released": "2014"},
    {"framework": "React", "stars": 150793, "released": "2013"},
    {"framework": "Angular", "stars": 62342, "released": "2016"},
    {"framework": "Backbone", "stars": 27647, "released": "2010"},
    {"framework": "Ember", "stars": 21471, "released": "2011"},
  ]
  constructor() { }

  shuffle() {
    let currentIndex = this.chartData.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.chartData[currentIndex], this.chartData[randomIndex]] = [
        this.chartData[randomIndex], this.chartData[currentIndex]];
    }
    return this.chartData;
  }
}

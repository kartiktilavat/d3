import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {DataService} from '../service/data.service';
import {IDataInterface} from "../interface/chart.interface";
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') public chartContainer!: ElementRef;
  public data: IDataInterface[] = this.dataService.chartData;
  public margin = { top: 20, right: 20, bottom: 30, left: 40 };
  constructor(
    readonly dataService : DataService
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map((d: IDataInterface) => d.framework));

    // @ts-ignore
    const y = d3.scaleLinear().range(<any[]>['green', 'blue']).rangeRound([contentHeight, 0]).domain([0, d3.max(data, d => d.stars)]);
    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('framework');

    // @ts-ignore
    g.selectAll('.bar').data(data).enter().append('rect').attr('class', 'bar').attr('x', d => x(d.framework)).attr('y', d => y(d.stars)).attr('width', x.bandwidth()).attr('height', d => contentHeight - y(d.stars));
  }

  public updateChart(): void {
    this.data = this.dataService.shuffle();
    this.createChart();
  }
}

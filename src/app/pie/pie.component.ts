import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {
  @ViewChild("containerPieChart") element!: ElementRef;
  private host!: d3.Selection<any, any, any, any>;
  private svg!: d3.Selection<any, any, any, any>;
  private width!: number;
  private height!: number;
  private radius!: number;
  private htmlElement!: HTMLElement;
  private pieData = this.dataService.chartData
  constructor(
    readonly dataService : DataService
  ) { }

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.htmlElement);
    this.setup();
    this.buildSVG();
    this.buildPie();
  }

  private setup(): void {
    this.width = 250;
    this.height = 250;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
  }

  private buildPie(): void {
    let pie = d3.pie();
    let value = this.pieData.map((datum) => parseInt(String(datum.released)));
    let arcSelection = this.svg.selectAll(".arc")
      .data(pie(value))
      .enter()
      .append("g")
      .attr("class", "arc");

    this.populatePie(arcSelection);
  }
  private populatePie(arcSelection: any): void {
    let outerRadius = this.radius - 10;
    let pieColor = d3.scaleOrdinal(d3.schemeCategory10);
    let arc = d3.arc().innerRadius(0).outerRadius(outerRadius);
    arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum: any, index: number) => {
        return pieColor(`${index}`);
      });

    // @ts-ignore
    arcSelection.append("text").attr("transform", (datum: any) => {datum.innerRadius = 0;datum.outerRadius = outerRadius;return "translate(" + arc.centroid(datum) + ")";}).text((datum, index) => this.pieData[index].framework)
      .style("text-anchor", "middle");
  }


  updateChart() {
    this.pieData = this.dataService.shuffle();
    this.buildPie();
  }
}

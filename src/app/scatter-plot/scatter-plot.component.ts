import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.scss']
})
export class ScatterPlotComponent implements OnInit {
  private data: any = [
    {
      Sepal_Length: 5.1,
      Sepal_Width: 3.5,
      Petal_Length: 1.4,
      Petal_Width: 0.2,
      Species: "Ember"
    },
    {
      Sepal_Length: 4.9,
      Sepal_Width: 3,
      Petal_Length: 1.4,
      Petal_Width: 0.2,
      Species: "Ember"
    },
    {
      Sepal_Length: 4.7,
      Sepal_Width: 3.2,
      Petal_Length: 1.3,
      Petal_Width: 0.2,
      Species: "Backbone"
    },
    {
      Sepal_Length: 4.6,
      Sepal_Width: 3.1,
      Petal_Length: 1.5,
      Petal_Width: 0.2,
      Species: "Backbone"
    },
    {
      Sepal_Length: 5,
      Sepal_Width: 3.6,
      Petal_Length: 1.4,
      Petal_Width: 0.2,
      Species: "Angular"
    },
    {
      Sepal_Length: 5.4,
      Sepal_Width: 3.9,
      Petal_Length: 1.7,
      Petal_Width: 0.4,
      Species: "Angular"
    },
    {
      Sepal_Length: 4.6,
      Sepal_Width: 3.4,
      Petal_Length: 1.4,
      Petal_Width: 0.3,
      Species: "React"
    },
    {
      Sepal_Length: 5,
      Sepal_Width: 3.4,
      Petal_Length: 1.5,
      Petal_Width: 0.2,
      Species: "React"
    },
    {
      Sepal_Length: 4.4,
      Sepal_Width: 2.9,
      Petal_Length: 1.4,
      Petal_Width: 0.2,
      Species: "Vue"
    },
    {
      Sepal_Length: 4.9,
      Sepal_Width: 3.1,
      Petal_Length: 1.5,
      Petal_Width: 0.1,
      Species: "Vue"
    }
    ];
  private radiusCircle: number = 5;
  private svg: any;
  private margin = { top: 10, right: 30, bottom: 30, left: 60 };
  private width = 460 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
  private groups = [
    { name: "Vue", color: "#665faacc" },
    { name: "React", color: "#dd8050c4" },
    { name: "Angular", color: "#63adfeb3" },
    { name: "Backbone", color: "#63adfeb3" },
    { name: "Ember", color: "#63adfeb3" }
  ];
  constructor(
      readonly dataService: DataService
  ) { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg =d3
        .select("figure#scatter")
        .append("svg")
        .attr(
            "viewBox",
            `0 0 ${this.width + this.margin.left + this.margin.right} ${this
                .height +
            this.margin.top +
            this.margin.bottom}`
        )
        .append("g")
        .attr(
            "transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")"
        );
  }

  private drawPlot(): void {
    // Add X axis
    const x = d3
        .scaleLinear()
        .domain([4, 8])
        .range([0, this.width]);
    this.svg
        .append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y =d3
        .scaleLinear()
        .domain([0, 9])
        .range([this.height, 0]);
    this.svg.append("g").call(d3.axisLeft(y));

    //colors
    const domainScale: Array<string>  = [];
    const rangeColor: Array<unknown> = [];
    this.groups.forEach(element => {
      domainScale.push(element.name);
      rangeColor.push(element.color);
    });

    const color =d3
        .scaleOrdinal()
        .domain(domainScale)
        .range(rangeColor);

    // Add dots
    const dots = this.svg.append("g");
    dots
        .selectAll("dot")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", function(d: { Sepal_Length: d3.NumberValue; }) {
          return x(d.Sepal_Length);
        })
        .attr("cy", function(d: { Petal_Length: d3.NumberValue; }) {
          return y(d.Petal_Length);
        })
        .attr("r", this.radiusCircle)
        .style("fill", function(d: { Species: string; }) {
          return color(d.Species);
        });
  }

  updateChart() {
    this.data = this.dataService.shuffle()
  }
}

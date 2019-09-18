import { Component, Input, OnInit } from "@angular/core";
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html"
})
export class GraphComponent implements OnInit {
  @Input() public chartData: ChartDataSets[] = [{ data: [] }];
  @Input() public barChartLabels: Label[] = [];
  @Input() public titulo: string;
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontFamily: "Montserrat Alternates"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontFamily: "Montserrat Alternates"
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end"
      }
    }
  };
  public lineChartColors = [
    {
      backgroundColor: "#4c56ba"
    }
  ];
  dymWidth: string = "48%";
  icon = faExpandArrowsAlt;
  buttonTitle: string;

  constructor() {}

  ngOnInit() {}

  resize() {
    if (this.dymWidth === "100%") {
      this.dymWidth = "48%";
      this.icon = faExpandArrowsAlt;
      this.buttonTitle = "Expandir";
    } else {
      this.dymWidth = "100%";
      this.icon = faCompressArrowsAlt;
      this.buttonTitle = "Contrair";
    }
    this.barChartOptions = { ...this.barChartOptions };
  }
}

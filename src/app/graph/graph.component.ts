import { Component, Input, OnInit } from "@angular/core";
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"]
})
export class GraphComponent implements OnInit {
  @Input() public chartData: ChartDataSets[] = [];
  @Input() public barChartLabels: Label[] = [];
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
  dymWidth: string = "47%";
  icon = faExpandArrowsAlt;
  buttonTitle: string;

  constructor() {}

  ngOnInit() {}

  resize() {
    if (this.dymWidth === "100%") {
      this.dymWidth = "47%";
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

import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { Question } from 'src/app/Models/Question.model';
import { QuestionService } from 'src/app/Services/question.service';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  data = [{
    "Day": "Sunday",
    "sum": 0
  },
  {
    "Day": "Monday",
    "sum": 0
  },
  {
    "Day": "Tuesday",
    "sum": 0
  },
  {
    "Day": "Wednesday",
    "sum": 0
  },
  {
    "Day": "Thursday",
    "sum": 0
  },
  {
    "Day": "Friday",
    "sum": 0
  },
  {
    "Day": "Saturday",
    "sum": 0
  },
  ]
  question: Question[];
  hoursarr: number[] = [];
  chart: am4charts.XYChart;
  piechart: am4charts.PieChart;




  constructor(private service: QuestionService) { }

  ngOnInit(): void {
    this.service.questionSubject.subscribe(data => {
      console.log(data);
      if (data) {
        this.question = data
        this.chartinfo();
        am4core.useTheme(am4themes_animated);
        this.chart = am4core.create("chartdiv", am4charts.XYChart);
        this.chart.data = this.data;
        this.createAxis();
        this.createAllSeries();
        this.chart.legend = new am4charts.Legend();
        this.piechart = am4core.create("piechartdiv", am4charts.PieChart);
        this.piechart.data = this.data;
        this.createpiechart();
      }
    });


    // Add data

  }
  createpiechart() {
    let pieSeries = this.piechart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "sum";
    pieSeries.dataFields.category = "Day";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
  }
  createAxis() {

    let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Day";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;
  }
  createSeries(field, name) {
    var tooltiphtml = `<center><strong>{categoryX}</strong></center>
    <table>
    <tr>
    <th align="left">{name}</th>
    <td>{valueY}</a>
    </tr>
    </table>`;

    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "Day";
    series.sequencedInterpolation = true;

    series.stacked = true;

    series.columns.template.width = am4core.percent(60);
    // series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    series.tooltipHTML = tooltiphtml;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }
  createAllSeries() {
    this.hoursarr.forEach(h => {
      this.createSeries(h.toString(), `${h}:00`);
    });
  }
  chartinfo() {
    this.question.forEach(q => {
      let date = new Date(q.creationDate);
      let time = date.getHours();
      if (!this.hoursarr.includes(time)) {
        this.hoursarr.push(time);
      }
      switch (date.getDay()) {
        case 0:
          if (this.data[0][time]) {
            this.data[0][time] += 1;
          }
          else {
            this.data[0][time] = 1;
          }
          this.data[0].sum++;
          break;
        case 1:
          if (this.data[1][time]) {
            this.data[1][time] += 1;
          }
          else {
            this.data[1][time] = 1;
          }
          this.data[1].sum++;
          break;
        case 2:
          if (this.data[2][time]) {
            this.data[2][time] += 1;
          }
          else {
            this.data[2][time] = 1;
          }
          this.data[2].sum++;
          break;
        case 3:
          if (this.data[3][time]) {
            this.data[3][time] += 1;
          }
          else {
            this.data[3][time] = 1;
          }
          this.data[3].sum++;
          break;
        case 4:
          if (this.data[4][time]) {
            this.data[4][time] += 1;
          }
          else {
            this.data[4][time] = 1;
          }
          this.data[4].sum++;
          break;
        case 5:
          if (this.data[5][time]) {
            this.data[5][time] += 1;
          }
          else {
            this.data[5][time] = 1;
          }
          this.data[5].sum++;
          break;
        case 6:
          if (this.data[6][time]) {
            this.data[6][time] += 1;
          }
          else {
            this.data[6][time] = 1;
          }
          this.data[6].sum++;
          break;

        default:
          break;
      }
    });
  }

}







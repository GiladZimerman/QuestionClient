import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { ChartsService } from 'src/app/Services/charts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-xychart',
  templateUrl: './xychart.component.html',
  styleUrls: ['./xychart.component.css']
})
export class XychartComponent implements OnInit, OnDestroy {
  chartdata = []
  hoursarr = []
  private subs: Subscription[] = [];
  chart: am4charts.XYChart;
  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {
    this.subs.push(this.chartService.houressubject.subscribe(data => {
      if (data) {
        this.hoursarr = data
      }
    }));
    this.subs.push(this.chartService.datasubject.subscribe(data => {
      if (data) {
        this.chartdata = data;
        this.chart = am4core.create("chartdiv", am4charts.XYChart);
        this.chart.data = data;
        this.createAxis();
        this.createAllSeries();
        this.chart.legend = new am4charts.Legend();
      }
    }))


  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
    this.chart.dispose();
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
    // var tooltiphtml = `<center><strong>{categoryX}</strong></center>
    // <table>
    // <tr>
    // <th align="left">{name}</th>
    // <td>{valueY}</a>
    // </tr>
    // </table>`;
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "Day";
    series.sequencedInterpolation = true;

    series.stacked = true;

    series.columns.template.width = am4core.percent(60);
    series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
    // series.tooltipHTML = tooltiphtml;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }


  createAllSeries() {
    debugger
    this.hoursarr.forEach(h => {
      this.createSeries(h.toString(), `${h}:00`);
    });

  }

}

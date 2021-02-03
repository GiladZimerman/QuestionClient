import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  chartdata = [];
  hoursarr = [];
  showPopular: boolean;
  private subs: Subscription[] = [];
  popularHoures: any[];
  chart: am4charts.XYChart;
  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {
    this.xyChartInit();
  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
    this.chart.dispose();
  }

  xyChartInit() {
    this.subs.push(this.chartService.houressubject.subscribe(data => {
      if (data) {
        this.hoursarr = data
      }
    }));
    this.subs.push(this.chartService.datasubject.subscribe(data => {
      if (data) {
        this.chartdata = data;
        this.popularHoures = this.chartService.getPopularHoures();
        this.makeChart(data);
      }
    }))
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
    let series = this.chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueY = field;
    series.dataFields.categoryX = "Day";
    series.sequencedInterpolation = true;

    series.stacked = true;

    series.columns.template.width = am4core.percent(60);
    var tooltiphtml = `<div style="display:flex;flex-direction:column; width:150px;">
    <div style="align-self:center;">
    {categoryX}
    </div>
    <div style="display:flex;justify-content:space-between;">
    <div>{name}</div>
    <div>{valueY} Questions</div>
    </div>
    </div>
    `;
    series.columns.template.tooltipHTML = tooltiphtml;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{valueY}";
    labelBullet.locationY = 0.5;
    labelBullet.label.hideOversized = true;

    return series;
  }

  makeChart(data: any[]) {
    if (this.chart)
      this.chart.dispose();
    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chart.data = data.filter(d => d["sum"] > 0);
    this.createAxis();
    if (this.showPopular) {
      this.createAllSeries(this.popularHoures);
    }
    else
      this.createAllSeries(this.hoursarr);
    this.chart.legend = new am4charts.Legend();
  }


  createAllSeries(series: any[]) {
    series.forEach(h => {
      typeof (h) == "number" ? this.createSeries(h.toString(), `${h}:00`) : this.createSeries(h, h);
    });

  }

  onShowPopular() {
    this.makeChart(this.chartdata);
  }


}

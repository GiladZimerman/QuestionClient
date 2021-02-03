import { Component, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { ChartsService } from 'src/app/Services/charts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, OnDestroy {
  piechart: am4charts.PieChart;
  chartdata = [];
  private subs: Subscription[] = [];
  constructor(private chartService: ChartsService) { }

  ngOnInit(): void {
    this.subs.push(this.chartService.datasubject.subscribe(data => {
      if (data) {
        this.piechart = am4core.create("piechartdiv", am4charts.PieChart);
        this.piechart.data = data.filter(d => d["sum"] > 0);
        this.createpiechart();
      }
    }))
  }

  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
    this.piechart.dispose();
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

}

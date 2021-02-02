import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartsService } from 'src/app/Services/charts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  date = null;
  constructor(private chartService: ChartsService) { }

  onChange(res: Date[]): void {
    this.chartService.questionDateRange(res);
  }


  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);

  }

}







import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartsService } from 'src/app/Services/charts.service';
import { INode } from 'src/app/Models/INode.model';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  date = null;
  treedata: INode[];
  constructor(private chartService: ChartsService, private nodeService: NodeService) { }

  onChange(res: Date[]): void {
    this.chartService.questionDateRange(res);
  }


  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.nodeService.nodeSubject.subscribe(data => {
      if (data) {
        this.treedata = data;
      }
    })
  }

}







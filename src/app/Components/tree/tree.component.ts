import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode } from 'src/app/Models/INode.model';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnDestroy {

  @Input() treeData: INode[];
  treeDataDuplicate: INode[]
  treenodesDuplicate: INode[]
  selectAll: boolean;
  onClickselectAll: boolean = false;
  subs: Subscription[] = [];
  serach: string;


  constructor(private nodeService: NodeService) { }


  ngOnInit(): void {
    this.subs.push(this.nodeService.nodeSubject.subscribe(data => {
      if (data) {
        this.treeData = data;
        this.treeDataDuplicate = data;
      }
    }))
  }


  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }


  onNodeCheck(node: INode) {
    let flag = true;
    this.treeData.forEach(item => {
      if (item.isChecked == false) {
        flag = false;
      }
    });
    this.selectAll = flag;
  }


  NodeCheck(title: string) {
    this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked ? this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked = false
      : this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked = true;
    this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked ? this.treeData[this.treeData.findIndex(c => c.title == title)].nodes.
      forEach(item => {
        item.isChecked = true
      }) :
      this.treeData[this.treeData.findIndex(c => c.title == title)].nodes.forEach(item => {
        item.isChecked = false;
      })
  }


  selectAllCheck() {
    this.onClickselectAll = this.selectAll
    this.treeData.forEach(item => {
      item.isChecked = this.onClickselectAll;
    })
    // this.selectAll ? this.treeData.forEach(item => {
    //   item.isChecked = false;
    //   // this.NodeCheck(item.title);
    // }) :
    //   this.treeData.forEach(item => {
    //     item.isChecked = true;
    //     //this.NodeCheck(item.title);
    //   })
  }

  onSerach() {

  }
}


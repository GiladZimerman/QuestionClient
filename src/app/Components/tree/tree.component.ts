import { Component, Input, OnInit } from '@angular/core';
import { INode } from 'src/app/Models/INode.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input()
  get data(): INode[] { return this._data; }
  set data(value: INode[]) {
    this._data = value;
    this.addSelectall(value)
  }
  private _data;
  selectAll: boolean;
  treeData: INode = { title: "Select all", nodes: [], isChecked: false, isShown: true };
  onClickselectAll: boolean = false;
  serach: string;


  constructor() { }


  ngOnInit(): void { }

  addSelectall(value: INode[]) {
    if (value) {
      this.treeData.nodes = value;
    }
  }


  onSearch() {
    this.data.forEach(item => {
      if (item.nodes)
        this.childSearch(item);
    });
    this.isCheckedAfterSearch(this.treeData);
  }


  childSearch(child: INode) {
    if (child.nodes) {
      child.nodes.forEach(item => {
        this.childSearch(item);
      })
      this.allChildShowen(child);
      this.isCheckedAfterSearch(child);
    }
    else {
      if (!child.title.toLowerCase().includes(this.serach.toLowerCase())) {
        child.isShown = false;
        child.isChecked = false;
      }
      else {
        child.isShown = true;
      }
    }
  }


  allChildShowen(node: INode) {
    let flag = false;
    node.nodes.forEach(item => {
      if (item.isShown == true)
        flag = true;
    })
    node.isShown = flag;
  }


  isCheckedAfterSearch(node: INode) {
    let counter = 0;
    let interCounter = 0;
    let shownCounter = 0;
    if (node.nodes) {
      node.nodes.forEach(item => {
        if (item.isShown == true) {
          shownCounter++;
          if (item.isChecked)
            counter++;
          else if (item.indeterminate == true)
            interCounter++;
        }
      });
    }
    if (interCounter > 0) {
      node.indeterminate = true;
      node.isChecked = false;
    }
    else if (counter < shownCounter && counter > 0) {
      node.indeterminate = true;
      node.isChecked = false;
    }
    else if (counter == shownCounter && counter > 0) {
      node.indeterminate = false;
      node.isChecked = true;
    }
    else {
      node.indeterminate = false;
      node.isChecked = false;
    }
  }
}


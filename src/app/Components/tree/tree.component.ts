import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode } from 'src/app/Models/INode.model';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit, OnDestroy {

  treeData: INode[];
  selectAll: boolean;
  subs: Subscription[] = [];

  constructor(private nodeService: NodeService) { }


  ngOnInit(): void {
    this.subs.push(this.nodeService.nodeSubject.subscribe(data => {
      if (data) {
        this.treeData = data
      }
    }))
  }


  ngOnDestroy() {
    this.subs.forEach(item => {
      item.unsubscribe();
    });
  }


  onChildNodeCheck(title: string) {
    if (this.treeData.find(n => n.title == title)) {
      this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked ? this.treeData[this.treeData
        .findIndex(c => c.title == title)].isChecked = true : this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked = false;
      this.nodeCheck(title);
    }
    else {
      this.treeData.forEach(n => {
        if (n.nodes.find(c => c.title == title)) {
          n.nodes[n.nodes.findIndex(i => i.title == title)].isChecked ? n.nodes[n.nodes.findIndex(i => i.title == title)].isChecked = false
            : n.nodes[n.nodes.findIndex(i => i.title == title)].isChecked = true;
        }
        n.isChecked = this.childCheck(n.nodes);

      });
    }
  }


  childCheck(child: INode[]) {
    let flag = true;
    child.forEach(item => {
      if (!item.isChecked)
        flag = false;
    });
    return flag;
  }


  nodeCheck(title: string) {
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
    this.selectAll ? this.treeData.forEach(item => {
      item.isChecked = false;
      this.nodeCheck(item.title);
    }) :
      this.treeData.forEach(item => {
        item.isChecked = true;
        this.nodeCheck(item.title);
      })

  }

  // onItemChecked(title:string){
  //   if (this.treeData.find(n => n.title == title)) {
  //     this.onChildNodeCheck(title);
  //   }
  //   else{

  //   }
  // }

}


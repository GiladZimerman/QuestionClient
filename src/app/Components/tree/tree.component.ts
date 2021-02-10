import { Component, OnInit } from '@angular/core';
import { INode } from 'src/app/Models/INode.model';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  constructor(private nodeService: NodeService) { }

  treeData: INode[];

  ngOnInit(): void {
    this.nodeService.nodeSubject.subscribe(data => {
      if (data) {
        this.treeData = data
      }
    })
  }


  onNodeCheck(title: string) {
    if (this.treeData.find(n => n.title == title)) {
      this.treeData[this.treeData.findIndex(c => c.title == title)].isChecked = true;
    }
    else {
      this.treeData.forEach(n => {
        if (n.nodes.find(c => c.title == title)) {
          n.nodes[n.nodes.findIndex(i => i.title == title)].isChecked = true
          if (this.childCheck(n.nodes))
            n.isChecked = true;
        }


      });
    }
  }

  childCheck(child: INode[]) {
    let flag = true;
    child.forEach(item => {
      if (!item.isChecked)
        return flag = false;
    });
    return flag;
  }
}

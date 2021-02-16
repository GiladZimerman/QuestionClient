import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INode } from 'src/app/Models/INode.model';
import { NodeService } from 'src/app/Services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() title: string;
  @Input() value: INode;
  @Output() itemClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  collapse: boolean;

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
  }


  onItemClicked(value: boolean) {
    let flag = true;
    if (this.value.nodes) {
      this.value.nodes.forEach(item => {
        if (item.isChecked == false)
          flag = item.isChecked;
      });
      this.value.isChecked = flag;
    }
  }


  childcheck(node: INode) {
    if (node.nodes) {
      node.nodes.forEach(item => {
        this.childcheck(item);
      })
    }
    else {
      node.isChecked = this.value.isChecked;
    }
    this.itemClicked.emit(node.isChecked);
  }


  onCollapseClick() {
    this.collapse ? this.collapse = false : this.collapse = true;
  }


}

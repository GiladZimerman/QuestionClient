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
  @Input()
  get serachValue(): string { return this._serachValue; }
  set serachValue(value: string) {
    this._serachValue = value;
    if (this.value.nodes) {
      this.childSerach(value);
    }
    else if (this.childrenDuplicate) {
      this.emptySerach();
    }
  }
  private _serachValue;

  @Input()
  get selectAll(): boolean { return this._selectAll; }
  set selectAll(flag: boolean) {
    this._selectAll = flag;
    this.value.isChecked = this._selectAll;
    this.childCheck(this.value);

  }
  private _selectAll;

  @Output() itemClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  collapse: boolean;
  @Output() hide: boolean = false;
  childrenDuplicate: INode[];


  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.childrenDuplicate = this.value.nodes;
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


  childCheck(node: INode) {
    if (node.nodes) {
      node.nodes.forEach(item => {
        this.childCheck(item);
      })
    }
    else {
      node.isChecked = this.value.isChecked;
    }
    this.itemClicked.emit(node.isChecked);
  }

  selectAllCheck(node: INode) {
    if (node.nodes) {
      node.nodes.forEach(item => {
        this.selectAllCheck(item);
      })
    }
    else {
      node.isChecked = this.value.isChecked;
    }
  }


  onCollapseClick() {
    this.collapse ? this.collapse = false : this.collapse = true;
  }

  emptySerach() {
    this.value.nodes = this.childrenDuplicate;
  }


  childSerach(value: string) {
    this.value.nodes = this.childrenDuplicate.filter(c => c.title.toLowerCase().includes(value?.toLowerCase()));
    if (this.value.nodes.length == 0) {
      this.hide = true;
    }
    else {
      this.hide = false;
    }
  }
}

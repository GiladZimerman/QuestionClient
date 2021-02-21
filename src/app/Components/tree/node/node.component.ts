import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { INode } from 'src/app/Models/INode.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  @Input() title: string;
  @Input() value: INode;
  @Input()
  get showValue(): boolean { return this._showValue; }
  set showValue(value: boolean) {
    this._showValue = value;
    if (this.value.nodes) {
      this.onItemClicked(this.value.isChecked);
    }
  }
  private _showValue;

  @Output() itemClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  collapse: boolean;




  constructor() { }

  ngOnInit(): void {
  }


  onItemClicked(value: boolean) {
    let counter = 0;
    let interCounter = 0;
    let shownCounter = 0;
    if (this.value.nodes) {
      this.value.nodes.forEach(item => {
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
      this.value.indeterminate = true;
      this.value.isChecked = false;
    }
    else if (counter < shownCounter && counter > 0) {
      this.value.indeterminate = true;
      this.value.isChecked = false;
    }
    else if (counter == shownCounter && counter > 0) {
      this.value.indeterminate = false;
      this.value.isChecked = true;
    }
    else {
      this.value.indeterminate = false;
      this.value.isChecked = false;
    }
    this.itemClicked.emit(this.value.isChecked);
  }



  childCheck(node: INode) {
    if (node.nodes) {
      node.nodes.forEach(item => {
        if (this.value.isChecked != null && item.isShown == true)
          item.isChecked = this.value.isChecked
        this.childCheck(item);
      })
    }
    this.value.indeterminate = false;
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

  onLabelClicked() {
    this.value.isChecked ? this.value.isChecked = false : this.value.isChecked = true;
    this.childCheck(this.value);
  }

}

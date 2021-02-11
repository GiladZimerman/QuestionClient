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
  @Input() nodes: INode[];
  @Input() ischeck: boolean;
  @Output() itemclicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
  }


  onItemClicked(title: string) {
    this.itemclicked.emit(title);
  }



}

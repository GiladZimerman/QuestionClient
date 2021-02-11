import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INode } from '../Models/INode.model';
import { IQuestion } from '../Models/IQuestion.model';
import { QuestionService } from './question.service';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  questions: IQuestion[];
  nodes: INode[] = [];
  nodeSubject: BehaviorSubject<INode[]> = new BehaviorSubject<INode[]>(undefined)
  constructor(private questionService: QuestionService) {
    this.questionService.questionSubject.subscribe(data => {
      if (data) {
        this.questions = data;
        this.treeDataGen();
        this.nodeSubject.next(this.nodes);
      }
    })
  }


  treeDataGen() {
    const options = { month: 'long' };
    this.questions.forEach(q => {
      let month = new Date(q.creationDate).toLocaleString('en-US', options);
      if (!this.nodes.find(c => c.title == month)) {
        this.nodes.push({ title: month, nodes: [{ title: q.name, nodes: null, isChecked: false, isLeaf: true }], isChecked: false, isLeaf: false });
      }
      else {
        this.nodes[this.nodes.findIndex(c => c.title == month)].nodes.push({ title: q.name, nodes: null, isChecked: false, isLeaf: true });
      }
    });
    this.nodeSubject.next(this.nodes);
  }

  onCheckNode(title: string, isLeaf: boolean) {
    if (isLeaf) {
      this.nodes.forEach(item => {
        if (item.nodes.find(c => c.title == title)) {
          if (item.nodes[item.nodes.findIndex(i => i.title == title)].isChecked == true) {
            item.nodes[item.nodes.findIndex(i => i.title == title)].isChecked = false
          }
          else {
            item.nodes[item.nodes.findIndex(i => i.title == title)].isChecked = true;
            if (this.allLeafCheck(item.nodes)) {
              item.isChecked = true;
            }
            else {
              item.isChecked = false;
            }
          }
        }
      })
    }
    else {
      this.nodes[this.nodes.findIndex(n => n.title == title)].isChecked ? this.nodes[this.nodes.findIndex(n => n.title == title)].isChecked = false
        : this.nodes[this.nodes.findIndex(n => n.title == title)].isChecked = true;
    }

  }


  allLeafCheck(nodes: INode[]) {
    let flag = true
    nodes.forEach(item => {
      if (!item.isChecked)
        flag = false
    })
    return flag;
  }

  clearTreeData() {
    this.nodes = [];
    this.nodeSubject.next(this.nodes);
  }
}


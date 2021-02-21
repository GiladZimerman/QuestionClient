export interface INode {
  title: string;
  nodes: INode[];
  isChecked: boolean;
  isShown: boolean;
  checked?: boolean;
  indeterminate?: boolean;
}

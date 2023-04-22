export interface Filters {
  id: string;
  name: string;
  items: FilterItem[];
}

export interface FilterItem {
  id: string;
  name: string;
  selected: boolean;
  items?: FilterItem[]
}

let i:Array<string>= [""];
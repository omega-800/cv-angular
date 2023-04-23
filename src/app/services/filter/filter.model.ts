
export interface SkillFilter {
    category: string[],
    subcategory: string[],
    type: string[],
    hobby: boolean,
    applicationtype?: string[]
  }
  
  export interface SkillFilter2 {
    category: {[key:string]:string},
    subcategory: {[key:string]:string},
    type: {[key:string]:string},
    hobby: boolean,
    applicationtype?: {[key:string]:string}
  }
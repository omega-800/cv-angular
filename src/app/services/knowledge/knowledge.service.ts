import { Injectable } from '@angular/core';
import { Knowledge, KnowledgeEntity } from './knowledge.model';
import * as knowledgeData from 'src/data/knowledge.json'

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  knowledgesData:Knowledge[] = (knowledgeData as any).default;
  knowledges:KnowledgeEntity[];

  constructor() { 
    this.knowledges = this.knowledgesData.map(item => {return {...item, id:"knowledge_"+item.knowledge_id}})
  }

  getKnowledges():KnowledgeEntity[] {
    return this.knowledges;
  }

  getKnowledgeById(id:string):KnowledgeEntity {
    return Object.values(this.knowledges).filter(knowledge => knowledge.knowledge_id === id)[0];
  }
}

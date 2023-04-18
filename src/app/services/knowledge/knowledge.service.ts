import { Injectable } from '@angular/core';
import { Knowledge } from './knowledge.model';
import * as knowledgeData from 'src/data/knowledge.json'

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  knowledges:Knowledge[] = (knowledgeData as any).default;

  constructor() { }

  getKnowledges():Knowledge[] {
    return this.knowledges;
  }

  getKnowledgeById(id:string):Knowledge {
    return Object.values(this.knowledges).filter(knowledge => knowledge.knowledge_id === id)[0];
  }
}

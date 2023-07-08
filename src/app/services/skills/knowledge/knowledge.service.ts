import { Injectable } from '@angular/core';
import { KnowledgeOnly, KnowledgeEntity } from './knowledge.model';
import * as knowledgeData from 'src/data/knowledge.json';

@Injectable({
  providedIn: 'root',
})
export class KnowledgeService {
  private onlyKnowledges: KnowledgeOnly[] = (knowledgeData as any).default;
  private knowledges: KnowledgeEntity[];

  constructor() {
    this.knowledges = this.onlyKnowledges.map((knowledge) => {
      return {
        ...knowledge,
        id: 'knowledge_' + knowledge.knowledge_id,
        image: {
          id: 'image_' + knowledge.knowledge_id,
          name: 'Image of ' + knowledge.name,
          alt: 'Image of ' + knowledge.name,
          path: knowledge.image,
        },
        thumbnail: {
          id: 'thumbnail_' + knowledge.knowledge_id,
          name: 'Thumbnail of ' + knowledge.name,
          alt: 'Thumbnail of ' + knowledge.name,
          path: knowledge.thumbnail,
        },
      };
    });
  }

  getKnowledges(): KnowledgeEntity[] {
    return this.knowledges;
  }

  getKnowledgeById(id: string): KnowledgeEntity {
    return Object.values(this.knowledges).filter(
      (knowledge) => knowledge.knowledge_id === id
    )[0];
  }
}

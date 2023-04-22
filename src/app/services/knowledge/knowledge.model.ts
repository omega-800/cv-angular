import { ContentEntity } from "src/app/services/entities.model";

export interface KnowledgeEntity extends ContentEntity {
  knowledge_id: string;
}

export interface Knowledge {
  knowledge_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  thumbnail: string;
  image: string;
  url: string;
}
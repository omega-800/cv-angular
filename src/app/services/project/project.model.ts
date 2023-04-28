import { ImageComponent } from "src/app/components/components.model";
import { CareerEntity } from "../career/career/career.model";
import { WorkplaceEntity } from "../career/workplace/workplace.model";
import { ContentEntity } from "../entities.model";
import { PersonEntity } from "../person/person/person.model";
import { SkillEntity } from "../skills/skill/skill.model";

export interface ProjectEntity extends ContentEntity {
    project_id: string;
    github: string;
    date: Date;
    client: PersonEntity;
    workplace: WorkplaceEntity;
    authors: PersonEntity[];
    skills: SkillEntity[];
    images: ImageComponent[];
}

export interface ProjectOnly {
  project_id: string;
  name: string;
  name_e: string;
  name_r: string;
  description: string;
  description_e: string;
  description_r: string;
  url: string;
  thumbnail: string;
  image: string;
  github: string;
  date: string;
  client_id: string;
  workplace_id: string;
}

export interface Project_Author {
  project_author_id: string;
  project_id: string;
  author_id: string;
}

export interface Project_Skill {
  project_skill_id: string;
  project_id: string;
  skill_id: string;
}
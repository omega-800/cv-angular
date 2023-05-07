import { ImageComp } from "src/app/components/components.model";
import { CareerEntity } from "../../career/career/career.model";
import { ContentEntity } from "../../entities.model";
import { PersonEntity } from "../../person/person/person.model";
import { SkillEntity } from "../../skills/skill/skill.model";
import { ClientEntity } from "../client/client.model";

export interface ProjectEntity extends ContentEntity {
    project_id: string;
    github: string;
    date: Date;
    client: PersonEntity;
    career: CareerEntity;
    authors: PersonEntity[];
    skills: SkillEntity[];
    images: ImageComp[];
    clients: ClientEntity[];
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
  career_id: string;
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

export interface Project_Client {
  project_client_id: string;
  project_id: string;
  client_id: string;
}
import { Entity } from "../../entities.model";

export interface ClientEntity extends Entity {
  client_id: string;
  description: string;
  url: string;
}
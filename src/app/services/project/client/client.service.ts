import { Injectable } from '@angular/core';
import * as clientData from 'src/data/client.json'
import { ClientEntity } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clients: ClientEntity[] = (clientData as any).default;

  constructor() { }

  getClients():ClientEntity[] {
    return this.clients;
  }
  
  getClientById(id:string):ClientEntity {
    return Object.values(this.clients).filter(client => client.client_id === id)[0];
  }
}

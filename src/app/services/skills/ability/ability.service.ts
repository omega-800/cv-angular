import { Injectable } from '@angular/core';
import { AbilityOnly, AbilityEntity } from './ability.model';
import * as abilityData from 'src/data/ability.json'

@Injectable({
  providedIn: 'root'
})

export class AbilityService {
  onlyAbilities:AbilityOnly[] = (abilityData as any).default;
  abilities:AbilityEntity[];

  constructor() { 
    this.abilities = this.onlyAbilities.map(item => {return {...item, id:"ability_"+item.ability_id}});
  }

  getAbilitys():AbilityEntity[] {
    return this.abilities;
  }

  getAbilityById(id:string):AbilityEntity {
    return Object.values(this.abilities).filter(ability => ability.ability_id === id)[0];
  }
}

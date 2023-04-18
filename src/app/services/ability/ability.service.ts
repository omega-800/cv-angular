import { Injectable } from '@angular/core';
import { Ability } from './ability.model';
import * as abilityData from 'src/data/ability.json'

@Injectable({
  providedIn: 'root'
})

export class AbilityService {
  abilitys:Ability[] = (abilityData as any).default;

  constructor() { }

  getAbilitys():Ability[] {
    return this.abilitys;
  }

  getAbilityById(id:string):Ability {
    return Object.values(this.abilitys).filter(ability => ability.ability_id === id)[0];
  }
}

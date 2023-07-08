import { Injectable } from '@angular/core';
import { AbilityOnly, AbilityEntity } from './ability.model';
import * as abilityData from 'src/data/ability.json';

@Injectable({
  providedIn: 'root',
})
export class AbilityService {
  private onlyAbilities: AbilityOnly[] = (abilityData as any).default;
  private abilities: AbilityEntity[];

  constructor() {
    this.abilities = this.onlyAbilities.map((ability) => {
      return {
        ...ability,
        id: 'ability_' + ability.ability_id,
        image: {
          id: 'image_' + ability.ability_id,
          name: 'Image of ' + ability.name,
          alt: 'Image of ' + ability.name,
          path: ability.image,
        },
        thumbnail: {
          id: 'thumbnail_' + ability.ability_id,
          name: 'Thumbnail of ' + ability.name,
          alt: 'Thumbnail of ' + ability.name,
          path: ability.thumbnail,
        },
      };
    });
  }

  getAbilitys(): AbilityEntity[] {
    return this.abilities;
  }

  getAbilityById(id: string): AbilityEntity {
    return Object.values(this.abilities).filter(
      (ability) => ability.ability_id === id
    )[0];
  }
}

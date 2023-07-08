import { Injectable } from '@angular/core';
import * as personCategoryData from 'src/data/personcategory.json';
import {
  PersonCategoryEntity,
  PersonCategoryOnly,
} from './person-category.model';

@Injectable({
  providedIn: 'root',
})
export class PersonCategoryService {
  private onlyPersonCategories: PersonCategoryOnly[] = (
    personCategoryData as any
  ).default;
  private personCategories: PersonCategoryEntity[];

  constructor() {
    this.personCategories = this.onlyPersonCategories.map((item) => {
      return { ...item, id: 'personCategory_' + item.personcategory_id };
    });
  }

  public getPersonCategoryById(id: string): PersonCategoryEntity {
    return Object.values(this.personCategories).filter(
      (personCat) => personCat.personcategory_id === id
    )[0];
  }
}

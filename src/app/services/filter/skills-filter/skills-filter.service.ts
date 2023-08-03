import { Injectable } from '@angular/core';
import {
  SkillCategoryEntity,
  SkillSubCategoryEntity,
} from '../../skills/skill-category/skill-category.model';
import { FilterCategoryEntity, FilterTypes, FiltersEntity } from '../filter.model';
import { SkillEntity } from '../../skills/skill/skill.model';
import { ApplicationTypeEntity } from '../../skills/application/application.model';
import { skillFilterProps } from './skills-filter.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsFilterService {

  getSkillFiltersOfSkills(skills: SkillEntity[]): FiltersEntity {
    let subCategories: SkillSubCategoryEntity[] = [];
    let categories: SkillCategoryEntity[] = [];
    let appTypes: ApplicationTypeEntity[] = [];
    let types: string[] = [];
    let percent: number[] = [];
    let hobbies: boolean[] = [];
    let filters: FilterCategoryEntity[] = [];

    skills.forEach((skill) => {
      skill.skillsubcategories.forEach((subCat) => {
        if (
          !subCategories.some(
            (elem) => elem.skillsubcategory_id == subCat.skillsubcategory_id
          )
        ) {
          subCategories.push(subCat);
        }
      });
      skill.skillcategories.forEach((cat) => {
        if (
          !categories.some(
            (elem) => elem.skillcategory_id == cat.skillcategory_id
          )
        ) {
          categories.push(cat);
        }
      });
      if (
        skill.applicationtype !== undefined &&
        !appTypes.some(
          (elem) =>
            elem.applicationtype_id == skill.applicationtype?.applicationtype_id
        )
      ) {
        appTypes.push(skill.applicationtype);
      }
      if (!types.includes(skill.type)) {
        types.push(skill.type);
      }
      if (!hobbies.includes(skill.hobby)) {
        hobbies.push(skill.hobby);
      }
      if (!percent.includes(skill.knowledgepercent)) {
        percent.push(skill.knowledgepercent);
      }
    });
    if (categories.length > 0) {
      filters.push(this.getCategoryFilters(categories));
    }
    if (subCategories.length > 0) {
      filters.push(this.getSubCategoryFilters(subCategories));
    }
    if (types.length > 0) {
      filters.push(this.getTypeFilters(types));
    }
    if (appTypes.length > 0) {
      filters.push(this.getApplicationTypeFilters(appTypes));
    }
    if (hobbies.includes(false) && hobbies.includes(true)) {
      filters.push(this.getHobbyFilters());
    }
    if (percent.length > 2) {
      filters.push(this.getKnowledgeRange(percent, 5));
    }

    return {
      id: 'filter_skill',
      name: 'Skills',
      type: FilterTypes.SKILL,
      categories: filters,
    };
  }

  getCategoryFilters(categories: SkillCategoryEntity[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.category,
      name: 'Kategorie',
      selected: true,
      isRange: false,
      tags: categories.map((skillCat) => {
        return {
          id: skillFilterProps.category + '_' + skillCat.skillcategory_id,
          name: skillCat.name,
          selected: false,
          value: skillCat.skillcategory_id,
          image: skillCat.image,
        };
      }),
    };
  }

  getSubCategoryFilters(
    subCategories: SkillSubCategoryEntity[]
  ): FilterCategoryEntity {
    return {
      id: skillFilterProps.subcategory,
      name: 'Unterkategorie',
      selected: true,
      isRange: false,
      tags: subCategories.map((skillSubCat) => {
        return {
          id:
            skillFilterProps.subcategory +
            '_' +
            skillSubCat.skillsubcategory_id,
          name: skillSubCat.name,
          selected: false,
          value: skillSubCat.skillsubcategory_id,
        };
      }),
    };
  }

  getApplicationTypeFilters(
    appTypes: ApplicationTypeEntity[]
  ): FilterCategoryEntity {
    return {
      id: skillFilterProps.apptype,
      name: 'Applikationstyp',
      selected: true,
      isRange: false,
      tags: appTypes.map((appType) => {
        return {
          id: skillFilterProps.apptype + '_' + appType.applicationtype_id,
          name: appType.name,
          selected: false,
          value: appType.applicationtype_id,
        };
      }),
    };
  }

  getTypeFilters(types: string[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.type,
      name: 'Typ',
      selected: true,
      isRange: false,
      tags: types.map((type) => {
        return {
          id: skillFilterProps.type + '_' + type,
          name: type,
          selected: false,
          value: type,
        };
      }),
    };
  }

  getHobbyFilters(): FilterCategoryEntity {
    return {
      id: skillFilterProps.hobby,
      name: 'Hobby',
      selected: true,
      isRange: false,
      tags: [
        {
          id: skillFilterProps.hobby + '_true',
          name: 'Ja',
          selected: false,
          value: true,
        },
        {
          id: skillFilterProps.hobby + '_false',
          name: 'Nein',
          selected: false,
          value: false,
        },
      ],
    };
  }

  getKnowledgeRange(items: number[], step: number): FilterCategoryEntity {
    let sorted = items.sort((a, b) => a - b);
    let itemsFull = Array.from(
      { length: (sorted[sorted.length - 1] - sorted[0]) / step + 1 },
      (value, index) => sorted[0] + index * step
    );
    return {
      id: skillFilterProps.knowledge,
      name: 'Prozent',
      isRange: true,
      tags: itemsFull.map((item) => {
        return {
          id: skillFilterProps.knowledge + '_' + item.toString(),
          name: item.toString(),
          selected: false,
          value: item,
        }
      })
        .sort((a, b) => a.value - b.value),
      step: step,
    };
  }
}

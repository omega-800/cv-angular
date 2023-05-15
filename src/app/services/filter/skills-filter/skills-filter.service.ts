import { Injectable } from '@angular/core';
import { SkillService } from '../../skills/skill/skill.service';
import { SkillCategoryEntity, SkillSubCategoryEntity } from '../../skills/skill-category/skill-category.model';
import { FilterCategoryEntity, FilterRangeEntity, FiltersEntity } from '../filter.model';
import { SkillEntity } from '../../skills/skill/skill.model';
import { SkillCategoriesService } from '../../skills/skill-category/skill-category.service';
import { ApplicationService } from '../../skills/application/application.service';
import { ApplicationTypeEntity } from '../../skills/application/application.model';
import { skillFilterProps } from './skills-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsFilterService {
  categoryFilters: FilterCategoryEntity;
  subcategoryFilters: FilterCategoryEntity;
  typeFilters: FilterCategoryEntity;
  hobbyFilters: FilterCategoryEntity;
  applicationtypeFilters: FilterCategoryEntity;
  skillFilters: FiltersEntity;

  constructor(private skillService: SkillService, private skillCategoriesService: SkillCategoriesService, private applicationService: ApplicationService) {
    this.categoryFilters = this.getCategoryFilters(this.skillCategoriesService.getSkillCategories());
    this.subcategoryFilters = this.getSubCategoryFilters(this.skillCategoriesService.getSkillSubCategories());
    this.applicationtypeFilters = this.getApplicationTypeFilters(this.applicationService.getApplicationTypes());
    this.typeFilters = this.getTypeFilters(Object.entries(this.skillService.getSkillTypes()).map(([key, value]) => value));
    this.hobbyFilters = this.getHobbyFilters();
    this.skillFilters = {
      id: "filter_skill",
      name: "Skills",
      categories: [this.categoryFilters, this.subcategoryFilters, this.typeFilters, this.hobbyFilters, this.applicationtypeFilters]
    }
  }

  getSkillFiltersOfSkills(skills: SkillEntity[]): any {
    let subCategories: SkillSubCategoryEntity[] = [];
    let categories: SkillCategoryEntity[] = [];
    let appTypes: ApplicationTypeEntity[] = [];
    let types: string[] = [];
    let percent: number[] = [];
    let hobbies: boolean[] = [];
    let filters: FilterCategoryEntity[] = [];
    let ranges: FilterRangeEntity[] = [];

    skills.forEach(skill => {
      skill.skillsubcategories.forEach(subCat => {
        if (!subCategories.some(elem => elem.skillsubcategory_id == subCat.skillsubcategory_id)) {
          subCategories.push(subCat);
        }
      })
      skill.skillcategories.forEach(cat => {
        if (!categories.some(elem => elem.skillcategory_id == cat.skillcategory_id)) {
          categories.push(cat);
        }
      })
      if (skill.applicationtype !== undefined && !appTypes.some(elem => elem.applicationtype_id == skill.applicationtype?.applicationtype_id)) {
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
    })
    if (categories.length > 1) { filters.push(this.getCategoryFilters(categories)) }
    if (subCategories.length > 1) { filters.push(this.getSubCategoryFilters(subCategories)) }
    if (types.length > 1) { filters.push(this.getTypeFilters(types)) }
    if (appTypes.length > 1) { filters.push(this.getApplicationTypeFilters(appTypes)) }
    if (percent.length > 2) { ranges.push(this.getKnowledgeRange(percent.sort((a, b) => a - b), 5)) }
    if (hobbies.includes(false) && hobbies.includes(true)) { filters.push(this.getHobbyFilters()) }

    return {
      id: "filter_skill",
      name: "Skills",
      categories: filters,
      ranges: ranges
    }
  }

  getSkillFilters(): FiltersEntity {
    return this.skillFilters;
  }

  getCategoryFilters(categories: SkillCategoryEntity[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.category,
      name: "Kategorie",
      selected: true,
      tags: categories.map(skillCat => {
        return { id: skillFilterProps.category + "_" + skillCat.skillcategory_id, name: skillCat.name, selected: false, value: skillCat.skillcategory_id }
      })
    };
  }

  getSubCategoryFilters(subCategories: SkillSubCategoryEntity[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.subcategory,
      name: "Unterkategorie",
      selected: true,
      tags: subCategories.map(skillSubCat => {
        return { id: skillFilterProps.subcategory + "_" + skillSubCat.skillsubcategory_id, name: skillSubCat.name, selected: false, value: skillSubCat.skillsubcategory_id }
      })
    };
  }

  getApplicationTypeFilters(appTypes: ApplicationTypeEntity[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.apptype,
      name: "Applikationstyp",
      selected: true,
      tags: appTypes.map(appType => {
        return { id: skillFilterProps.apptype + "_" + appType.applicationtype_id, name: appType.name, selected: false, value: appType.applicationtype_id }
      })
    };
  }

  getTypeFilters(types: string[]): FilterCategoryEntity {
    return {
      id: skillFilterProps.type,
      name: "Typ",
      selected: true,
      tags: types.map(type => {
        return { id: skillFilterProps.type + "_" + type, name: type, selected: false, value: type }
      })
    };
  }

  getHobbyFilters(): FilterCategoryEntity {
    return {
      id: skillFilterProps.hobby,
      name: "Hobby",
      selected: true,
      tags: [
        {
          id: skillFilterProps.hobby + "_true",
          name: "Freizeitbeschäftigung",
          selected: false,
          value: true
        },
        {
          id: skillFilterProps.hobby + "_false",
          name: "Keine Freizeitbeschäftigung",
          selected: false,
          value: false
        }
      ]
    }
  }

  getKnowledgeRange(items: number[], step: number): FilterRangeEntity {
    return {
      id: skillFilterProps.knowledge,
      name: "Prozent",
      values: items,
      step: step
    };
  }
}

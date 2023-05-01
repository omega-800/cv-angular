import { Injectable } from '@angular/core';
import { ActivityOnly, ActivityEntity } from './activity.model';
import * as activityData from 'src/data/activity.json'

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  private onlyActivities:ActivityOnly[] = (activityData as any).default;
  private activities:ActivityEntity[];

  constructor() {
    this.activities = this.onlyActivities.map(item => {return {...item, id:"activity_"+item.activity_id}})
   }

  getActivitys():ActivityEntity[] {
    return this.activities;
  }

  getActivityById(id:string):ActivityEntity {
    return Object.values(this.activities).filter(activity => activity.activity_id === id)[0];
  }
}

import { Injectable } from '@angular/core';
import { Activity } from './activity.model';
import * as activityData from 'src/data/activity.json'

@Injectable({
  providedIn: 'root'
})

export class ActivityService {
  activitys:Activity[] = (activityData as any).default;

  constructor() { }

  getActivitys():Activity[] {
    return this.activitys;
  }

  getActivityById(id:string):Activity {
    return Object.values(this.activitys).filter(activity => activity.activity_id === id)[0];
  }
}

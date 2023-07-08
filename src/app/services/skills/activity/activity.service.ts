import { Injectable } from '@angular/core';
import { ActivityOnly, ActivityEntity } from './activity.model';
import * as activityData from 'src/data/activity.json';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private onlyActivities: ActivityOnly[] = (activityData as any).default;
  private activities: ActivityEntity[];

  constructor() {
    this.activities = this.onlyActivities.map((activity) => {
      return {
        ...activity,
        id: 'activity_' + activity.activity_id,
        image: {
          id: 'image_' + activity.activity_id,
          name: 'Image of ' + activity.name,
          alt: 'Image of ' + activity.name,
          path: activity.image,
        },
        thumbnail: {
          id: 'thumbnail_' + activity.activity_id,
          name: 'Thumbnail of ' + activity.name,
          alt: 'Thumbnail of ' + activity.name,
          path: activity.thumbnail,
        },
      };
    });
  }

  getActivitys(): ActivityEntity[] {
    return this.activities;
  }

  getActivityById(id: string): ActivityEntity {
    return Object.values(this.activities).filter(
      (activity) => activity.activity_id === id
    )[0];
  }
}

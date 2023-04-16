import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CareerComponent } from './career/career.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SocialsButtonComponent } from './socials-button/socials-button.component';
import { HeaderComponent } from './header/header.component';
import { SkillsPercentComponent } from './skills/skills-percent/skills-percent.component';
import { SkillItemComponent } from './skills/skill-item/skill-item.component';
import { SkillcategoryPercentComponent } from './skills/skillcategory-percent/skillcategory-percent.component';
import { SkillsPercentListComponent } from './skills/skills-percent-list/skills-percent-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CareerComponent,
    PageNotFoundComponent,
    SocialsButtonComponent,
    HeaderComponent,
    SkillsPercentComponent,
    SkillItemComponent,
    SkillcategoryPercentComponent,
    SkillsPercentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

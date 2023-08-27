import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropDownAnimation } from 'src/app/animations';
import { Entity } from 'src/app/services/entities.model';
import { ImageComp } from '../../components.model';
import { arrowIcon } from '../../icons.constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor],
  animations: [DropDownAnimation]
})
export class SelectComponent implements OnInit {
  @Input() fields!: Entity[];
  @Input() name!: string;
  @Input() selectedFields$?: Observable<Entity[]>;
  @Input() alwaysShowName?: boolean;
  @Input() allowMultiple?: boolean;

  @Output() selectEmitter = new EventEmitter<Entity[]>();

  isActive: boolean = false;
  selected: Entity[] = [];
  arrowIcon: ImageComp = arrowIcon;

  ngOnInit() {
    this.selectedFields$?.subscribe(res => this.selected = res);
    document.addEventListener('click', (e) => this.collapse(e))
    document.addEventListener('touchstart', (e) => this.collapse(e))
  }

  collapse(e: Event) {
    if (!!e.target && (!(e.target as HTMLElement).closest('.tag') && !(e.target as HTMLElement).closest('.showTags'))) {
      this.isActive = false;
    }
  }

  getName(): string {
    return this.alwaysShowName ? this.name : this.selected[0] ? this.selected[0].name : this.fields[0] ? this.fields[0].name : "Wählen";
  }

  isSelected(item: Entity): boolean {
    return this.selected.includes(item);
  }

  emitSelected(field: Entity) {
    if (this.allowMultiple) {
      this.selected = this.selected.includes(field) ? this.selected.filter(elem => elem.id != field.id) : [...this.selected, field]
    } else {
      this.selected = [field]
    }
    this.selectEmitter.emit(this.selected);
  }
}

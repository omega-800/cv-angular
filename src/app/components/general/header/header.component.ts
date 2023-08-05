import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Interest } from 'src/app/store/app/app.model';
import { interestTypes } from 'src/app/store/app/app.model';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SetInterest } from 'src/app/store/app/app.actions';
import { Direction, personIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { DropDownAnimation, TooltipAnimation } from 'src/app/animations';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TooltipComponent, NgFor, RouterLink, RouterLinkActive, NgIf, FormsModule, ReactiveFormsModule],
  animations: [DropDownAnimation, TooltipAnimation]
})
export class HeaderComponent {
  types = interestTypes;
  interest = '';
  interestIcon: ImageComp = this.types[0].icon;
  personIcon: ImageComp = personIcon;
  d = Direction;
  dropdownActive: boolean = false;
  dropdownLoginActive: boolean = false;

  loginForm: FormGroup;

  constructor(private store: Store, private router: Router, private afAuth: AngularFireAuth) {
    this.store.select(state => state.app.interest).subscribe(res => { this.interest = res; this.interestIcon = this.types.find(t => t.type == res)!.icon });
    this.loginForm = new FormGroup({
      email: new FormControl('this.email', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl('this.password', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ])
    });
  }

  ngOnInit() {
    this.loginForm.reset({ email: this.email, password: this.password });
    this.afAuth.authState.subscribe(state => console.log('state: ', state?.isAnonymous))
    console.log(this.afAuth.currentUser)
  }

  get email() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('power');
  }

  setInterest(interest: Interest) {
    let checkedInterest = interest != undefined && Object.values(Interest).includes(interest) ? interest : Interest.IT;
    this.router.navigate(['.', { interest: checkedInterest }]);
    this.store.dispatch(new SetInterest(checkedInterest))
  }

  login() {
    const { email, password } = this.loginForm.value;
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user: ', user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      });
  }

  register() {
    const { email, password } = this.loginForm.value;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user: ', user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('errorCode: ', errorCode)
        console.log('errorMessage: ', errorMessage)
      });
  }
}


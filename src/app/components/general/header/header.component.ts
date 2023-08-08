import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Interest, Language, languageTypes } from 'src/app/store/app/app.model';
import { interestTypes } from 'src/app/store/app/app.model';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SetInterest, SetLanguage } from 'src/app/store/app/app.actions';
import { Direction, homeIcon, imageIcon, personIcon, schoolIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { DropDownAnimation, TooltipAnimation } from 'src/app/animations';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    TooltipComponent,
    NgFor,
    RouterLink,
    RouterLinkActive,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    KeyValuePipe,
  ],
  animations: [DropDownAnimation, TooltipAnimation],
})
export class HeaderComponent {
  types = interestTypes;
  interest = '';
  interestIcon: ImageComp = this.types[0].icon;

  d = Direction;
  dropdownActive: boolean = !!!localStorage.getItem('interest');
  dropdownLoginActive: boolean = false;
  selectedRegister: boolean = false;
  btcActive = false;

  personIcon: ImageComp = personIcon;
  homeIcon = homeIcon;
  schoolIcon = schoolIcon;
  imageIcon = imageIcon;
  loggedIn: boolean = false;
  authenticated: boolean = false;
  loginForm: FormGroup;
  errorMsg: string = '';
  userEmail: string = '';

  languageTypes = languageTypes;
  language: Language = Language.DE;
  langActive = false;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated.subscribe((isAuth) => {
      this.authenticated = isAuth;
    });
    this.authService.isLoggedIn.subscribe((isAuth) => {
      this.loggedIn = isAuth;
    });
    this.authService.errorMessage.subscribe((msg) => {
      this.errorMsg = msg;
    });
    this.authService.userEmail.subscribe((userEmail) => {
      this.userEmail = userEmail;
    });

    this.store
      .select((state) => state.app.interest)
      .subscribe((res) => {
        this.interest = res;
        this.interestIcon = this.types.find((t) => t.type == res)!.icon;
      });
    this.store
      .select((state) => state.app.language)
      .subscribe((res) => (this.language = res));

    this.loginForm = new FormGroup({
      email: new FormControl('this.email', [
        Validators.required,
        Validators.minLength(4),
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('this.password', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  ngOnInit() {
    this.loginForm.reset({ email: this.email, password: this.password });
  }

  get email() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('power');
  }

  setInterest(interest: Interest) {
    let checkedInterest =
      interest != undefined && Object.values(Interest).includes(interest)
        ? interest
        : Interest.IT;
    this.router.navigate(['.', { interest: checkedInterest }]);
    this.store.dispatch(new SetInterest(checkedInterest));
    localStorage.setItem('interest', checkedInterest)
  }

  setLanguage(lang: Language) {
    this.store.dispatch(new SetLanguage(lang));
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password);
  }

  register() {
    const { email, password } = this.loginForm.value;
    this.authService.register(email, password);
  }

  logout() {
    this.authService.logout();
  }

  getVerEmail() {
    this.authService.getVerEmail();
  }
}

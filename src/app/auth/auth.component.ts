import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
   
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.Login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        if (this.isLoginMode) {
          this.router.navigate(['recipes']);
        }
        this.onSwitchMode();
      },
      (errorMsg) => {
        console.log(errorMsg);
        this.error = errorMsg;
        // this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );
    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(message: string) {
  //   const altCmpFactory =
  //     this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

  //   const alertHostRef = this.alertHost.viewContainerRef;

  //   alertHostRef.clear();
  //   const compRef = alertHostRef.createComponent(altCmpFactory);

  //   compRef.instance.message = message;
  //   this.closeSub = compRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     alertHostRef.clear();
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.closeSub.unsubscribe();

  // }
}

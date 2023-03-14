import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    FormsModule,
    SharedModule
  ],
})
export class AuthModule {
  constructor(){
    console.log("auth Module")
  }
}

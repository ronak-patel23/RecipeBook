import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

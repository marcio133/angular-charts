import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GraphComponent } from "./graph/graph.component";
import { HomeComponent } from "./home/home.component";
import { NavComponent } from "./nav/nav.component";
import { ApiService } from "./_services/api.service";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HomeComponent, GraphComponent, LoadingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ChartsModule,
    FontAwesomeModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}

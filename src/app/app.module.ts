import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GraphComponent } from "./graph/graph.component";
import { HomeComponent } from "./home/home.component";
import { LoadingComponent } from "./loading/loading.component";
import { NavComponent } from "./nav/nav.component";
import { ApiService } from "./_services/api.service";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    GraphComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ChartsModule,
    FontAwesomeModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    ApiService
    // httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

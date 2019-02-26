import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { HttpClientModule } from '@angular/common/http';
import {GraphComponent} from './visuals/graph/graph.component';
import {NodeVisualComponent} from './visuals/shared/node-visual.component';
import {LinkVisualComponent} from './visuals/shared/link-visual.component';
import {DraggableDirective, ZoomableDirective} from './d3/directives';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
  // { path: '**', component: PageNotFoundComponent }
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomableDirective,
    DraggableDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxGraphModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

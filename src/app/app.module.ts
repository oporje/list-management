import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { reducers } from './store/app.state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddItemModalComponent } from './components/add-item-modal/add-item-modal.component';
import { DeleteItemModalComponent } from './components/delete-item-modal/delete-item-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    ListContainerComponent,
    AddItemModalComponent,
    DeleteItemModalComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 50, // Retains last 50 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

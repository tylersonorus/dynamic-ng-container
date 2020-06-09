import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppChildComponent} from './app-child/app-child.component';
import {AppChildOfChildComponent} from './app-child-of-child/app-child-of-child.component';
import {AppChildForComponent} from './app-child-for/app-child-for.component';

@NgModule({
    declarations: [
        AppComponent,
        AppChildComponent,
        AppChildOfChildComponent,
        AppChildForComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [AppChildComponent, AppChildOfChildComponent, AppChildForComponent]
})
export class AppModule {
}

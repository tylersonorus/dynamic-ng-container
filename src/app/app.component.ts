import {
    Component,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Injector,
    ApplicationRef, ViewEncapsulation
} from '@angular/core';
import {Compiler} from '@angular/core';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AppChildComponent} from './app-child/app-child.component';
import {AppChildOfChildComponent} from "./app-child-of-child/app-child-of-child.component";
import {AppChildForComponent} from 'app-child-for/app-child-for.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
    list = [];
    @ViewChild('componentsContainer', {read: ViewContainerRef}) container: ViewContainerRef;
    private subs: Subscription[] = [];
    //components=[AppChildComponent, AppChildOfChildComponent]
    trigger = false;

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public _compiler: Compiler,
        public injector: Injector,
        public appRef: ApplicationRef) {
    }

    ngOnDestroy() {
        // unsubscribe from all on destroy
        this.subs.forEach(sub => sub.unsubscribe());
    }

    onClickAdd = () => {
        this.list.push((new Dynamic(this)).create(AppChildForComponent));
        this.trigger = !this.trigger;
        const currentComponent = this.list[this.list.length - 1] as ComponentRef<AppChildForComponent>;
        // currentComponent.instance.numberCreated = Math.floor(Math.random() * 10);
        currentComponent.instance.data = [
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
            AppChildOfChildComponent,
        ];
        // subscribe to component event to know when to delete
        const selfDeleteSub = currentComponent.instance.deleteSelf
            .pipe(tap(() => {
                this.list.pop();
                document.body.removeChild(currentComponent.location.nativeElement);
                currentComponent.destroy();
                this._compiler.clearCache();
                selfDeleteSub.unsubscribe();
                this.subs = [];
            }))
            .subscribe();

        // add subscription to array for clean up
        this.subs.push(selfDeleteSub);
    }
}

class Dynamic {
    constructor(public component: AppComponent) {
    }
    create(module: any) {
        const component = this.component.componentFactoryResolver.resolveComponentFactory(module)
            .create(this.component.injector);
        this.component.appRef.attachView(component.hostView);
        document.body.appendChild(component.location.nativeElement);
        return component;
    }
}

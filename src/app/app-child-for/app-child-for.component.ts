import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'app-app-child-for',
    templateUrl: './app-child-for.component.html',
    styleUrls: ['./app-child-for.component.css']
})
export class AppChildForComponent implements OnInit {
    @Output() deleteSelf: EventEmitter<void> = new EventEmitter<void>();

    data = [];
    index = 0;

    @ViewChildren('widgetContainer', {read: ViewContainerRef})
    private set widgetContainers(val: QueryList<ViewContainerRef>) {
        let newComponent: ComponentRef<any> = null;
        if (this.data[this.index]) {
            val.forEach((value) => {
                newComponent = value.createComponent(
                    this.componentFactory.resolveComponentFactory(this.data[this.index])
                );
                newComponent.onDestroy(() => {
                    if (newComponent.hostView.destroyed) {
                        newComponent.destroy();
                    }
                    console.log('destroy', newComponent.instance);
                });
                console.log(newComponent);
                this.index++;
            });
        }
    }

    constructor(public componentFactory: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}

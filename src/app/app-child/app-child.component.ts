import {
  ApplicationRef,
  Compiler,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from "@angular/core";
import {Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {AppChildOfChildComponent} from "../app-child-of-child/app-child-of-child.component";

@Component({
  selector: "app-app-child",
  templateUrl: "./app-child.component.html",
  styleUrls: ["./app-child.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppChildComponent implements OnDestroy {
  @Output() deleteSelf: EventEmitter<void> = new EventEmitter<void>();
  @Input() numberCreated: number;
  @ViewChild("componentsContainer", { read: ViewContainerRef })
  container: ViewContainerRef;
  private subs: Subscription[] = [];
  list = [];
  ngOnDestroy() {
    // unsubscribe from all on destroy
    //   this.subs.forEach(sub => sub.unsubscribe());
  }

  onClickAdd = () => {
    const component = this.componentFactoryResolver
      .resolveComponentFactory(AppChildOfChildComponent)
      .create(this.injector);
    this.list.push(component);
    this.appRef.attachView(component.hostView);
    document.body.appendChild(component.location.nativeElement);
    let elhtml = component.location.nativeElement;
    //const component = this.container.createComponent(factory);

    component.instance.numberCreated = Math.floor(Math.random()*10);

    // subscribe to component event to know when to delete
    const selfDeleteSub = component.instance.deleteSelf
      .pipe(
        tap(() => {
          this.list.pop();
          document.body.removeChild(elhtml);
          component.destroy();
          this._compiler.clearCache();
          selfDeleteSub.unsubscribe();
          //    this.container.clear();
          this.subs = [];
        })
      )
      .subscribe();

    // add subscription to array for clean up
    this.subs.push(selfDeleteSub);
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private _compiler: Compiler,
    public appRef: ApplicationRef,
    public injector: Injector
  ) {}
}

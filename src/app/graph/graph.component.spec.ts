import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { GraphComponent } from "./graph.component";

describe("GraphComponent", () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphComponent],
      imports: [FontAwesomeModule, ChartsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", fakeAsync(() => {
    tick();
    expect(component).toBeTruthy();
  }));
});

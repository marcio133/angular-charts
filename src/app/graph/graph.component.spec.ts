import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt
} from "@fortawesome/free-solid-svg-icons";
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

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("resize() should set dymWidth to 48, icon to faExpandArrowsAlt and button title to Expandir when dymWidth is 100", () => {
    component.dymWidth = "100%";
    component.resize();

    expect(component.dymWidth).toBe("48%");
    expect(component.icon).toBe(faExpandArrowsAlt);
    expect(component.buttonTitle).toContain("Expandir");
  });

  it("resize() should set dymWidth to 100, icon to faCompressArrowsAlt and button title to Contrair when dymWidth is 48", () => {
    component.resize();

    expect(component.dymWidth).toBe("100%");
    expect(component.icon).toBe(faCompressArrowsAlt);
    expect(component.buttonTitle).toContain("Contrair");
  });

  it("when component loads, resize button title must be 'Expandir'", () => {
    const buttonRecuperaPaciente = fixture.debugElement.query(
      By.css(".btn-graph")
    );

    expect(buttonRecuperaPaciente.nativeElement.title).toContain("Expandir");
  });

  it("resize button title must be 'Contrair' after calling resize() once", () => {
    const buttonExpand = fixture.debugElement.query(By.css(".btn-graph"));

    component.resize();
    fixture.detectChanges();

    expect(buttonExpand.nativeElement.title).toContain("Contrair");
  });
});

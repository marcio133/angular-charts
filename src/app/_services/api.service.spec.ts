import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";

describe("ApiService", () => {
  let service: ApiService;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(ApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("carregarDados() must call getDadoEmMes() 12 times", () => {
    spyOn(service, "getDadoEmMes").and.callFake(() => {
      return new Promise(() => console.log("testeMes"));
    });

    service.carregaDados("01");

    expect(service.getDadoEmMes).toHaveBeenCalledTimes(12);
  });
});

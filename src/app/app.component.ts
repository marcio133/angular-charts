import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "angular-graph";

  constructor(private _swUpdate: SwUpdate) {}

  ngOnInit(): void {
    this.reloadCache();
  }

  reloadCache(): void {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.available.subscribe(() => {
        if (
          confirm(
            "Existe uma nova versão da aplicação disponível, deseja recarregar a página?"
          )
        ) {
          window.location.reload();
        }
      });
    }
  }
}

import type { App } from "@4site/engrid-scripts";

export class InformMethod {
  private app: typeof App;
  private radios: NodeListOf<HTMLInputElement>;

  constructor(app: typeof App) {
    this.app = app;
    this.radios = document.querySelectorAll<HTMLInputElement>(
      'input[name="supporter.questions.36584"]'
    );
    console.log("InformMethod initialized with radios:", this.radios);
    if (!this.radios.length) return;

    this.radios.forEach((radio) => {
      radio.addEventListener("change", () => this.sync());
    });
    this.sync();
  }

  private sync() {
    const selected = Array.from(this.radios).find((radio) => radio.checked);
    if (
      !selected ||
      (selected.value !== "ecard" && selected.value !== "mail")
    ) {
      this.app.setBodyData("inmem-method", "");
      return;
    }

    const method = selected.value;
    this.app.setBodyData("inmem-method", method);

    const checkbox = document.querySelector<HTMLInputElement>(
      "#en__field_embedded-ecard"
    );
    const shouldBeChecked = method === "ecard";
    if (!checkbox || checkbox.checked === shouldBeChecked) return;

    checkbox.checked = shouldBeChecked;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

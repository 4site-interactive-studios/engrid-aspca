import { ENGrid, EngridLogger } from "@4site/engrid-scripts";

export class Slideshow {
  private logger: EngridLogger = new EngridLogger(
    "Slideshow",
    "#FFFFFF",
    "#4d9068",
    "🖼️"
  );
  private slides: HTMLElement[];
  private currentIndex = -1;
  private timer: ReturnType<typeof setInterval> | null = null;
  private previewing = false;

  constructor(private container: HTMLElement) {
    this.slides = Array.from(container.children).filter(
      (child): child is HTMLElement => child.tagName === "DIV"
    );
    if (!this.slides.length) {
      this.logger.log("No slides found", container);
      return;
    }

    this.container.classList.add("engrid-slideshow--ready");
    this.slides.forEach((slide) => {
      slide.classList.add("engrid-slideshow__slide");
    });

    const initialSlide = this.findAmountSlide(this.getSelectedAmount());
    this.goTo(initialSlide === null ? 0 : initialSlide);
    if (initialSlide === null) this.startRotation();
    this.addEventListeners();
  }

  private addEventListeners() {
    const handleAmountChange = (event: Event) => {
      const fieldName = (event.target as HTMLInputElement | null)?.name;
      if (
        fieldName === "transaction.donationAmt" ||
        fieldName === "transaction.donationAmt.other"
      ) {
        this.syncToSelectedAmount();
      }
    };
    document.addEventListener("change", handleAmountChange);
    document.addEventListener("input", handleAmountChange);

    document
      .querySelectorAll<HTMLInputElement>(
        'input[name="transaction.donationAmt"]'
      )
      .forEach((input) => {
        const button = input.closest<HTMLElement>(".en__field__item");
        if (!button) return;

        button.addEventListener("mouseenter", () => {
          const matchingSlide = this.findAmountSlide(
            ENGrid.cleanAmount(input.value)
          );
          if (matchingSlide === null) return;
          this.previewing = true;
          this.stopRotation();
          this.goTo(matchingSlide);
        });
        button.addEventListener("mouseleave", () => {
          if (!this.previewing) return;
          this.previewing = false;
          this.syncToSelectedAmount();
        });
      });
  }

  private syncToSelectedAmount() {
    const matchingSlide = this.findAmountSlide(this.getSelectedAmount());
    if (matchingSlide === null) {
      this.startRotation();
      return;
    }
    this.stopRotation();
    this.goTo(matchingSlide);
  }

  private startRotation() {
    if (this.timer || this.slides.length < 2) return;
    this.timer = setInterval(() => {
      this.goTo((this.currentIndex + 1) % this.slides.length);
    }, 5000);
  }

  private stopRotation() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  private getSelectedAmount(): number | null {
    const selected = document.querySelector<HTMLInputElement>(
      'input[name="transaction.donationAmt"]:checked'
    );
    if (!selected) return null;

    const amount = ENGrid.cleanAmount(selected.value);
    if (amount > 0) return amount;

    const other = document.querySelector<HTMLInputElement>(
      'input[name="transaction.donationAmt.other"]'
    );
    const otherAmount = other ? ENGrid.cleanAmount(other.value) : 0;
    return otherAmount > 0 ? otherAmount : null;
  }

  private findAmountSlide(amount: number | null): number | null {
    if (amount === null) return null;
    const index = this.slides.findIndex(
      (slide) =>
        slide.hasAttribute("data-amount") &&
        ENGrid.cleanAmount(slide.dataset.amount || "") === amount
    );
    return index === -1 ? null : index;
  }

  private goTo(index: number) {
    if (index === this.currentIndex) return;

    this.slides.forEach((slide) => {
      slide.classList.remove("engrid-slideshow__slide--leaving");
    });
    if (this.currentIndex >= 0) {
      this.slides[this.currentIndex].classList.add(
        "engrid-slideshow__slide--leaving"
      );
    }

    this.currentIndex = index;
    this.slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.classList.toggle("engrid-slideshow__slide--active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
  }
}

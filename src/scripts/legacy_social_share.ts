export interface LegacySocialShareOptions {
  twitterMessage?: string;
  emailSubject?: string;
  emailMessage?: string;
}

export class LegacySocialShare {
  constructor(private options: LegacySocialShareOptions = {}) {
    document
      .querySelectorAll<HTMLAnchorElement>(".sb_social_button_facebook")
      .forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const shareUrl = encodeURIComponent(this.getShareUrl());
          this.openPopup(`https://facebook.com/sharer.php?u=${shareUrl}`);
        });
      });

    document
      .querySelectorAll<HTMLAnchorElement>(".sb_social_button_twitter")
      .forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          const message = encodeURIComponent(
            this.options.twitterMessage || document.title
          );
          const shareUrl = encodeURIComponent(this.getShareUrl());
          this.openPopup(
            `https://twitter.com/intent/tweet?text=${message}&url=${shareUrl}`
          );
        });
      });

    document
      .querySelectorAll<HTMLAnchorElement>(".sb_social_button_email")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const subject = encodeURIComponent(
            this.options.emailSubject || document.title
          );
          const message = encodeURIComponent(this.options.emailMessage || "");
          const shareUrl = encodeURIComponent(this.getShareUrl());
          button.setAttribute(
            "href",
            `mailto:?subject=${subject}&body=${message}%0D%0A%0D%0A${shareUrl}`
          );
        });
      });
  }

  private getShareUrl(): string {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/\/donate\/\d+\/?$/, "/donate/1");
    return url.href;
  }

  private openPopup(path: string) {
    const popup = window.open(path, "sbSocialPopup", "width=550,height=420");
    popup?.focus();
  }
}

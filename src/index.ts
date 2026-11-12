import { Options, App } from "@4site/engrid-scripts"; // Uses ENGrid via NPM
// import { Options, App } from "../../engrid/packages/scripts"; // Uses ENGrid via Visual Studio Workspace

import "./sass/main.scss";
import { customScript } from "./scripts/main";

const options: Options = {
  applePay: false,
  CapitalizeFields: true,
  ClickToExpand: true,
  CurrencySymbol: "$",
  DecimalSeparator: ".",
  ThousandsSeparator: ",",
  MediaAttribution: true,
  SkipToMainContentLink: true,
  SrcDefer: true,
  ProgressBar: true,
  MinAmount: 5,
  MaxAmount: 999999,
  MinAmountMessage: "Minimum gift amount is $5",
  MaxAmountMessage: "Maximum gift amount is $999,999",
  // TidyContact: {
  //   phone_enable: true,
  //   address_enable: true,
  //   cid: "43e5862a-3d73-4ac4-9c0c-b285a0e06e3e",
  //   us_zip_divider: "-",
  //   record_field: "supporter.NOT_TAGGED_4",
  //   date_field: "supporter.NOT_TAGGED_2",
  //   status_field: "supporter.NOT_TAGGED_3",
  //   countries: ["us"],
  //   phone_preferred_countries: ["us"],
  //   phone_record_field: "supporter.NOT_TAGGED_7",
  //   phone_date_field: "supporter.NOT_TAGGED_6",
  //   phone_status_field: "supporter.NOT_TAGGED_5",
  // },
  Debug: App.getUrlParameter("debug") == "true" ? true : false,
  onLoad: () => customScript(App),
  onResize: () => {},
};
new App(options);

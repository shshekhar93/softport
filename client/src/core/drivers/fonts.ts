import WebFont from "webfontloader";

export function loadFonts(fonts?: Array<string>) {
  if(fonts === undefined) {
    fonts = ['Roboto'];
  }

  WebFont.load({
    google: {
      families: fonts
    }
  });
}

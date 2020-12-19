import { WorkshopComponent } from "../../../interfaces/workshopComponent";
import cssBuilder from "./contentBuilders/css/cssBuilder";
import jsBuilder from "./contentBuilders/js/jsBuilder";
import zip from "./zip/zip";

export default class ExportFiles {

  static export(components: WorkshopComponent[]): void {
    const resultCss = `${cssBuilder.build(components).trim()}`;
    const resultJs = jsBuilder.build(components);
    zip.exportZip(resultCss, resultJs);
  }
}

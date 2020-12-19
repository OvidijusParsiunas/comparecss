import { WorkshopComponent } from "../../../interfaces/workshopComponent";
import cssBuilder from "./contentBuilders/cssBuilder";
import jsBuilder from "./contentBuilders/jsBuilder";
import zip from "./zip/zip";

export default class ExportFiles {

  static export(components: WorkshopComponent[]): void {
    const resultCss = `${cssBuilder.build(components).trim()}`;
    const resultJs = jsBuilder.build(components);
    zip.exportZip(resultCss, resultJs);
  }
}

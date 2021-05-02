import { JSBuilderResult } from '../../../../interfaces/jsBuilderResult';
import CleanCSS from 'clean-css';
import JSZip from 'jszip';

export default class Downloadfiles {

  private static readonly FILE_NAME = 'cssymphony';

  private static export(folder: JSZip): void {
    const pom = document.createElement('a');
    folder.generateAsync({ type: 'blob' }).then((blob) => {
      pom.setAttribute('href', window.URL.createObjectURL(blob));
      pom.setAttribute('download', 'cssimphony');
      pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
      pom.draggable = true;
      pom.classList.add('dragout');
      pom.click();
    });
  }

  private static addCSSFiles(customCss: string, cssForJS: string, zipFolder: JSZip): void {
    if (cssForJS) customCss += cssForJS;
    zipFolder.file(`${Downloadfiles.FILE_NAME}.css`, customCss);
    const allCssMinified = new CleanCSS({}).minify(customCss);
    if (!allCssMinified.errors.length) { zipFolder.file(`${Downloadfiles.FILE_NAME}.min.css`, allCssMinified.styles); }
  }

  private static addJSFiles(js: string, jsmin: string, zipFolder: JSZip): void {
    if (js) zipFolder.file(`${Downloadfiles.FILE_NAME}.js`, js);
    if (jsmin) { zipFolder.file(`${Downloadfiles.FILE_NAME}.min.js`, jsmin); }
  }

  private static createZipFolder(): JSZip {
    const zip = new JSZip();
    const zipFolder = zip.folder('cssymphony');
    return zipFolder;
  }

  public static exportZip(customCss: string, customJS: JSBuilderResult): void {
    const zipFolder = Downloadfiles.createZipFolder();
    const { js, jsmin, cssForJs } = customJS;
    Downloadfiles.addJSFiles(js, jsmin, zipFolder);
    Downloadfiles.addCSSFiles(customCss, cssForJs, zipFolder);
    Downloadfiles.export(zipFolder);
  }
}

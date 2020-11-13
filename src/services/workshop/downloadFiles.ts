import JSZip from 'jszip';
import CleanCSS from 'clean-css';
import { JSBuilder } from '../../interfaces/jsBuilder';

export default class Downloadfiles {

  private static fileName = 'cssymphony';

  private static download(folder: JSZip): void {
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
    const allCss = customCss + cssForJS;
    zipFolder.file(`${this.fileName}.css`, allCss);
    const allCssMinified = new CleanCSS({}).minify(allCss);
    if (!allCssMinified.errors.length) { zipFolder.file(`${this.fileName}.min.css`, allCssMinified.styles); }
  }

  private static addJSFiles(js: string, jsmin: string, zipFolder: JSZip): void {
    if (js) zipFolder.file(`${this.fileName}.js`, js);
    if (jsmin) { zipFolder.file(`${this.fileName}.min.js`, jsmin); }
  }

  private static createZipFolder(): JSZip {
    const zip = new JSZip();
    const zipFolder = zip.folder('cssymphony');
    return zipFolder;
  }

  static downloadZip(customCss: string, customJS: JSBuilder): void {
    const zipFolder = this.createZipFolder();
    const { js, jsmin, cssForJs } = customJS;
    this.addJSFiles(js, jsmin, zipFolder);
    this.addCSSFiles(customCss, cssForJs, zipFolder);
    this.download(zipFolder);
  }
}

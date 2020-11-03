import JSZip from 'jszip';

export default class Downloadfiles {

  private static fileName = 'cssymphony';

  private static createZipFolder(): JSZip {
    const zip = new JSZip();
    const zipFolder = zip.folder('cssymphony');
    return zipFolder;
  }

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

  private static addJSFiles(downloadableJS: string, zipFolder: JSZip): string {
    let allCssForJS = '';
    let allJS = '';
    Object.keys(downloadableJS).forEach((key) => {
      const { cssFileContent, jsFileContent } = downloadableJS[key];
      allCssForJS += cssFileContent + ' ';
      allJS += jsFileContent + ' ';
    });
    zipFolder.file(`${this.fileName}.js`, allJS);
    zipFolder.file(`${this.fileName}.min.js`, allJS);
    return allCssForJS;
  }

  private static addCSSFiles(customCss: string, cssForJS: string, zipFolder: JSZip): void {
    const allCss = customCss + cssForJS;
    zipFolder.file(`${this.fileName}.css`, allCss);
    zipFolder.file(`${this.fileName}.min.css`, allCss);
  }

  static downloadZip(customCss: string, customJS: any): void {
    const zipFolder = this.createZipFolder();
    const cssForJS = this.addJSFiles(customJS, zipFolder);
    this.addCSSFiles(customCss, cssForJS, zipFolder);
    this.download(zipFolder);
  }
}
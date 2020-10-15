import JSZip from 'jszip';

export default class Downloadfiles {

  static cssFileName = 'cssimphony';

  private static createZipFolder(cssFileContent: string): JSZip {
    const zip = new JSZip();
    const zipFolder = zip.folder('cssimphony');
    zipFolder.file(`${this.cssFileName}.css`, cssFileContent);
    zipFolder.file(`${this.cssFileName}.min.css`, cssFileContent);
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

  // cssFileContent will need to be an object containing relative css content
  static downloadZip(cssFileContent: string): void {
    this.download(this.createZipFolder(cssFileContent));
  }
}
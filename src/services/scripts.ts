import { DOM_LOCATIONS } from '../consts/domLocations.enum';

export default class Scripts {
  static addScripts(...path: string[]): Promise<string[]> {
    const promises = [];
    for (let i = 0; i < path.length; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.onload = () => resolve();
        scriptElement.onerror = () => reject();
        scriptElement.setAttribute('src', path[i]);
        document.head.appendChild(scriptElement);
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  static addScriptsSequentially(scripts: (string | string[])[], location: DOM_LOCATIONS, indexArg?: number): void {
    let index = indexArg;
    if (index === undefined) { index = 0; }
    if (index >= scripts.length) return;
    const test = Array.isArray(scripts[index]) ? scripts[index] : [scripts[index]];
    this.addScripts.apply(null, test)
    .then(() => {
      this.addScriptsSequentially(scripts, location, index + 1);
    })
    .catch((e) => {
      console.log('Failed to load a script:')
      console.log(e);
    });
  // if we fail to load a certain script, display that as a toaster alert and do not show the component
  }
}

export default class Scripts {
  public static addScripts(...paths: string[]): Promise<string[]> {
    const promises = [];
    for (let i = 0; i < paths.length; i += 1) {
      const promise = new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.onload = () => resolve('success');
        scriptElement.onerror = () => reject();
        scriptElement.setAttribute('src', paths[i]);
        document.head.appendChild(scriptElement);
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  public static addScriptsSequentially(paths: (string | string[])[], index?: number): void {
    if (index === undefined) { index = 0; }
    if (index >= paths.length) return;
    const extractedPaths = Array.isArray(paths[index]) ? paths[index] : [paths[index]];
    this.addScripts.apply(null, extractedPaths)
    .then(() => {
      this.addScriptsSequentially(paths, index + 1);
    })
    .catch((e: HTMLScriptElement) => {
      console.log('Failed to load the following script:')
      console.log(e);
    });
  // if we fail to load a certain script, display that as a toaster alert and do not show the component
  }
}

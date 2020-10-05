
export default class Scripts {
  static addScriptsToHead(...path: string[]): Promise<string[]> {
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
}

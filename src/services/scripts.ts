
export default class Scripts {
  static addScriptsToDom(...path: string[]): void {
    for (let i = 0; i < path.length; i += 1) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', path[i]);
      document.head.appendChild(scriptElement);
    }
  }
}

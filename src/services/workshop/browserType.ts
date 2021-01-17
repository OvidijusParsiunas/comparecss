export default class BrowserType {
  
  public static isFirefox(): boolean {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  public static isChromium(): boolean {
    return !!(window as any).chrome;
  }
}

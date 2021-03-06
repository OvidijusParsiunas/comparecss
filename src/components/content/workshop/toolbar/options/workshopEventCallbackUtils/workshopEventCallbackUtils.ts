export class WorkshopEventCallbackUtils {
  
  public static getParentElementIfSvg(clickedElement: HTMLElement): HTMLElement {
    if (clickedElement.tagName === 'path') {
      clickedElement = clickedElement.parentElement;
    }
    if (clickedElement.tagName === 'svg') {
      clickedElement = clickedElement.parentElement;
    }
    return clickedElement;
  }
}

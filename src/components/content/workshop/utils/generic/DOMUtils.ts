export class DOMUtils {
  
  public static bubbleUnsetElementDisplayNoneProperty(element: HTMLElement): void {
    if (element.style.display === 'none') {
      element.style.display = '';
      return;
    }
    DOMUtils.bubbleUnsetElementDisplayNoneProperty(element.parentElement);
  }
}

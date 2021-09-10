import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../../../../consts/subcomponentSelectModeDisabledElementClass';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';

export class SubcomponentSelectModeSubOverlay {

  public static toggleDisabledSubcomponentPointerEvents(pointerEvents: ''|'none'): void {
    const subcomponentsElementsTobeDisabled = document.getElementsByClassName(SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS);
    Array.from(subcomponentsElementsTobeDisabled).forEach((subcomponentElement: HTMLElement) => {
      subcomponentElement.style.pointerEvents = pointerEvents;
    });
  }

  private static activateSubOverlays(): void {
    const overlayElementsToBeMadeActive = document.getElementsByClassName(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
    Array.from(overlayElementsToBeMadeActive).forEach((overlayElement: HTMLElement) => {
      overlayElement.style.display = 'block';
      const subOverlay = Array.from(overlayElement.childNodes)
        .find((overlayChild: HTMLElement) => {
          return overlayChild instanceof HTMLElement && overlayChild.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)}) as HTMLElement;
      subOverlay.style.width = `${overlayElement.clientWidth}px`;
      subOverlay.style.height = `${overlayElement.clientHeight}px`;
    });
  }

  public static display(): void {
    SubcomponentSelectModeSubOverlay.toggleDisabledSubcomponentPointerEvents('none');
    setTimeout(SubcomponentSelectModeSubOverlay.activateSubOverlays);
  }
}

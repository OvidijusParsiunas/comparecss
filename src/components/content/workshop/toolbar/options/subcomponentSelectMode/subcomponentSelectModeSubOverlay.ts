import { SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS } from '../../../../../../consts/subcomponentSelectModeDisabledElementClass';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';

export class SubcomponentSelectModeSubOverlay {

  public static toggleDisabledSubcomponentPointerEvents(pointerEvents: ''|'none'): void {
    const subcomponentsTobeDisabled = document.getElementsByClassName(SUBCOMPONENT_SELECT_MODE_DISABLED_ELEMENT_CLASS);
    Array.from(subcomponentsTobeDisabled).forEach((subcomponent: HTMLElement) => {
      subcomponent.style.pointerEvents = pointerEvents;
    });
  }

  private static activateSubOverlays(): void {
    const overlayElementsToBeMadeActive = document.getElementsByClassName(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER);
    Array.from(overlayElementsToBeMadeActive).forEach((overlay: HTMLElement) => {
      overlay.style.display = 'block';
      const subOverlay = Array.from(overlay.childNodes)
        .find((overlayChild: HTMLElement) => {
          return overlayChild instanceof HTMLElement && overlayChild.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)}) as HTMLElement;
      subOverlay.style.width = `${overlay.clientWidth}px`
      subOverlay.style.height = `${overlay.clientHeight}px`
    });
  }

  public static displaySubOverlays(): void {
    SubcomponentSelectModeSubOverlay.toggleDisabledSubcomponentPointerEvents('none');
    setTimeout(SubcomponentSelectModeSubOverlay.activateSubOverlays);
  }
}

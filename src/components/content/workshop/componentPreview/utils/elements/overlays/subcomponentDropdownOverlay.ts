import { subcomponentSelectModeState } from '../../../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';
import { OverlayElementUtils } from './utils/overlayElementUtils';

type DisplayValues = 'block'|'none';

export class SubcomponentDropdownOverlay {

  private static toggleSubcomponentOverlayContainerDisplay(subcomponentOverlayElement: HTMLElement, displayValue: DisplayValues): void {
    if (!subcomponentSelectModeState.getIsSubcomponentSelectModeActiveState() || displayValue === 'block') {
      subcomponentOverlayElement.style.backgroundColor = SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR;
      subcomponentOverlayElement.style.display = displayValue;
    } else {
      subcomponentOverlayElement.style.backgroundColor = '';
    }
  }

  private static toggleSubcomponentOverlay(overlayElement: HTMLElement, displayValue: DisplayValues): void {
    if (overlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB_CONTAINER)) {
      SubcomponentDropdownOverlay.toggleSubcomponentOverlayContainerDisplay(overlayElement, displayValue);
    } else {
      overlayElement.style.display = displayValue;
    }
  }

  public static toggle(subcomponentName: string, displayValue: DisplayValues): void {
    const overlayElements = OverlayElementUtils.getOverlayElements(subcomponentName);
    overlayElements.forEach((overlayElement) => {
      SubcomponentDropdownOverlay.toggleSubcomponentOverlay(overlayElement, displayValue);
    });
  }
}

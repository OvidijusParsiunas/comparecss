import { subcomponentAndOverlayElementIdsState } from '../../../subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentSelectModeState } from '../../../subcomponentSelectMode/subcomponentSelectModeState';

type DisplayValues = 'block'|'none';

// WORK 2 - potentially move out
export class SubcomponentDropdownOverlaysToggling {

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
      SubcomponentDropdownOverlaysToggling.toggleSubcomponentOverlayContainerDisplay(overlayElement, displayValue);
    } else {
      overlayElement.style.display = displayValue;
    }
  }

  // WORK 2 - move out
  private static getElementOverlays(activeSubcomponentName: string): HTMLElement[] {
    const elementIds = subcomponentAndOverlayElementIdsState.getPaddingComponentOverlayIdsViaSubcomponentName(activeSubcomponentName)
      || [subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentName(activeSubcomponentName)];
    return elementIds.map((elementId) => document.getElementById(elementId));
  }

  public static toggle(subcomponentName: string, displayValue: DisplayValues): void {
    const overlayElements = SubcomponentDropdownOverlaysToggling.getElementOverlays(subcomponentName);
    overlayElements.forEach((overlayElement) => {
      SubcomponentDropdownOverlaysToggling.toggleSubcomponentOverlay(overlayElement, displayValue);
    });
  }
}

import { subcomponentSelectModeState } from '../../../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../../../consts/subcomponentOverlayBackgroundColor';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../../consts/subcomponentOverlayClasses.enum';
import { subcomponentAndOverlayElementIdsState } from '../subcomponentAndOverlayElementIdsState';

export class SubcomponentSelectModeOverlay {

  public static hideLastHighlighted(): void {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      if (lastHighlightedOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)) {
        lastHighlightedOverlayElement.parentElement.style.backgroundColor = '';
      } else {
        lastHighlightedOverlayElement.style.display = 'none';
      }
    }
  }

  public static displaySubOverlayParent(targetElement: HTMLElement): void {
    targetElement.parentElement.style.backgroundColor = SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR;
    subcomponentSelectModeState.addNewHighlightedOverlayElementToState(targetElement);
  }

  public static display(targetElement: HTMLElement): void {
    const overlayId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentId(targetElement.id);
    const overlayElement = document.getElementById(overlayId);
    if (overlayElement) {
      overlayElement.style.display = 'block';
      subcomponentSelectModeState.addNewHighlightedOverlayElementToState(overlayElement);
    }
  }
}

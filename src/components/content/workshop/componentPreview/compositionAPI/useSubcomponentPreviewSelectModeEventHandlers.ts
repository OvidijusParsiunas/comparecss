import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR } from '../../../../../consts/subcomponentOverlayBackgroundColor';
import { subcomponentAndOverlayElementIdsState } from '../utils/elements/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';

export default function useSubcomponentPreviewSelectModeEventHandlers(): UseSubcomponentPreviewEventHandlers {

  function hideLastHighlightedOverlayElement(): void {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      if (lastHighlightedOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)) {
        lastHighlightedOverlayElement.parentElement.style.backgroundColor = '';
      } else {
        lastHighlightedOverlayElement.style.display = 'none';
      }
    }
  }

  function highlightSubOverlayParent(targetElement: HTMLElement): void {
    targetElement.parentElement.style.backgroundColor = SUBCOMPONENT_OVERLAY_BACKGROUND_COLOR;
    subcomponentSelectModeState.addNewHighlightedOverlayElementToState(targetElement);
  }

  function highlightOverlay(targetElement: HTMLElement): void {
    const overlayId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentId(targetElement.id);
    const overlayElement = document.getElementById(overlayId);
    if (overlayElement) {
      overlayElement.style.display = 'block';
      subcomponentSelectModeState.addNewHighlightedOverlayElementToState(overlayElement);
    }
  }

  const subcomponentMouseEnter = (): void => {
    hideLastHighlightedOverlayElement();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)) {
      highlightSubOverlayParent(targetElement);
    } else {
      highlightOverlay(targetElement);
    }
  }

  const subcomponentMouseLeave = (): void => {
    hideLastHighlightedOverlayElement();
    subcomponentSelectModeState.removeLastHighlightedOverlayElementFromState();
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      lastHighlightedOverlayElement.style.display = 'block';
    }
  }

  const subcomponentMouseDown = (): void => { return; }

  const subcomponentMouseUp = (): void => { return; };

  const subcomponentClick = (): void => { return; };

  return {
    subcomponentMouseEnter,
    subcomponentMouseLeave,
    subcomponentMouseDown,
    subcomponentMouseUp,
    subcomponentClick,
  };
}

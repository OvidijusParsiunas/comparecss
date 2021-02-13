import { subcomponentAndOverlayElementIdsState } from '../../toolbar/options/subcomponentSelectMode/subcomponentAndOverlayElementIdsState';
import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';

export default function useSubcomponentPreviewSelectModeEventHandlers(): UseSubcomponentPreviewEventHandlers {

  function hideLastHighlightedOverlayElement(): void {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      lastHighlightedOverlayElement.style.display = 'none';
    }
  }

  const subcomponentMouseEnter = (): void => {
    hideLastHighlightedOverlayElement();
    const overlayId = subcomponentAndOverlayElementIdsState.getOverlayIdViaSubcomponentId((event.target as HTMLElement).id);
    const overlayElement = document.getElementById(overlayId);
    if (overlayElement) {
      overlayElement.style.display = 'block';
      subcomponentSelectModeState.addNewHighlightedOverlayElementToState(overlayElement);
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
  
  return {
    subcomponentMouseEnter,
    subcomponentMouseLeave,
    subcomponentMouseDown,
    subcomponentMouseUp,
  };
}

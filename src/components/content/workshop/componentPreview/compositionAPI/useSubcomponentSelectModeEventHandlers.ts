import { subcomponentSelectModeState } from '../../toolbar/options/subcomponentSelectMode/subcomponentSelectModeState';
import { UseSubcomponentPreviewEventHandlers } from '../../../../../interfaces/useSubcomponentPreviewEventHandlers';
import { SubcomponentSelectModeOverlay } from '../utils/elements/overlays/subcomponentSelectModeOverlay';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../consts/subcomponentOverlayClasses.enum';

export default function useSubcomponentSelectModeEventHandlers(): UseSubcomponentPreviewEventHandlers {

  const subcomponentMouseEnter = (): void => {
    SubcomponentSelectModeOverlay.hideLastHighlighted();
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)) {
      SubcomponentSelectModeOverlay.displaySubOverlayParent(targetElement);
    } else {
      SubcomponentSelectModeOverlay.display(targetElement);
    }
  };

  const subcomponentMouseLeave = (): void => {
    SubcomponentSelectModeOverlay.hideLastHighlighted();
    subcomponentSelectModeState.removeLastHighlightedOverlayElementFromState();
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      lastHighlightedOverlayElement.style.display = 'block';
    }
  };

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

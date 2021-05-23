import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { subcomponentAndOverlayElementIdsState } from './subcomponentAndOverlayElementIdsState';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { subcomponentSelectModeState } from './subcomponentSelectModeState';

export type SubcomponentSelectModeCallbackFunction = (
    buttonElement: HTMLElement,
    optionsSubcomponentNameClickedFunc: (param1: string) => void,
    componentPreviewTriggerCallback: (param1: boolean) => void,
  ) => WorkshopEventCallbackReturn;

export default class SubcomponentSelectMode {

  private static end(buttonElement: HTMLElement, optionsSubcomponentNameClickedFunc: (param1: string) => void,
      componentPreviewTriggerCallback: (param1: boolean) => void): WorkshopEventCallbackReturn {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      const overlayElement = lastHighlightedOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)
        ? lastHighlightedOverlayElement.parentElement : lastHighlightedOverlayElement;
      overlayElement.style.display = 'none';
      const subcomponentName = subcomponentAndOverlayElementIdsState.getSubcomponentNameViaOverlayId(overlayElement.id);
      optionsSubcomponentNameClickedFunc(subcomponentName);
    }
    buttonElement.style.color = FONT_AWESOME_COLORS.DEFAULT;
    subcomponentSelectModeState.removeAllHighlightedOverlayElementsFromState();
    if (!(event.target as HTMLElement).classList.contains(SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER)) {
      subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
    }
    componentPreviewTriggerCallback(false);
    return { shouldRepeat: false };
  }

  public static initiate(buttonElement: HTMLElement): SubcomponentSelectModeCallbackFunction {
    subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(true);
    buttonElement.style.color = FONT_AWESOME_COLORS.ACTIVE;
    return SubcomponentSelectMode.end;
  }
}

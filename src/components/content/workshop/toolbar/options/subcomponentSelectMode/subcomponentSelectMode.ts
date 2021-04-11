import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { subcomponentAndOverlayElementIdsState } from './subcomponentAndOverlayElementIdsState';
import { subcomponentSelectModeState } from './subcomponentSelectModeState';

export type SubcomponentSelectModeCallbackFunction = (
    buttonElement: HTMLElement,
    optionsSubcomponentNameClickedFunc: (param1: string) => void,
    componentPreviewTriggerCallback: (param1: boolean) => void,
  ) => WorkshopEventCallbackReturn;

export default class SubcomponentSelectMode {
  
  private static activeButtonColor = '#54a9f1';
  private static defaultButtonColor = '';
  // blue - #00a1ff'

  private static end(buttonElement: HTMLElement, optionsSubcomponentNameClickedFunc: (param1: string) => void,
      componentPreviewTriggerCallback: (param1: boolean) => void): WorkshopEventCallbackReturn {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      lastHighlightedOverlayElement.style.display = 'none';
      const subcomponentName = subcomponentAndOverlayElementIdsState.getSubcomponentNameViaOverlayId(lastHighlightedOverlayElement.id);
      optionsSubcomponentNameClickedFunc(subcomponentName);
    }
    buttonElement.style.color = SubcomponentSelectMode.defaultButtonColor;
    subcomponentSelectModeState.removeAllHighlightedOverlayElementsFromState();
    if (!(event.target as HTMLElement).classList.contains(SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER)) {
      subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
    }
    componentPreviewTriggerCallback(false);
    return { shouldRepeat: false };
  }

  public static initiate(buttonElement: HTMLElement): SubcomponentSelectModeCallbackFunction {
    subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(true);
    buttonElement.style.color = this.activeButtonColor;
    return SubcomponentSelectMode.end;
  }
}

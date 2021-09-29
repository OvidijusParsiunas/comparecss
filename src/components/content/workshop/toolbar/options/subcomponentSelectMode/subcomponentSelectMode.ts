import { subcomponentAndOverlayElementIdsState } from '../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { COMPONENT_CARD_MARKER, SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { WorkshopEventCallback } from '../../../../../../interfaces/workshopEventCallback';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { subcomponentSelectModeState } from './subcomponentSelectModeState';
import ComponentJs from '../../../utils/generic/componentJs';

type AddWorkshopEventCallback = (workshopEventCallback: WorkshopEventCallback) => void;

export type SubcomponentSelectModeCallbackFunction = (
    buttonElement: HTMLElement,
    optionsSubcomponentNameClickedFunc: (param1: string) => void,
    componentPreviewTriggerCallback: (param1: boolean) => void,
    addWorkshopEventCallback: AddWorkshopEventCallback,
    componentType: COMPONENT_TYPES,
  ) => WorkshopEventCallbackReturn;

export default class SubcomponentSelectMode {

  private static initializeJs(): WorkshopEventCallbackReturn {
    const componentType = this as any as COMPONENT_TYPES;
    ComponentJs.manipulateJSClasses(componentType, 'initializeJS');
    return  { shouldRepeat: false };
  }

  private static reinitializeJsOnMouseUp(addWorkshopEventCallback: AddWorkshopEventCallback, componentType: COMPONENT_TYPES): void {
    setTimeout(() => {
      const workshopEventCallback: WorkshopEventCallback = { keyTriggers: new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP]),
        func: SubcomponentSelectMode.initializeJs.bind(componentType) };
      addWorkshopEventCallback(workshopEventCallback); 
    });
  }

  private static callbackViaClickedElementClass(clickedElementClasslist: DOMTokenList,
      addWorkshopEventCallback: AddWorkshopEventCallback, componentType: COMPONENT_TYPES): void {
    if (!clickedElementClasslist.contains(SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER)) {
      subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
    }
    if (!clickedElementClasslist.contains(COMPONENT_CARD_MARKER)) {
      SubcomponentSelectMode.reinitializeJsOnMouseUp(addWorkshopEventCallback, componentType);
    }
  }

  private static selectSubcomponent(lastHighlightedOverlayElement: HTMLElement,
      optionsSubcomponentNameClickedFunc: (param1: string) => void): void {
    const overlayElement = lastHighlightedOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)
      ? lastHighlightedOverlayElement.parentElement : lastHighlightedOverlayElement;
    overlayElement.style.display = 'none';
    const subcomponentName = subcomponentAndOverlayElementIdsState.getSubcomponentNameViaOverlayId(overlayElement.id);
    optionsSubcomponentNameClickedFunc(subcomponentName);
  }

  private static end(buttonElement: HTMLElement, optionsSubcomponentNameClickedFunc: (param1: string) => void,
      componentPreviewTriggerCallback: (param1: boolean) => void, addWorkshopEventCallback: AddWorkshopEventCallback,
      componentType: COMPONENT_TYPES): WorkshopEventCallbackReturn {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (lastHighlightedOverlayElement) {
      SubcomponentSelectMode.selectSubcomponent(lastHighlightedOverlayElement, optionsSubcomponentNameClickedFunc);
    }
    buttonElement.style.color = FONT_AWESOME_COLORS.DEFAULT;
    subcomponentSelectModeState.removeAllHighlightedOverlayElementsFromState();
    SubcomponentSelectMode.callbackViaClickedElementClass((event.target as HTMLElement).classList, addWorkshopEventCallback, componentType);
    componentPreviewTriggerCallback(false);
    return { shouldRepeat: false };
  }

  public static initiate(buttonElement: HTMLElement, componentType: COMPONENT_TYPES): SubcomponentSelectModeCallbackFunction {
    subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(true);
    buttonElement.style.color = FONT_AWESOME_COLORS.ACTIVE;
    ComponentJs.manipulateJSClasses(componentType, 'revokeJS');
    return SubcomponentSelectMode.end;
  }
}

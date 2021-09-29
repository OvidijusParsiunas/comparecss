import { subcomponentAndOverlayElementIdsState } from '../../../componentPreview/utils/elements/subcomponentAndOverlayElementIdsState';
import { SUBCOMPONENT_OVERLAY_CLASSES } from '../../../../../../consts/subcomponentOverlayClasses.enum';
import { WorkshopEventCallbackReturn } from '../../../../../../interfaces/workshopEventCallbackReturn';
import { SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER } from '../../../../../../consts/elementClassMarkers';
import { DOM_EVENT_TRIGGER_KEYS } from '../../../../../../consts/domEventTriggerKeys.enum';
import ComponentJs from '../../../utils/componentManipulation/componentJs/componentJs';
import { FONT_AWESOME_COLORS } from '../../../../../../consts/fontAwesomeColors.enum';
import { COMPONENT_TYPES } from '../../../../../../consts/componentTypes.enum';
import { subcomponentSelectModeState } from './subcomponentSelectModeState';

export type SubcomponentSelectModeCallbackFunction = (
    buttonElement: HTMLElement,
    optionsSubcomponentNameClickedFunc: (param1: string) => void,
    componentPreviewTriggerCallback: (param1: boolean) => void,
    componentType: COMPONENT_TYPES,
  ) => WorkshopEventCallbackReturn;

export default class SubcomponentSelectMode {

  private static reinitializeJs(): WorkshopEventCallbackReturn {
    const componentType = this as any as COMPONENT_TYPES;
    ComponentJs.manipulateJSClasses(componentType, 'initializeJS');
    return  { shouldRepeat: false };
  }

  private static selectSubcomponentIfHighlighted(optionsSubcomponentNameClickedFunc: (param1: string) => void): void {
    const lastHighlightedOverlayElement = subcomponentSelectModeState.getLastHighlightedOverlayElementState();
    if (!lastHighlightedOverlayElement) return;
    const overlayElement = lastHighlightedOverlayElement.classList.contains(SUBCOMPONENT_OVERLAY_CLASSES.SUB)
      ? lastHighlightedOverlayElement.parentElement : lastHighlightedOverlayElement;
    overlayElement.style.display = 'none';
    const subcomponentName = subcomponentAndOverlayElementIdsState.getSubcomponentNameViaOverlayId(overlayElement.id);
    optionsSubcomponentNameClickedFunc(subcomponentName);
  }

  private static end(buttonElement: HTMLElement, optionsSubcomponentNameClickedFunc: (param1: string) => void,
      componentPreviewTriggerCallback: (param1: boolean) => void, componentType: COMPONENT_TYPES): WorkshopEventCallbackReturn {
    SubcomponentSelectMode.selectSubcomponentIfHighlighted(optionsSubcomponentNameClickedFunc);
    buttonElement.style.color = FONT_AWESOME_COLORS.DEFAULT;
    subcomponentSelectModeState.removeAllHighlightedOverlayElementsFromState();
    if (!(event.target as HTMLElement).classList.contains(SUBCOMPONENT_SELECT_MODE_BUTTON_MARKER)) {
      subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(false);
    }
    componentPreviewTriggerCallback(false);
    const keyTriggers = new Set([DOM_EVENT_TRIGGER_KEYS.MOUSE_UP]);
    return { shouldRepeat: false, newCallback: { keyTriggers, func: SubcomponentSelectMode.reinitializeJs.bind(componentType) } };
  }

  public static initiate(buttonElement: HTMLElement, componentType: COMPONENT_TYPES): SubcomponentSelectModeCallbackFunction {
    subcomponentSelectModeState.setIsSubcomponentSelectModeActiveState(true);
    buttonElement.style.color = FONT_AWESOME_COLORS.ACTIVE;
    ComponentJs.manipulateJSClasses(componentType, 'revokeJS');
    return SubcomponentSelectMode.end;
  }
}

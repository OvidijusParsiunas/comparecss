import useSubcomponentPreviewSelectModeEventHandlers from '../compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { DROPDOWN_OPTION_DISPLAY_STATUS_REF } from '../../../../../interfaces/dropdownOptionDisplayStatus';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';
import { COMPONENT_PREVIEW_MARKER } from '../../../../../consts/elementClassMarkers';

interface Index {
  number: number;
}

export default class ComponentPreviewUtils {
  
  private static readonly SUBCOMPONENT_ID_PREFIX = 'subcomponent-id-';
  private static readonly OVERLAY_ID_PREFIX = 'overlay-id-';

  private static addIdsViaTraversalOfSubcomponents(subcomponents: Subcomponents,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    Object.keys(subcomponents).forEach((subcomponentName: string, index: number) => {
      subcomponentAndOverlayElementIdsObject[subcomponentName] = {
        subcomponentId: `${ComponentPreviewUtils.SUBCOMPONENT_ID_PREFIX}${index}`,
        overlayId: `${ComponentPreviewUtils.OVERLAY_ID_PREFIX}${index}`,
      };
    });
  }

  private static addIdsViaTraversalOfNestedDropdownStructure(subcomponentDropdownStructure: NestedDropdownStructure, index: Index,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    Object.keys(subcomponentDropdownStructure).forEach((subcomponentName: string) => {
      if (subcomponentName === DROPDOWN_OPTION_DISPLAY_STATUS_REF) return;
      subcomponentAndOverlayElementIdsObject[subcomponentName] = {
        subcomponentId: `${ComponentPreviewUtils.SUBCOMPONENT_ID_PREFIX}${index.number}`,
        overlayId: `${ComponentPreviewUtils.OVERLAY_ID_PREFIX}${index.number}`,
      };
      index.number += 1;
      if (Object.keys(subcomponentDropdownStructure[subcomponentName]).length > 1 || !subcomponentDropdownStructure[subcomponentName][DROPDOWN_OPTION_DISPLAY_STATUS_REF]) {
        ComponentPreviewUtils.addIdsViaTraversalOfNestedDropdownStructure(subcomponentDropdownStructure[subcomponentName] as NestedDropdownStructure,
          index, subcomponentAndOverlayElementIdsObject);
      }
    });
  }

  public static generateSubcomponentAndOverlayIds(component: WorkshopComponent, initialNumber = 0): SubcomponentAndOverlayElementIds {
    const subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};
    if (component.componentPreviewStructure.subcomponentDropdownStructure) {
      const index = { number: initialNumber };
      ComponentPreviewUtils.addIdsViaTraversalOfNestedDropdownStructure(component.componentPreviewStructure.subcomponentDropdownStructure,
        index, subcomponentAndOverlayElementIdsObject);
    } else {
      ComponentPreviewUtils.addIdsViaTraversalOfSubcomponents(component.subcomponents, subcomponentAndOverlayElementIdsObject);
    }
    return subcomponentAndOverlayElementIdsObject;
  }

  public static generateMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds,
      subcomponents: Subcomponents, clickCallback?: () => void): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = {
        ...useSubcomponentPreviewEventHandlers(subcomponents[subcomponentName], clickCallback) };
    });
    return mouseEvents;
  }

  public static generateSubcomponentSelectModeMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = { ...useSubcomponentPreviewSelectModeEventHandlers() };
    });
    return mouseEvents;
  }

  private static addNewClassToSubcomponentsWithExistingClass(existingClass: string, newClass: string): void {
    const elements = document.querySelectorAll(`.${existingClass}`);
    elements.forEach((element) => { element.classList.add(newClass); });
  }

  private static removeClassFromAllElements(classToRemove: string): void {
    const elements = document.querySelectorAll(`.${classToRemove}`);
    elements.forEach((element) => { element.classList.remove(classToRemove); });
  }

  public static setAllSubcomponentsCursorsToPointer(): void {
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(COMPONENT_PREVIEW_MARKER, SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
  }

  public static unsetAllSubcomponentsCursorsFromPointer(): void {
    ComponentPreviewUtils.removeClassFromAllElements(SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
  }
}

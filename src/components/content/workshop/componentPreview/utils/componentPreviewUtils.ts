import useSubcomponentPreviewSelectModeEventHandlers from '../compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../interfaces/nestedDropdownStructure';

interface Index {
  number: number;
}

export default class ComponentPreviewUtils {
  
  private static subcomponentIdPrefix = 'subcomponent-id-';
  private static overlayIdPrefix = 'overlay-id-';

  private static addIdsViaTraversalOfSubcomponents(subcomponents: Subcomponents,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    Object.keys(subcomponents).forEach((subcomponentName: string, index: number) => {
      subcomponentAndOverlayElementIdsObject[subcomponentName] = {
        subcomponentId: `${ComponentPreviewUtils.subcomponentIdPrefix}${index}`,
        overlayId: `${ComponentPreviewUtils.overlayIdPrefix}${index}`,
      };
    });
  }

  private static addIdsViaTraversalOfNestedDropdownStructure(subcomponents: NestedDropdownStructure, index: Index,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    Object.keys(subcomponents).forEach((subcomponentName: string) => {
      subcomponentAndOverlayElementIdsObject[subcomponentName] = {
        subcomponentId: `${ComponentPreviewUtils.subcomponentIdPrefix}${index.number}`,
        overlayId: `${ComponentPreviewUtils.overlayIdPrefix}${index.number}`,
      };
      index.number += 1;
      if (Object.keys(subcomponents[subcomponentName]).length > 0 && subcomponents[subcomponentName].currentlyDisplaying === undefined) {
        ComponentPreviewUtils.addIdsViaTraversalOfNestedDropdownStructure(subcomponents[subcomponentName] as NestedDropdownStructure,
          index, subcomponentAndOverlayElementIdsObject);
      }
    });
  }

  public static generateSubcomponentAndOverlayIds(component: WorkshopComponent): SubcomponentAndOverlayElementIds {
    const subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};
    if (component.componentPreviewStructure.subcomponentDropdownStructure) {
      const index = { number: 0 };
      ComponentPreviewUtils.addIdsViaTraversalOfNestedDropdownStructure(component.componentPreviewStructure.subcomponentDropdownStructure,
        index, subcomponentAndOverlayElementIdsObject);
    } else {
      ComponentPreviewUtils.addIdsViaTraversalOfSubcomponents(component.subcomponents, subcomponentAndOverlayElementIdsObject);
    }
    return subcomponentAndOverlayElementIdsObject;
  }

  public static generateMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds, subcomponents: Subcomponents): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentName: string) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentName].subcomponentId] = { ...useSubcomponentPreviewEventHandlers(subcomponents[subcomponentName]) };
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
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(SUBCOMPONENT_CURSOR_CLASSES.AUTO, SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
    ComponentPreviewUtils.addNewClassToSubcomponentsWithExistingClass(SUBCOMPONENT_CURSOR_CLASSES.DEFAULT, SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
  }

  public static unsetAllSubcomponentsCursorsFromPointer(): void {
    ComponentPreviewUtils.removeClassFromAllElements(SUBCOMPONENT_CURSOR_CLASSES.SELECT_MODE);
  }
}

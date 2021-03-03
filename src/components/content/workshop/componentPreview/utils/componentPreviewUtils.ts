import useSubcomponentPreviewSelectModeEventHandlers from '../compositionAPI/useSubcomponentPreviewSelectModeEventHandlers';
import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SubcomponentPreviewMouseEvents } from '../../../../../interfaces/subcomponentPreviewMouseEvents';
import useSubcomponentPreviewEventHandlers from '../compositionAPI/useSubcomponentPreviewEventHandlers';
import { SUBCOMPONENT_CURSOR_CLASSES } from '../../../../../consts/subcomponentCursorClasses.enum';
import { SUB_COMPONENTS } from '../../../../../consts/subcomponentModes.enum';
import { Subcomponents } from '../../../../../interfaces/workshopComponent';

export default class ComponentPreviewUtils {
  
  private static subcomponentIdPrefix = 'subcomponent-id-';
  private static overlayIdPrefix = 'overlay-id-';

  public static generateSubcomponentAndOverlayIds(subcomponents: Subcomponents): SubcomponentAndOverlayElementIds {
    const subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};
    Object.keys(subcomponents).forEach((subcomponent: SUB_COMPONENTS, index: number) => {
      subcomponentAndOverlayElementIdsObject[subcomponent] = {
        subcomponentId: `${ComponentPreviewUtils.subcomponentIdPrefix}${index}`,
        overlayId: `${ComponentPreviewUtils.overlayIdPrefix}${index}`,
      };
    });
    return subcomponentAndOverlayElementIdsObject;
  }

  public static generateMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds, subcomponents: Subcomponents): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentType: SUB_COMPONENTS) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentType].subcomponentId] = { ...useSubcomponentPreviewEventHandlers(subcomponents[subcomponentType]) };
    });
    return mouseEvents;
  }

  public static generateSubcomponentSelectModeMouseEvents(subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): SubcomponentPreviewMouseEvents {
    const mouseEvents: SubcomponentPreviewMouseEvents = {};
    Object.keys(subcomponentAndOverlayElementIdsObject).forEach((subcomponentType: SUB_COMPONENTS) => {
      mouseEvents[subcomponentAndOverlayElementIdsObject[subcomponentType].subcomponentId] = { ...useSubcomponentPreviewSelectModeEventHandlers() };
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

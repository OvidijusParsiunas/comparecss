import { SubcomponentAndOverlayElementIds } from '../../../../../interfaces/subcomponentAndOverlayElementIds';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';

export class SubcomponentAndOverlayIds {

  private static readonly SUBCOMPONENT_ID_PREFIX = 'subcomponent-id-';
  private static readonly OVERLAY_ID_PREFIX = 'overlay-id-';

  private static addPaddingComponentAuxiliaryComponentOverlayIds(paddingComponentChild: WorkshopComponent, paddingComponentBaseName: string,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    paddingComponentChild.linkedComponents.auxiliary.forEach((auxiliaryComponent) => {
      const auxiliaryComponentBaseName = auxiliaryComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
      subcomponentAndOverlayElementIdsObject[paddingComponentBaseName].paddingComponentOverlayIds
        .push(subcomponentAndOverlayElementIdsObject[auxiliaryComponentBaseName].overlayId);
    });
  }

  private static setPaddingComponentBaseComponentOverlayId(paddingComponentChild: WorkshopComponent, paddingComponentBaseName: string,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    const paddingComponentMasterBaseName = paddingComponentChild.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    subcomponentAndOverlayElementIdsObject[paddingComponentBaseName].paddingComponentOverlayIds = [
      subcomponentAndOverlayElementIdsObject[paddingComponentMasterBaseName].overlayId,
    ];
  }

  private static setPaddingComponentOverlayIds(paddingComponents: WorkshopComponent[],
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    paddingComponents.forEach((paddingComponent) => {
      const { coreSubcomponentRefs, paddingComponentChild } = paddingComponent;
      const paddingComponentBaseName = coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
      SubcomponentAndOverlayIds.setPaddingComponentBaseComponentOverlayId(
        paddingComponentChild, paddingComponentBaseName, subcomponentAndOverlayElementIdsObject)
      SubcomponentAndOverlayIds.addPaddingComponentAuxiliaryComponentOverlayIds(
        paddingComponentChild, paddingComponentBaseName, subcomponentAndOverlayElementIdsObject);
    });
  }

  private static addPaddingComponents(component: WorkshopComponent, subcomponentName: string,
      paddingComponents: WorkshopComponent[]): void {
    if (component.subcomponents[subcomponentName].seedComponent.paddingComponentChild) {
      paddingComponents.push(component.subcomponents[subcomponentName].seedComponent);
    }
  }

  private static addSubcomponentAndOverlayIds(subcomponentName: string, index: number,
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds): void {
    subcomponentAndOverlayElementIdsObject[subcomponentName] = {
      subcomponentId: `${SubcomponentAndOverlayIds.SUBCOMPONENT_ID_PREFIX}${index}`,
      overlayId: `${SubcomponentAndOverlayIds.OVERLAY_ID_PREFIX}${index}`,
    };
  }

  private static generateIdsAndPaddingComponentObjects(component: WorkshopComponent): {
      subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds, paddingComponents: WorkshopComponent[]} {
    const subcomponentAndOverlayElementIdsObject: SubcomponentAndOverlayElementIds = {};
    const paddingComponents: WorkshopComponent[] = [];
    Object.keys(component.subcomponents).forEach((subcomponentName: string, index: number) => {
      if (!component.componentPreviewStructure.subcomponentNameToDropdownItemName[subcomponentName]) return;
      SubcomponentAndOverlayIds.addSubcomponentAndOverlayIds(subcomponentName, index, subcomponentAndOverlayElementIdsObject);
      SubcomponentAndOverlayIds.addPaddingComponents(component, subcomponentName, paddingComponents);
    });
    return { subcomponentAndOverlayElementIdsObject, paddingComponents };
  }


  public static generate(component: WorkshopComponent): SubcomponentAndOverlayElementIds {
    const { subcomponentAndOverlayElementIdsObject, paddingComponents } = SubcomponentAndOverlayIds.generateIdsAndPaddingComponentObjects(component);
    SubcomponentAndOverlayIds.setPaddingComponentOverlayIds(paddingComponents, subcomponentAndOverlayElementIdsObject);
    return subcomponentAndOverlayElementIdsObject;
  }
}

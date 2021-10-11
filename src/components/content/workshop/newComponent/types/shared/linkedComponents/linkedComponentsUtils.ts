import { DropdownItemsDisplayStatusUtils } from '../../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class LinkedComponentsUtils {

  private static updateBaseAndAuxiliaryDropdownStructures(baseComponent: WorkshopComponent, auxiliaryComponents: WorkshopComponent[]): void {
    const { subcomponentDropdownStructure } = baseComponent.componentPreviewStructure;
    const baseName = baseComponent.baseSubcomponent.name;
    subcomponentDropdownStructure[baseName][DROPDOWN_ITEM_AUX_DETAILS_REF] = { ...DropdownItemsDisplayStatusUtils.createDefaultItemDisplayStatus(baseName) };
    // WORK 2
    const parentComponentReferences = baseComponent.sync.syncComponentReferences.slice(1);
    auxiliaryComponents.forEach((auxiliaryComponent) => {
      const auxiliaryComponentName = auxiliaryComponent.baseSubcomponent.name;
      subcomponentDropdownStructure[auxiliaryComponentName] = { ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(auxiliaryComponentName) };
      auxiliaryComponent.sync.syncComponentReferences.push(...parentComponentReferences);
    });
  }

  private static assignAuxiliaryPropertiesToBase(baseComponentObj: unknown, auxiliaryComponentObjs: unknown[], propertyName: string): void {
    auxiliaryComponentObjs.forEach((auxiliaryComponent) => {
      Object.assign(baseComponentObj[propertyName], auxiliaryComponent[propertyName]);
    });
  }

  private static setLinkedComponentsPropertyOnAuxiliaryComponents(baseComponent: WorkshopComponent, auxiliaryComponents: WorkshopComponent[]): void {
    auxiliaryComponents.forEach((auxiliaryComponent) => {
      auxiliaryComponent.linkedComponents = { base: baseComponent };
      auxiliaryComponent.masterComponent = baseComponent;
    });
  }

  public static setAuxiliaryComponents(baseComponent: WorkshopComponent, ...auxiliaryComponents: WorkshopComponent[]): void {
    baseComponent.linkedComponents = { auxiliary: auxiliaryComponents };
    LinkedComponentsUtils.setLinkedComponentsPropertyOnAuxiliaryComponents(baseComponent, auxiliaryComponents)
    LinkedComponentsUtils.assignAuxiliaryPropertiesToBase(baseComponent, auxiliaryComponents, 'subcomponents');
    LinkedComponentsUtils.assignAuxiliaryPropertiesToBase(baseComponent.componentPreviewStructure,
      auxiliaryComponents.map((auxiliaryComponent) => auxiliaryComponent.componentPreviewStructure), 'subcomponentNameToDropdownItemName');
    LinkedComponentsUtils.updateBaseAndAuxiliaryDropdownStructures(baseComponent, auxiliaryComponents);
  }
}

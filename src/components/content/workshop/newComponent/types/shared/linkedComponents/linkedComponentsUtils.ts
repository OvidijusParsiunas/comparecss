import { DropdownItemsDisplayStatusUtils } from '../../../../utils/dropdownItemsDisplayStatusUtils/dropdownItemsDisplayStatusUtils';
import { DROPDOWN_ITEM_AUX_DETAILS_REF } from '../../../../../../../interfaces/dropdownItemDisplayStatus';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';

export class LinkedComponentsUtils {

  private static updateAuxiliaryDrodpownAndSyncableContainerComponents(auxiliaryComponent: WorkshopComponent, subcomponentDropdownStructure: NestedDropdownStructure,
      parentComponentReferences: WorkshopComponent[]): void {
    const auxiliaryComponentName = auxiliaryComponent.baseSubcomponent.name;
    subcomponentDropdownStructure[auxiliaryComponentName] = { ...DropdownItemsDisplayStatusUtils.createDropdownItemDisplayStatusReferenceObject(auxiliaryComponentName) };
    auxiliaryComponent.sync.syncables.containerComponents.push(...parentComponentReferences);
  }

  private static updateDropdownStructuresAndSyncableContainerComponents(baseComponent: WorkshopComponent, auxiliaryComponents: WorkshopComponent[]): void {
    const { subcomponentDropdownStructure } = baseComponent.componentPreviewStructure;
    const baseName = baseComponent.baseSubcomponent.name;
    subcomponentDropdownStructure[baseName][DROPDOWN_ITEM_AUX_DETAILS_REF] = { ...DropdownItemsDisplayStatusUtils.createDefaultItemDisplayStatus(baseName) };
    const parentComponentReferences = baseComponent.sync.syncables.containerComponents.slice(1);
    auxiliaryComponents.forEach((auxiliaryComponent) => {
      LinkedComponentsUtils.updateAuxiliaryDrodpownAndSyncableContainerComponents(auxiliaryComponent, subcomponentDropdownStructure, parentComponentReferences);
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
    LinkedComponentsUtils.updateDropdownStructuresAndSyncableContainerComponents(baseComponent, auxiliaryComponents);
  }
}

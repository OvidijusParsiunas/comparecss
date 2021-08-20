import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { AddNewGenericComponent } from './addNewGenericComponent';

type DropdownStructureSearchCallback = (
  parentComponent: WorkshopComponent,
  activeBaseComponent: WorkshopComponent,
  dropdownStructure: NestedDropdownStructure,
  ...args: unknown[]) => WorkshopComponent;

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static setParentComponentReference(newComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].parentBaseComponentRef = activeBaseComponent);
  }

  protected static createNewComponentViaGenerator(componentGenerator: ComponentGenerator, activeBaseComponent: WorkshopComponent,
      newComponentName: string): WorkshopComponent {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    AddNewComponentShared.setParentComponentReference(newComponent, activeBaseComponent);
    return newComponent;
  }

  private static proceedToInvokeAddCallbackIfFound(parentComponent: WorkshopComponent, activeBaseComponent: WorkshopComponent,
      callback: DropdownStructureSearchCallback, args: unknown[], componentTraversalState: ComponentTraversalState): WorkshopComponent {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      const newComponent = callback(parentComponent, activeBaseComponent, subcomponentDropdownStructure, ...args);
      return newComponent;
    }
    return null;
  }

  protected static addComponentViaDropdownStructureSearch(parentComponent: WorkshopComponent, callback: DropdownStructureSearchCallback,
      ...args: unknown[]): WorkshopComponent {
    // WORK1 - check if this affects anything
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(parentComponent);
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(activeBaseComponent, activeBaseComponent.activeSubcomponentName);
    return ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      activeBaseComponent.componentPreviewStructure.subcomponentDropdownStructure,
      AddNewGenericComponent.proceedToInvokeAddCallbackIfFound.bind(targetDetails,
        parentComponent, activeBaseComponent, callback, args)) as WorkshopComponent;
  }
}

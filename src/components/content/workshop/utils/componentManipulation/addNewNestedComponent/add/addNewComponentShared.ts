import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { NESTED_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { NestedComponentBaseNamesToStyles } from '../utils/nestedComponentBaseNamesToStyles';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
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
    const activeBaseComponent = ActiveComponentUtils.getActiveBaseComponent(parentComponent);
    const coreBaseComponent = activeBaseComponent.coreBaseComponent || activeBaseComponent;
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(coreBaseComponent, coreBaseComponent.activeSubcomponentName);
    return ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      coreBaseComponent.componentPreviewStructure.subcomponentDropdownStructure,
      AddNewGenericComponent.proceedToInvokeAddCallbackIfFound.bind(targetDetails,
        parentComponent, activeBaseComponent, callback, args)) as WorkshopComponent;
  }

  protected static getParentLayer(parentComponent: WorkshopComponent, parentLayerName: string): Layer {
    const activeNestedComponentParent = ActiveComponentUtils.getActiveNestedComponentParent(parentComponent);
    return ComponentPreviewStructureSearchUtils.getLayerByName(activeNestedComponentParent, parentLayerName);
  }

  protected static getNewComponentProperties(selectedNestedComponent: WorkshopComponent, nestedComponentBaseName: NESTED_COMPONENTS_BASE_NAMES): any {
    const componentType = AddNewGenericComponent.componentBaseNameToType[nestedComponentBaseName];
    const componentStyle = NestedComponentBaseNamesToStyles.genericToStyle(nestedComponentBaseName);
    const parentComponent = ActiveComponentUtils.getActiveNestedComponentParent(selectedNestedComponent);
    const parentLayer = selectedNestedComponent.type === COMPONENT_TYPES.LAYER
      ? AddNewGenericComponent.getParentLayer(parentComponent, selectedNestedComponent.coreSubcomponentRefs[0].name)
      : parentComponent.componentPreviewStructure.layers[0];
    return { componentType, componentStyle, parentLayer, parentComponent };
  }
}

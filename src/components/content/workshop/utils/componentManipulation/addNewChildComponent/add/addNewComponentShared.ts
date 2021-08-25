import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from '../utils/childComponentBaseNamesToStyles';
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
  activeComponentParent: WorkshopComponent,
  dropdownStructure: NestedDropdownStructure,
  ...args: unknown[]) => WorkshopComponent;

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(parentComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    parentComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static setMasterComponentReference(newComponent: WorkshopComponent, masterComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].seedComponent.ref.masterComponent = masterComponent);
  }

  protected static createNewComponentViaGenerator(componentGenerator: ComponentGenerator, masterComponent: WorkshopComponent,
      newComponentName: string): WorkshopComponent {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].seedComponent = { ref: newComponent, inSync: false };
    AddNewComponentShared.setMasterComponentReference(newComponent, masterComponent);
    return newComponent;
  }

  private static proceedToInvokeAddCallbackIfFound(parentComponent: WorkshopComponent, activeComponentParent: WorkshopComponent,
      callback: DropdownStructureSearchCallback, args: unknown[], componentTraversalState: ComponentTraversalState): WorkshopComponent {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      const newComponent = callback(parentComponent, activeComponentParent, subcomponentDropdownStructure, ...args);
      return newComponent;
    }
    return null;
  }

  protected static addComponentViaDropdownStructureSearch(parentOptionComponent: WorkshopComponent, callback: DropdownStructureSearchCallback,
      ...args: unknown[]): WorkshopComponent {
    const { containerComponent, masterComponent } = ActiveComponentUtils.getHigherLevelComponents(parentOptionComponent);
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    return ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      AddNewGenericComponent.proceedToInvokeAddCallbackIfFound.bind(targetDetails,
        parentOptionComponent, containerComponent, callback, args)) as WorkshopComponent;
  }

  protected static getParentLayer(parentComponent: WorkshopComponent, parentLayerName: string): Layer {
    const activeContainerComponent = ActiveComponentUtils.getActiveContainerComponent(parentComponent);
    return ComponentPreviewStructureSearchUtils.getLayerByName(activeContainerComponent, parentLayerName);
  }

  protected static getNewComponentProperties(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): any {
    const componentType = AddNewGenericComponent.componentBaseNameToType[newComponentBaseName];
    const componentStyle = ChildComponentBaseNamesToStyles.genericToStyle(newComponentBaseName);
    const activeContainerComponent = ActiveComponentUtils.getActiveContainerComponent(activeComponent);
    const parentLayer = activeComponent.type === COMPONENT_TYPES.LAYER
      ? AddNewGenericComponent.getParentLayer(activeContainerComponent, activeComponent.coreSubcomponentRefs[0].name)
      : activeContainerComponent.componentPreviewStructure.layers[0];
    return { componentType, componentStyle, parentLayer, parentComponent: activeContainerComponent };
  }
}

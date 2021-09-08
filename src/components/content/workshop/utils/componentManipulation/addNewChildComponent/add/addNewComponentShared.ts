import { ComponentTraversalState, TargetDetails } from '../../../../../../../interfaces/componentTraversal';
import { CHILD_COMPONENTS_BASE_NAMES } from '../../../../../../../consts/baseSubcomponentNames.enum';
import { ComponentPreviewStructureSearchUtils } from '../utils/componentPreviewStractureSearchUtils';
import { Subcomponents, WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { NestedDropdownStructure } from '../../../../../../../interfaces/nestedDropdownStructure';
import { ChildComponentBaseNamesToStyles } from '../utils/childComponentBaseNamesToStyles';
import ComponentTraversalUtils from '../../../componentTraversal/componentTraversalUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../interfaces/componentGenerator';
import { ActiveComponentUtils } from '../../../activeComponent/activeComponentUtils';
import { COMPONENT_STYLES } from '../../../../../../../consts/componentStyles.enum';
import { COMPONENT_TYPES } from '../../../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../../../interfaces/componentPreviewStructure';
import { PaddingComponentUtils } from '../../utils/paddingComponentUtils';
import { AddNewContainerComponent } from './addNewContainerComponent';
import JSONUtils from '../../../generic/jsonUtils';

type DropdownStructureSearchCallback = (
  containerComponent: WorkshopComponent,
  dropdownStructure: NestedDropdownStructure,
  ...args: unknown[]) => WorkshopComponent;

interface NewComponentProperties {
  componentType: COMPONENT_TYPES;
  componentStyle: COMPONENT_STYLES;
  parentLayer: Layer;
  containerComponent: WorkshopComponent;
}

export class AddNewComponentShared {

  protected static addNewComponentToSubcomponentNameToDropdownOptionNameMap(containerComponent: WorkshopComponent,
      newComponent: WorkshopComponent, isEditable = true): void {
    if (!isEditable) return;
    const baseName = newComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name;
    containerComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName[baseName] = baseName;
  }

  private static setMasterComponentReference(newComponent: WorkshopComponent, masterComponent: WorkshopComponent): void {
    Object.keys(newComponent.subcomponents)
      .forEach((subcomponentName) => newComponent.subcomponents[subcomponentName].seedComponent.masterComponent = masterComponent);
  }

  protected static createNewComponentViaGenerator(componentGenerator: ComponentGenerator, masterComponent: WorkshopComponent,
      newComponentName: string): WorkshopComponent {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    newComponent.subcomponents[newComponentName].seedComponent = newComponent;
    AddNewComponentShared.setMasterComponentReference(newComponent, masterComponent);
    return newComponent;
  }

  private static proceedToInvokeAddCallbackIfFound(containerComponent: WorkshopComponent, callback: DropdownStructureSearchCallback,
      args: unknown[], componentTraversalState: ComponentTraversalState): WorkshopComponent {
    const targetDetails = this as any as TargetDetails;
    if (ComponentTraversalUtils.isActualObjectNameMatching(targetDetails, componentTraversalState)) {
      const { subcomponentDropdownStructure } = componentTraversalState;
      const newComponent = callback(containerComponent, subcomponentDropdownStructure, ...args);
      return newComponent;
    }
    return null;
  }

  protected static addComponentViaDropdownStructureSearch(parentOptionComponent: WorkshopComponent, callback: DropdownStructureSearchCallback,
      ...args: unknown[]): WorkshopComponent {
    const masterComponent = parentOptionComponent.masterComponent;
    const targetDetails = ComponentTraversalUtils.generateTargetDetails(masterComponent, masterComponent.activeSubcomponentName);
    return ComponentTraversalUtils.traverseComponentUsingDropdownStructure(
      masterComponent.componentPreviewStructure.subcomponentDropdownStructure,
      AddNewContainerComponent.proceedToInvokeAddCallbackIfFound.bind(targetDetails,
        parentOptionComponent, callback, args)) as WorkshopComponent;
  }

  protected static getContainerComponentLayer(containerComponent: WorkshopComponent, parentLayerName: string): Layer {
    const activeContainerComponent = ActiveComponentUtils.getActiveContainerComponent(containerComponent);
    return ComponentPreviewStructureSearchUtils.getLayerByName(activeContainerComponent, parentLayerName);
  }

  protected static getNewComponentProperties(activeComponent: WorkshopComponent, newComponentBaseName: CHILD_COMPONENTS_BASE_NAMES): NewComponentProperties {
    const componentType = AddNewContainerComponent.componentBaseNameToType[newComponentBaseName];
    const componentStyle = ChildComponentBaseNamesToStyles.genericToStyle(newComponentBaseName);
    const containerComponent = ActiveComponentUtils.getActiveContainerComponent(activeComponent);
    const parentLayer = activeComponent.type === COMPONENT_TYPES.LAYER
      ? AddNewContainerComponent.getContainerComponentLayer(containerComponent, activeComponent.coreSubcomponentRefs[0].name)
      : containerComponent.componentPreviewStructure.layers[0];
    return { componentType, componentStyle, parentLayer, containerComponent };
  }

  protected static populateMasterComponentWithNewSubcomponents(masterComponent: WorkshopComponent, newSubcomponents: Subcomponents): void {
    // using this instead of Object.assign in order to cause the reactive masterComponent variable to trigger change detection in the add new component dropdown
    JSONUtils.addObjects(masterComponent, 'subcomponents', newSubcomponents);
    PaddingComponentUtils.overwriteSubcomponentsRef(masterComponent);
  }

  protected static cleanSubcomponentProperties(newComponent: WorkshopComponent): void {
    newComponent.subcomponents = {};
    newComponent.componentPreviewStructure.subcomponentDropdownStructure = {};
    newComponent.componentPreviewStructure.subcomponentNameToDropdownOptionName = {};
  }
}

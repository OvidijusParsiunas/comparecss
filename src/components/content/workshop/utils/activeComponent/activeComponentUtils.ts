import { ComponentPreviewStructureSearchUtils } from '../componentManipulation/addNewNestedComponent/utils/componentPreviewStractureSearchUtils';
import { SUBCOMPONENT_TYPES } from '../../../../../consts/subcomponentTypes.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';
import { Layer } from '../../../../../interfaces/componentPreviewStructure';

interface ParentComponentProperties {
  parentNestedComponent: WorkshopComponent;
  parentLayer: Layer;
}

export class ActiveComponentUtils {

  // WORK1: rename to activeTopParentComponent
  public static getActiveBaseComponent(parentComponent: WorkshopComponent): WorkshopComponent {
    // WORK1 - confirm if this is needed
    const baseSubcomponent = parentComponent.subcomponents[parentComponent.activeSubcomponentName] || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE];
    // if the parentBaseComponentRef property has not yet been set, reference the current parent component as the base
    return baseSubcomponent.parentBaseComponentRef || parentComponent;
  }

  public static getActiveNestedComponentParent(parentComponent: WorkshopComponent): WorkshopComponent {
    // WORK1 - confirm if this is needed
    const activeNestedComponent = (parentComponent.subcomponents[parentComponent.activeSubcomponentName] || parentComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE]).nestedComponent.ref;
    return activeNestedComponent.type === COMPONENT_TYPES.LAYER ? activeNestedComponent.nestedComponentParent : activeNestedComponent;
  }

  private static createMockLayerObject(selectedNestedComponent: WorkshopComponent): Layer {
    return {
      sections: null,
      name: selectedNestedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name,
      subcomponentProperties: selectedNestedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE],
    };
  }

  private static getLayerObject(selectedNestedComponent: WorkshopComponent, getActualLayerObject: boolean): Layer {
    return getActualLayerObject
      ? ComponentPreviewStructureSearchUtils.getLayerByName(
        selectedNestedComponent.nestedComponentParent, selectedNestedComponent.coreSubcomponentRefs[SUBCOMPONENT_TYPES.BASE].name)
      : ActiveComponentUtils.createMockLayerObject(selectedNestedComponent);
  }

  public static getParentComponentProperties(selectedNestedComponent: WorkshopComponent, getActualLayerObject = false): ParentComponentProperties {
    if (selectedNestedComponent.type === COMPONENT_TYPES.LAYER) {
      // when adding to layer, its own component is not valid and need to get the actual component that nests it
      return {
        parentNestedComponent: selectedNestedComponent.nestedComponentParent,
        parentLayer: ActiveComponentUtils.getLayerObject(selectedNestedComponent, getActualLayerObject),
      };
    }
    // when adding to a component, the intention is to add a new component within its layers, so the current component reference is perfectly valid
    return {
      parentNestedComponent: selectedNestedComponent,
      parentLayer: selectedNestedComponent.componentPreviewStructure.layers[SUBCOMPONENT_TYPES.BASE],
    };
  }
}

import { EntityDisplayStatus, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { NestedComponentStructure } from '../../../../../interfaces/nestedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

// WORK1: remove
export class NestedComponentGenerator {

  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static applyTopProperty(newComponent: WorkshopComponent, newComponentName: string): void {
    const customCssProperties = newComponent.subcomponents[newComponentName].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = newComponent.subcomponents[newComponentName].defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = NestedComponentGenerator.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = NestedComponentGenerator.DEFAULT_TOP_PROPERTY;
    }
  }

  private static applyOptionalSubcomponentProperty(newComponent: WorkshopComponent, newComponentName: string): void {
    const baseSubcomponent = newComponent.subcomponents[newComponentName];
    baseSubcomponent.subcomponentDisplayStatus = EntityDisplayStatusUtils.createDefaultEntityDisplayStatus();
    newComponent.componentPreviewStructure.subcomponentDropdownStructure
      [newComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.subcomponentDisplayStatus;
  }

  // WORK1: take to inherited css
  // change the nestedComponent naming convention
  public static createNestedComponentSubcomponents(componentGenerator: ComponentGenerator, newComponentName: string): Subcomponents {
    const newComponent = componentGenerator.createNewComponent(newComponentName);
    if (newComponent.type !== COMPONENT_TYPES.LAYER) {
      // should only be used by add new generic component
      NestedComponentGenerator.applyTopProperty(newComponent, newComponentName);
    }
    // probably not needed anymore
    NestedComponentGenerator.applyOptionalSubcomponentProperty(newComponent, newComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    newComponent.subcomponents[newComponentName].nestedComponent = { ref: newComponent, inSync: false };
    return newComponent.subcomponents;
  }

  // WORK1: Remove this
  public static createNestedComponentStructure(subcomponents: Subcomponents, baseName: string): NestedComponentStructure {
    (subcomponents[baseName].nestedComponent.ref.componentPreviewStructure.subcomponentDropdownStructure[baseName]
      .optionalSubcomponentRef as EntityDisplayStatus).isDisplayed = true;
    return {
      baseName,
      component: subcomponents[baseName].nestedComponent.ref.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}

import { EntityDisplayStatus, ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/entityDisplayStatus';
import { ImportedComponentStructure } from '../../../../../interfaces/importedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { EntityDisplayStatusUtils } from '../entityDisplayStatus/entityDisplayStatusUtils';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';
import { COMPONENT_TYPES } from '../../../../../consts/componentTypes.enum';

export class ImportedComponentGenerator {

  public static readonly DEFAULT_TOP_PROPERTY = '50%';

  private static applyTopProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const customCssProperties = importedComponentRef.subcomponents[importedComponentName].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = importedComponentRef.subcomponents[importedComponentName].defaultCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = ImportedComponentGenerator.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = ImportedComponentGenerator.DEFAULT_TOP_PROPERTY;
    }
  }

  private static applyOptionalSubcomponentProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const baseSubcomponent = importedComponentRef.subcomponents[importedComponentName];
    baseSubcomponent.subcomponentDisplayStatus = EntityDisplayStatusUtils.createDefaultEntityDisplayStatus();
    importedComponentRef.componentPreviewStructure.subcomponentDropdownStructure
      [importedComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.subcomponentDisplayStatus;
  }

  // WORK1: take to inherited css
  // change the nestedComponent naming convention
  public static createImportedComponentSubcomponents(componentGenerator: ComponentGenerator, importedComponentName: string): Subcomponents {
    const importedComponentRef = componentGenerator.createNewComponent(importedComponentName);
    if (importedComponentRef.type !== COMPONENT_TYPES.LAYER) {
      // should only be used by add new imported component
      ImportedComponentGenerator.applyTopProperty(importedComponentRef, importedComponentName);
    }
    // probably not needed anymore
    ImportedComponentGenerator.applyOptionalSubcomponentProperty(importedComponentRef, importedComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    importedComponentRef.subcomponents[importedComponentName].nestedComponent = { ref: importedComponentRef, inSync: false };
    return importedComponentRef.subcomponents;
  }

  // WORK1: Remove this
  public static createImportedComponentStructure(subcomponents: Subcomponents, baseName: string): ImportedComponentStructure {
    (subcomponents[baseName].nestedComponent.ref.componentPreviewStructure.subcomponentDropdownStructure[baseName]
      .optionalSubcomponentRef as EntityDisplayStatus).isDisplayed = true;
    return {
      baseName,
      component: subcomponents[baseName].nestedComponent.ref.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}

import { CUSTOM_SUBCOMPONENT_NAMES_PREFIXES } from '../../../../../consts/customSubcomponentNamesPrefixes.enum';
import { ImportedComponentStructure } from '../../../../../interfaces/importedComponentStructure';
import { Subcomponents, WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { ENTITY_DISPLAY_STATUS_REF } from '../../../../../interfaces/nestedDropdownStructure';
import { CustomSubcomponentNames } from '../../../../../interfaces/customSubcomponentNames';
import { CSS_PSEUDO_CLASSES } from '../../../../../consts/subcomponentCssClasses.enum';
import { ComponentGenerator } from '../../../../../interfaces/componentGenerator';

export default class ImportedCompoment {

  private static DEFAULT_TOP_PROPERTY = '50%';

  public static generateImportedSubcomponentNames(importedSubcomponentBaseName: string, importedSubcomponentId: number): CustomSubcomponentNames {
    const spaces = new Array(importedSubcomponentId).join(' ');
    return { base: importedSubcomponentBaseName, layer: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.LAYER}${spaces}`, text: `${CUSTOM_SUBCOMPONENT_NAMES_PREFIXES.TEXT}${spaces}`};
  }

  private static applyTopProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const customCssProperties = importedComponentRef.subcomponents[importedComponentName].customCss[CSS_PSEUDO_CLASSES.DEFAULT];
    const defaultCustomCssProperties = importedComponentRef.subcomponents[importedComponentName].initialCss[CSS_PSEUDO_CLASSES.DEFAULT];
    if (!customCssProperties.top) {
      customCssProperties.top = ImportedCompoment.DEFAULT_TOP_PROPERTY;
      defaultCustomCssProperties.top = ImportedCompoment.DEFAULT_TOP_PROPERTY;
    }
  }

  private static applyOptionalSubcomponentProperty(importedComponentRef: WorkshopComponent, importedComponentName: string): void {
    const baseSubcomponent = importedComponentRef.subcomponents[importedComponentName];
    baseSubcomponent.optionalSubcomponent = { currentlyDisplaying: true };
    importedComponentRef.componentPreviewStructure.subcomponentDropdownStructure
      [importedComponentName][ENTITY_DISPLAY_STATUS_REF] = baseSubcomponent.optionalSubcomponent;
  }

  public static createImportedSubcomponents(componentGenerator: ComponentGenerator, importedComponentName: string, importedComponentId: number): Subcomponents {
    const importedComponentRef = componentGenerator.createNewComponent(importedComponentName, importedComponentId);
    // WORK3: IMPORT COMPONENT
    // take into consideration that when importing existing component, the default will need to be recreated
    ImportedCompoment.applyTopProperty(importedComponentRef, importedComponentName);
    ImportedCompoment.applyOptionalSubcomponentProperty(importedComponentRef, importedComponentName);
    // referencing the whole component within it's own subcomponent may not be efficient
    // alternative would be to have a placeholder subcomponent to reference it
    importedComponentRef.subcomponents[importedComponentName].importedComponent = importedComponentRef;
    return importedComponentRef.subcomponents;
  }

  public static createImportedComponentStructure(subcomponents: Subcomponents, baseName: string): ImportedComponentStructure {
    return {
      baseName,
      component: subcomponents[baseName].importedComponent.componentPreviewStructure.subcomponentDropdownStructure,
    };
  }
}

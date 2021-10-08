import { BUTTON_COMPONENTS_BASE_NAMES, DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { SUBCOMPONENT_TYPES } from '../../../../../../../../consts/subcomponentTypes.enum';
import { ComponentGenerator } from '../../../../../../../../interfaces/componentGenerator';
import { WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { defaultDropdownMenu } from '../menu/default';
import { DropdownPaddingBase } from './base';

class DefaultDropdownPadding {

  private static overwriteButtonTextCustomStaticFeatures(buttonComponent: WorkshopComponent): void {
    const textSubcomponent = buttonComponent.sync.syncables.subcomponents[SUBCOMPONENT_TYPES.TEXT];
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
  }

  private static overwriteButtonBaseCustomCss(buttonComponent: WorkshopComponent): void {
    const baseSubcomponent = buttonComponent.baseSubcomponent;
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].width = '155px';
    baseSubcomponent.customCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
    baseSubcomponent.defaultCss[CSS_PSEUDO_CLASSES.DEFAULT].borderRadius = '4px';
  }

  public static overwrite(buttonComponent: WorkshopComponent): void {
    DefaultDropdownPadding.overwriteButtonBaseCustomCss(buttonComponent);
    DefaultDropdownPadding.overwriteButtonTextCustomStaticFeatures(buttonComponent);
  }
}

export const defaultDropdownPadding: ComponentGenerator = {
  createNewComponent(baseName?: string): WorkshopComponent {
    const buttonComponent = buttonWithIcon.createNewComponent(UniqueSubcomponentNameGenerator.generate(BUTTON_COMPONENTS_BASE_NAMES.BUTTON));
    DefaultDropdownPadding.overwrite(buttonComponent);
    const dropdownMenuComponent = defaultDropdownMenu.createNewComponent(UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU));
    return DropdownPaddingBase.create(baseName, buttonComponent, dropdownMenuComponent);
  },
}

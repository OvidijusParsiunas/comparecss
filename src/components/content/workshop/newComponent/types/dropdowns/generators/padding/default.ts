import { UniqueSubcomponentNameGenerator } from '../../../../../utils/componentGenerator/uniqueSubcomponentNameGenerator';
import { ComponentGenerator, PresetProperties } from '../../../../../../../../interfaces/componentGenerator';
import { DROPDOWN_COMPONENTS_BASE_NAMES } from '../../../../../../../../consts/baseSubcomponentNames.enum';
import { CSS_PSEUDO_CLASSES } from '../../../../../../../../consts/subcomponentCssClasses.enum';
import { WorkshopComponent } from '../../../../../../../../interfaces/workshopComponent';
import { COMPONENT_TYPES } from '../../../../../../../../consts/componentTypes.enum';
import { buttonWithIcon } from '../../../buttons/generators/buttonWithIcon';
import { ComponentBuilder } from '../../../shared/componentBuilder';
import { defaultDropdownMenu } from '../menu/default';
import { DropdownPaddingBase } from './base';

class DefaultDropdownPadding extends ComponentBuilder {

  private static overwriteButtonTextCustomStaticFeatures(buttonComponent: WorkshopComponent): void {
    const textSubcomponent = buttonComponent.sync.syncables.onCopy.uniqueComponents[COMPONENT_TYPES.TEXT].baseSubcomponent;
    textSubcomponent.customStaticFeatures.subcomponentText.text = 'Dropdown button';
    textSubcomponent.defaultCustomStaticFeatures.subcomponentText.text = 'Dropdown button';
  }

  private static overwriteButtonBaseCustomCss(buttonComponent: WorkshopComponent): void {
    const baseSubcomponent = buttonComponent.baseSubcomponent;
    ComponentBuilder.setCustomAndDefaultCssProperty(baseSubcomponent, CSS_PSEUDO_CLASSES.DEFAULT, 'width', '155px');
    ComponentBuilder.setCustomAndDefaultCssProperty(baseSubcomponent, CSS_PSEUDO_CLASSES.DEFAULT, 'borderRadius', '4px');
  }

  public static overwriteButton(buttonComponent: WorkshopComponent): void {
    DefaultDropdownPadding.overwriteButtonBaseCustomCss(buttonComponent);
    DefaultDropdownPadding.overwriteButtonTextCustomStaticFeatures(buttonComponent);
  }
}

export const defaultDropdownPadding: ComponentGenerator = {
  createNewComponent(presetProperties: PresetProperties): WorkshopComponent {
    const dropdownMenuComponent = defaultDropdownMenu.createNewComponent(
      { baseName: UniqueSubcomponentNameGenerator.generate(DROPDOWN_COMPONENTS_BASE_NAMES.MENU) });
    return DropdownPaddingBase.create(presetProperties?.baseName, buttonWithIcon.createNewComponent,
      dropdownMenuComponent, DefaultDropdownPadding.overwriteButton);
  },
}

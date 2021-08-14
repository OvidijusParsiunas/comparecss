import { WORKSHOP_TOOLBAR_OPTION_TYPES } from '../../../../../../../consts/workshopToolbarOptionTypes.enum';
import { SubcomponentSpecificSettings } from '../../../../../../../interfaces/subcomponentSpecificSettings';
import { CardBaseSpecificSettings } from '../../cards/settings/cardBaseSpecificSettings';
import { WorkshopComponent } from '../../../../../../../interfaces/workshopComponent';
import { SETTING_NAMES } from '../../../../../../../consts/settingNames.enum';
import { AnimationPreview } from '../../shared/settings/animationPreview';

export class ModalBaseSpecificSettings {

  private static MODAL_BASE_SPECIFIC_COMPONENTS: SubcomponentSpecificSettings = {
    ...CardBaseSpecificSettings.CARD_BASE_GENERIC_COMPONENTS,
    [WORKSHOP_TOOLBAR_OPTION_TYPES.MODAL_ANIMATIONS]: {
      [SETTING_NAMES.ENTRANCE]: {
        actionsDropdownMouseEvents: AnimationPreview.ENTRANCE_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
      [SETTING_NAMES.EXIT]: {
        actionsDropdownMouseEvents: AnimationPreview.EXIT_ACTIONS_DROPDOWN_MOUSE_EVENT_CALLBACKS,
      },
    },
  };

  public static set(component: WorkshopComponent): void {
    component.coreSubcomponentRefs.base.subcomponentSpecificSettings = ModalBaseSpecificSettings.MODAL_BASE_SPECIFIC_COMPONENTS;
  }
}

import { WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES } from '../../../../../../consts/workshopToolbarOptionButtonNames.enum';
import { Option } from '../../../../../../interfaces/componentOptions';

export class ComponentOptionsUtils {

  // can replace original options and additionally append entirely new options to the end
  public static overwriteOptions(oldOptions: Option[], newOptions: Option[]): Option[] {
    let resultOptions: Option[] = [];
    oldOptions.forEach((oldOption: Option) => {
      const newOptionIndex = newOptions.findIndex((newOption: Option) => newOption.buttonName === oldOption.buttonName);
      if (newOptionIndex >= 0) {
        resultOptions.push(newOptions[newOptionIndex]);
        newOptions.splice(newOptionIndex, 1);
      } else {
        resultOptions.push(oldOption);
      }
    });
    resultOptions = [...resultOptions, ...newOptions];
    return resultOptions;
  }

  public static removeOptions(options: Option[], ...optionButtonNames: WORKSHOP_TOOLBAR_OPTION_BUTTON_NAMES[]): Option[] {
    return options.filter((option) => !optionButtonNames.includes(option.buttonName));
  }
}

import { Option } from '../../../../../../interfaces/componentOptions';

export class ComponentOptionsUtils {
  
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
}

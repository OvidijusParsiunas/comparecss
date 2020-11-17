import { ComponentTypeJavascript } from '../../../../../interfaces/componentTypeJavascript';
import { BUTTON_JAVASCRIPT_CLASSES } from './buttonJavaScriptClasses.enum';
import { ripplesCode } from './ripples';

export const buttonJavascript: ComponentTypeJavascript[] = [
  {
    className: BUTTON_JAVASCRIPT_CLASSES.RIPPLES,
    code: ripplesCode,
  }
];

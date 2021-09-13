import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';
import { JavascriptCode } from '../../../../../../interfaces/javascriptCode';
import { dropdownMenuToggleCode } from './code/dropdownMenuToggle';
import { ripplesCode } from './code/ripples';

type JavascriptInitializerClassesToCode = {
  [key in JAVASCRIPT_CLASSES]?: JavascriptCode;
}

export const javascriptInitializerClassesToCode: JavascriptInitializerClassesToCode = {
  [JAVASCRIPT_CLASSES.RIPPLES]: ripplesCode,
  [JAVASCRIPT_CLASSES.DROPDOWN_BUTTON]: dropdownMenuToggleCode,
};

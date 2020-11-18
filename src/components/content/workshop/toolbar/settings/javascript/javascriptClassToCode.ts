import { JavascriptCode } from '../../../../../../interfaces/javascriptCode';
import { JAVASCRIPT_CLASSES } from '../../../../../../consts/javascriptClasses.enum';
import { ripplesCode } from './code/ripples';

type JavascriptClassesToCode = {
  [key in JAVASCRIPT_CLASSES]: JavascriptCode;
}

export const javascriptClassesToCode: JavascriptClassesToCode = {
  [JAVASCRIPT_CLASSES.RIPPLES]: ripplesCode,
}

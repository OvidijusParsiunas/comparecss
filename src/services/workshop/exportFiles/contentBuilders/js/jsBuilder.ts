import { javascriptClassesToCode } from '../../../../../components/content/workshop/toolbar/settings/javascript/javascriptClassToCode';
import { JAVASCRIPT_CLASSES } from '../../../../../consts/javascriptClasses.enum';
import { WorkshopComponent } from '../../../../../interfaces/workshopComponent';
import { JSBuilderResult } from '../../../../../interfaces/jsBuilderResult';
import { JavascriptCode } from '../../../../../interfaces/javascriptCode';
import uglifyjsOptions from '../../../../../consts/uglifyjsOptions';

type JavascriptClassesToCode = {
  [key in JAVASCRIPT_CLASSES]?: JavascriptCode;
}

export default class JSBuilder {

  static build(components: WorkshopComponent[]): JSBuilderResult {
    let allCssForJS = '';
    let allJS = '';
    const utilisedJavascriptCode: JavascriptClassesToCode = {};
    components.forEach((component) => {
      Object.keys(component.subcomponents).forEach((key) => {
        component.subcomponents[key].jsClasses.forEach((jsClass) => {
          if (!utilisedJavascriptCode[jsClass]) { utilisedJavascriptCode[jsClass] = javascriptClassesToCode[jsClass] }
        });
      });
    });
    Object.keys(utilisedJavascriptCode).forEach((key) => {
      const { cssFileContent, jsFileContent } = utilisedJavascriptCode[key].downloadables;
      allCssForJS += '\r\n' + cssFileContent;
      allJS += jsFileContent;
    });
    if (allJS.trim().length === 0) return {};
    const allJSMinified = window.minify(allJS, uglifyjsOptions);
    if (allJSMinified.error) {
      console.error('Failed to minimize JS');
      return { js: allJS, cssForJs: allCssForJS };
    }
    return { js: allJS, jsmin: allJSMinified.code, cssForJs: allCssForJS };
  }
}

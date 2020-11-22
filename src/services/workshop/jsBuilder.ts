import uglifyjsOptions from '../../consts/uglifyjsOptions';
import { JSBuilder as JSBuilderInterface } from '../../interfaces/jsBuilder';
import { WorkshopComponent } from '../../interfaces/workshopComponent';
import { JavascriptCode } from '../../interfaces/javascriptCode';
import { javascriptClassesToCode } from '../../components/content/workshop/toolbar/settings/javascript/javascriptClassToCode';
import { JAVASCRIPT_CLASSES } from '../../consts/javascriptClasses.enum';

type JavascriptClassesToCode = {
  [key in JAVASCRIPT_CLASSES]?: JavascriptCode;
}

export default class JSBuilder {

  static build(components: WorkshopComponent[]): JSBuilderInterface {
    let allCssForJS = '';
    let allJS = '';
    const utilisedJavascriptCode: JavascriptClassesToCode = {};
    components.forEach((component) => {
      component.subcomponents[component.subcomponentsActiveMode].jsClasses.forEach((jsClass) => {
        if (!utilisedJavascriptCode[jsClass]) { utilisedJavascriptCode[jsClass] = javascriptClassesToCode[jsClass] }
      })
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

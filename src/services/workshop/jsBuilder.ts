import JavaScriptContainer from '../../components/content/workshop/toolbar/javascript/javascriptContainer';
import uglifyjsOptions from '../../consts/uglifyjsOptions';
import { JSBuilder as JSBuilderInterface } from '../../interfaces/jsBuilder';
import { WorkshopComponent } from '../../interfaces/workshopComponent';
import { JavascriptCode } from '../../interfaces/javascriptCode';

interface UtilisedJavascriptCodeContainer {
  [property: string]: JavascriptCode;
}

export default class JSBuilder {

  static build(components: WorkshopComponent[]): JSBuilderInterface {
    let allCssForJS = '';
    let allJS = '';
    const utilisedJavascriptCode: UtilisedJavascriptCodeContainer = {};
    components.forEach((component) => {
      component.componentProperties.jsClasses.forEach((jsClass) => {
        if (utilisedJavascriptCode[jsClass]) return;
        JavaScriptContainer[component.type].content.forEach((componentJavaScript) => {
          if (componentJavaScript.className === jsClass) { utilisedJavascriptCode[jsClass] = componentJavaScript.code; }
        })
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

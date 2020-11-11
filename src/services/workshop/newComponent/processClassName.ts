import { WorkshopComponent } from '../../../interfaces/workshopComponent';

export default class ProcessClassedName {
  
  private static minClassLength = 1;
  private static duplicateClassNamePostfix = '2';

  private static insertSubstringIntoClassName(className: string, insertedString: string, index: number): string {
    return className.substring(0, index) + insertedString + className.substring(index + 1)
  }
  
  private static replaceEverythingExceptAlphanumericHyphenAndUnderscoreFromIndex(className: string, replaceWith: string, index: number): string {
    const noLetterNumberHyphenUnderscoreRegex = /[^A-Z0-9-_]/i;
    const processedSubString = className.substring(index).replace(noLetterNumberHyphenUnderscoreRegex, replaceWith);
    return className.substring(0, index) + processedSubString;
  }

  private static removeConsecutiveNumbersAndSymbolsAtIndex(className: string, index: number): string {
    const noLetterRegex = /[^A-Z]/i;
    const subjectCharacter = className.charAt(index);
    const processedCharacter = (noLetterRegex.test(subjectCharacter) ? '' : subjectCharacter);
    className = this.insertSubstringIntoClassName(className, processedCharacter, index);
    if (noLetterRegex.test(className.charAt(index))) {
      return this.removeConsecutiveNumbersAndSymbolsAtIndex(className, index);
    }
    return className;
  }
  
  private static replaceDigitsAtIndex(className: string, replaceWith: string, index: number): string {
    const noLetterHyphenUnderscoreRegex = /[^A-Z-_]/i;
    const replacedCharacter = className.charAt(index).replace(noLetterHyphenUnderscoreRegex, replaceWith);
    return this.insertSubstringIntoClassName(className, replacedCharacter, index);
  }

  static process(className: string): string {
    className = this.replaceDigitsAtIndex(className, '-', 0);
    if (className.charAt(0) === '-') {
      className = this.removeConsecutiveNumbersAndSymbolsAtIndex(className, 1);
    }
    className = this.replaceEverythingExceptAlphanumericHyphenAndUnderscoreFromIndex(className, '-', 1);
    return className.toLowerCase();
  }

  static addPostfixIfClassNameTaken(className: string, components: WorkshopComponent[], originalClasName?: string): string {
    if (components.map((component) => component.className).includes(className)) {
      if (className === originalClasName) return className;
      className = `${className}${this.duplicateClassNamePostfix}`;
      return this.addPostfixIfClassNameTaken(className, components, originalClasName);
    }
    return className;
  }

  private static resetIfClassNameTooShort(className: string, placeholder: string): string{
    return className && className.length === this.minClassLength ? placeholder : className;
  }

  static finalize(className: string | null, placeholder: string, components: WorkshopComponent[], originalClasName?: string): string {
    if (className === originalClasName) return className;
    className = this.resetIfClassNameTooShort(className, placeholder);
    className = this.addPostfixIfClassNameTaken(className, components, originalClasName);
    return className;
  }
}

// if processing validation needs to be done without replacing:
// const correctRegex = /^\-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*$/g;
// Note the above does not check that the min size is 2 and does not allow more than one hyphen at the start

// More info here:
// https://www.w3.org/TR/CSS21/syndata.html#characters

// All CSS syntax is case-insensitive within the ASCII range (i.e., [a-z] and [A-Z] are equivalent), except for parts that are not under the control of CSS. For example, the case-sensitivity of values of the HTML attributes "id" and "class", of font names, and of URIs lies outside the scope of this specification. Note in particular that element names are case-insensitive in HTML, but case-sensitive in XML.
// In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit. Identifiers can also contain escaped characters and any ISO 10646 character as a numeric code (see next item). For instance, the identifier "B&W?" may be written as "B\&W\?" or "B\26 W\3F".

// In Summary:
// a name must begin with an underscore (_), a hyphen (-), or a letter(a–z), followed by any number of hyphens, underscores, letters, or numbers. There is a catch: if the first character is a hyphen, the second character must2 be a letter or underscore, and the name must be at least 2 characters long.

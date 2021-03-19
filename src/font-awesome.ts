import { faAngleDoubleDown, faExpandAlt, faAngleDown, faAngleRight, faCompressAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

export default function addFontAwesomeIcons(): void {
  library.add(faAngleDown);
  library.add(faAngleDoubleDown);
  library.add(faAngleRight);
  library.add(faExpandAlt);
  library.add(faCompressAlt);
  library.add(faCaretDown);
}

// Imported first in index.js so it runs before the rest of the bundle: if the
// user opted into the new design, send them to next.sikhitothemax.org right
// away (see ./util/design-preference and issue KhalisFoundation/sttm-next#151).
import { maybeRedirectToNewDesign } from './util/design-preference';

maybeRedirectToNewDesign();

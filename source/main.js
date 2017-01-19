// Bootstrap normalize
import "bootstrap/less/normalize.less";

// Import polyfills
import "babel-polyfill";

import bootstrap from "./app/bootstrap";

let applicationContainer = document.createElement("div");
document.body.appendChild(applicationContainer);
bootstrap(applicationContainer);
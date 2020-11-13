import { isEqual } from "../dist/modules/router.js";
import HTTPTransport from "../dist/modules/httpTransport.js";
window.isEqual = isEqual;
window.HTTPTransport = HTTPTransport;
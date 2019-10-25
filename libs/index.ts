import {
    VuexModule,
    ActionMapping,
    ActionMethod,
    MutationsMapping,
    MutationMethod,
    GetterMethod
} from "./src/decorator";
import {Service} from "./src/service";
import {requestContext as RequestContext} from "./src/context/RequestContext";
import {Request} from "./src/decorator";
import {RequestMethod} from "./enum/Request";

export {
    VuexModule,
    ActionMapping,
    ActionMethod,
    MutationsMapping,
    MutationMethod,
    GetterMethod,
    Service,
    RequestContext,
    Request,
    RequestMethod
}

export default Service;


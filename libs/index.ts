import {
    VuexModule,
    ActionMapping,
    ActionMethod,
    MutationsMapping,
    MutationMethod,
    GetterMethod
} from "./src/core/decorator";
import {Service} from "./src/core/service";
import {requestContext as RequestContext} from "./src/context/RequestContext";
import {Request} from "./src/core/decorator";
import {RequestMethod} from "./enum/Request";
import {VuexModuleClass} from "./src/core/vuex";

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
    RequestMethod,
    VuexModuleClass
}

export default Service;


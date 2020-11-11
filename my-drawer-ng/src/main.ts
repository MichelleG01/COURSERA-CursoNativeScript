// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, registerElement } from "@nativescript/angular";

registerElement("PullToRefresh", () => require("@nstudio/nativescript-pulltorefresh").PullToRefresh);

import { AppModule } from "./app/app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);
//"platformNativeScriptDynamic". Esto es una integración con la plataforma. 
//Desde TypeScript se está integrando a la plataforma subyacente. En vez de ser un 
//"browser web", en este caso, es la plataforma NativeScript. Luego, se hace el "bootstraping" 
//del "module", del módulo. "Boot strap" es "inicialización de un módulo"
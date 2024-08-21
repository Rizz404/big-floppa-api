Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"CreateShippingServiceDto",{enumerable:true,get:function(){return CreateShippingServiceDto}});const _classvalidator=require("class-validator");function _ts_decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r}class CreateShippingServiceDto{name;description;fee}_ts_decorate([(0,_classvalidator.IsNotEmpty)(),(0,_classvalidator.IsString)()],CreateShippingServiceDto.prototype,"name",void 0);_ts_decorate([(0,_classvalidator.IsNotEmpty)(),(0,_classvalidator.IsString)()],CreateShippingServiceDto.prototype,"description",void 0);_ts_decorate([(0,_classvalidator.IsNotEmpty)(),(0,_classvalidator.IsDecimal)()],CreateShippingServiceDto.prototype,"fee",void 0);
//# sourceMappingURL=shippingservice.dto.js.map
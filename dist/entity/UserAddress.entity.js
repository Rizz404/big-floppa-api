Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"UserAddress",{enumerable:true,get:function(){return UserAddress}});const _typeorm=require("typeorm");const _Userentity=require("./User.entity");function _ts_decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r}class UserAddress{id;country;province;city;district;village;fullAddress;createdAt;updatedAt;user}_ts_decorate([(0,_typeorm.PrimaryGeneratedColumn)("uuid")],UserAddress.prototype,"id",void 0);_ts_decorate([(0,_typeorm.Column)({type:"varchar"})],UserAddress.prototype,"country",void 0);_ts_decorate([(0,_typeorm.Column)({type:"varchar"})],UserAddress.prototype,"province",void 0);_ts_decorate([(0,_typeorm.Column)({type:"varchar"})],UserAddress.prototype,"city",void 0);_ts_decorate([(0,_typeorm.Column)({type:"varchar"})],UserAddress.prototype,"district",void 0);_ts_decorate([(0,_typeorm.Column)({type:"varchar"})],UserAddress.prototype,"village",void 0);_ts_decorate([(0,_typeorm.Column)({type:"text"})],UserAddress.prototype,"fullAddress",void 0);_ts_decorate([(0,_typeorm.CreateDateColumn)()],UserAddress.prototype,"createdAt",void 0);_ts_decorate([(0,_typeorm.UpdateDateColumn)()],UserAddress.prototype,"updatedAt",void 0);_ts_decorate([(0,_typeorm.ManyToOne)(()=>_Userentity.User,user=>user.userAddreses)],UserAddress.prototype,"user",void 0);UserAddress=_ts_decorate([(0,_typeorm.Entity)()],UserAddress);
//# sourceMappingURL=UserAddress.entity.js.map
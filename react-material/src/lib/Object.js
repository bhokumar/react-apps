if(typeof Object.assign != 'function'){
    Object.defineProperty(Object,"assign",{
        value:function assign(target,varArgs){
            'use strict';
            if(target == null){
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to  = Object(target);
            for(var index = 1; index<arguments.length;index++){
                var nextsource = arguments[index];
                if(nextsource!=null){
                    for(var nextkey in nextsource){
                        if(Object.prototype.hasOwnProperty.call(nextsource,nextkey)){
                            to[nextkey] = nextsource[nextkey];
                        }
                    }
                }
            }
            return to;
        },
        writable : true,
        configurable : true
    });
}
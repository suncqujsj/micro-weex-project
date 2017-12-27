export default {
  extend(targetObj,fromObj){
    fromObj=fromObj||{};
    targetObj=targetObj||{}
    for (var key in fromObj){
        if(fromObj.hasOwnProperty(key) && (!targetObj.hasOwnProperty(key) )){
           targetObj[key]=fromObj[key];
        }
    }
    return targetObj;
  }
}
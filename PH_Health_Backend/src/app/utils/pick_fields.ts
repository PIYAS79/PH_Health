
const pick =<T extends Record<string,unknown>,k extends keyof T> (obj:T,keys:k[]):Partial<T>=>{
  const final_obj:Partial<T> = {};
  
  for(const key of keys){
    if (obj && Object.hasOwnProperty.call(obj,key)){
      final_obj[key]=obj[key]
    }
  }
  return final_obj
}


export default pick;
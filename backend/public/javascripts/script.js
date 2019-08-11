function alphaCharOnly(event){
  if((event.charCode>64 && event.charCode<91) || (event.charCode>96 && event.charCode<123)){
      return true;
  }
  return false;
}  

function numberOnly(event){
    if((event.charCode>47&&event.charCode<58)){
        return true;
    }
    return false;
}
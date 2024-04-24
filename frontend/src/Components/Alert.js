import React from 'react'

function Alert(props) {

  const FirstLatterCapitalize = (word)=>{
    if(word === "danger"){
      word = "Error"
    }
    const  lower = word.toLowerCase();
    console.log(lower.charAt(0).toUpperCase() + lower.slice(1));
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
return (  
props.alert &&  <div style={{height:"50px"}} className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
<strong>{FirstLatterCapitalize(props.alert.type)}: &nbsp;</strong> {props.alert.message}
<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
)
}

export default Alert

import React from "react";
import happyIcon from "../../images/happy.jpg";
import normalIcon from "../../images/normal.jpg";
import sadIcon from "../../images/sad.jpg";

const Cmoji = props => {
    const key = props.value;
    if(key<-0.5)
        return <img src={sadIcon} alt={props.value} title={"CSAT: "+props.value} height="40px" />;
    if(-0.5<=key && key<-0.05)
        return <img src={sadIcon} alt={props.value} title={"CSAT: "+props.value} height="40px" />;
    if(-0.05<=key && key<=0.05)
        return <img src={normalIcon} alt={props.value} title={"CSAT: "+props.value} height="40px" />;
    if(0.05<key && key<=0.5)
        return <img src={happyIcon} alt={props.value} title={"CSAT: "+props.value} height="40px" />;
    if(0.5<key)
        return <img src={happyIcon} alt={props.value} title={"CSAT: "+props.value} height="40px" />;
    return "Error for value "+key;
};

  export default Cmoji


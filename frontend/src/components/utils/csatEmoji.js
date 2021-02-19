import React from "react";
import veryHappyIcon from "../../images/very_positive.jpg";
import happyIcon from "../../images/positive.jpg";
import normalIcon from "../../images/neutral.jpg";
import sadIcon from "../../images/negative.jpg";
import verySadIcon from "../../images/very_negative.jpg";

const parseCsat = (sentiment) => {
    if(sentiment<-1) {
        return 0;
    }
    if(sentiment>1) {
        return 5;
    }
    return ((sentiment+1)*2.5).toFixed(2);
} 

const Cmoji = props => {
    const key = parseCsat(props.value);
    if(key<1)
        return <img src={verySadIcon} alt={props.raw ? props.value : key} title={props.raw ? "Sentiment: "+props.value : "CSAT: "+key} height="40px" />;
    if(1<=key && key<2)
        return <img src={sadIcon} alt={props.raw ? props.value : key} title={props.raw ? "Sentiment: "+props.value : "CSAT: "+key} height="40px" />;
    if(2<=key && key<=3)
        return <img src={normalIcon} alt={props.raw ? props.value : key} title={props.raw ? "Sentiment: "+props.value : "CSAT: "+key} height="40px" />;
    if(3<key && key<=4)
        return <img src={happyIcon} alt={props.raw ? props.value : key} title={props.raw ? "Sentiment: "+props.value : "CSAT: "+key} height="40px" />;
    if(4<key)
        return <img src={veryHappyIcon} alt={props.raw ? props.value : key} title={props.raw ? "Sentiment: "+props.value : "CSAT: "+key} height="40px" />;
    return "NA";
};

export default Cmoji


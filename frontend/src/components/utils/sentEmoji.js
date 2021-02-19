import React from "react";
import veryHappyIcon from "../../images/very_positive.jpg";
import happyIcon from "../../images/positive.jpg";
import normalIcon from "../../images/neutral.jpg";
import sadIcon from "../../images/negative.jpg";
import verySadIcon from "../../images/very_negative.jpg";


const Smoji = props => {
    const key = props.value;
    if(key<-0.5)
        return <img src={verySadIcon} alt={props.value} title={"Sentiment: "+props.value} height="40px" />;
    if(-0.5<=key && key<-0.05)
        return <img src={sadIcon} alt={props.value} title={"Sentiment: "+props.value} height="40px" />;
    if(-0.05<=key && key<=0.05)
        return <img src={normalIcon} alt={props.value} title={"Sentiment: "+props.value} height="40px" />;
    if(0.05<key && key<=0.5)
        return <img src={happyIcon} alt={props.value} title={"Sentiment: "+props.value} height="40px" />;
    if(0.5<key)
        return <img src={veryHappyIcon} alt={props.value} title={"Sentiment: "+props.value} height="40px" />;
    return "NA";
};

export default Smoji;


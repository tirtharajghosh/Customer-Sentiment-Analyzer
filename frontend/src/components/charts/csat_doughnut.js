import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip
} from 'recharts';

const COLORS = ['#65E50B', '#B0E50B', '#E5DB0B', '#E5990B', '#E5470B'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if(percent!=0){
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }
  return;
  
};

export default class CSATD extends PureComponent {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {data:[
      { name: 'Very Positive', value: props.data[0] },
      { name: 'Positive', value: props.data[1] },
      { name: 'Neutral', value: props.data[2] },
      { name: 'Negative', value: props.data[3] },
      { name: 'Very Negative', value: props.data[4] },
    ]};
  }

  render() {
    return (
      <PieChart width={180} height={180}>
        <Pie
          data={this.state.data}
          cx={90}
          cy={90}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value" 
          nameKey="name"
        >
          {
            this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip/>
      </PieChart>
    );
  }
}

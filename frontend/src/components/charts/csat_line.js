import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default class CSATL extends PureComponent {

  render() {
    return (
      <div>
        <LineChart
          width={500}
          height={200}
          data={this.props.data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis domain={[-1, 1]} />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="Sentiment" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

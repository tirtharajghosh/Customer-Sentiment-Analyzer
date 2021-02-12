import React from 'react';
import { Sector, Cell, PieChart, Pie } from 'recharts';

const GaugeChart = (props) => {
        const width = 300;
        const chartValue = props.value+1;
        const colorData = [{
                value: 0.5, // Meaning span is 0 to 40
                color: '#E5470B'
            }, {
                value: 0.45, // span 40 to 140
                color: '#E5990B'
            }, {
                value: 0.10, // span 40 to 140
                color: '#E5DB0B'
            }, {
                value: 0.45, // span 140 to 190
                color: '#B0E50B'
            }, {
                value: 0.5,
                color: '#65E50B'
            }
        ];

        const activeSectorIndex = colorData.map((cur, index, arr) => {
            const curMax = [...arr]
                .splice(0, index + 1)
                .reduce((a, b) => ({ value: a.value + b.value }))
                .value;
            return (chartValue > (curMax - cur.value)) && (chartValue <= curMax);
        })
        .findIndex(cur => cur);

        const sumValues = colorData
            .map(cur => cur.value)
            .reduce((a, b) => a + b);

        const arrowData = [
            { value: chartValue },
            { value: 0 },
            { value: sumValues - chartValue }
        ];

        const pieProps = {
            startAngle: 180,
            endAngle: 0,
            cx: width / 2,
            cy: width / 2
        };

        const pieRadius = {
            innerRadius: (width / 2) * 0.5,
            outerRadius: (width / 2) * 0.75
        };

        const Arrow = ({ cx, cy, midAngle, outerRadius }) => { //eslint-disable-line react/no-multi-comp
            const RADIAN = Math.PI / 180;
            const sin = Math.sin(-RADIAN * midAngle);
            const cos = Math.cos(-RADIAN * midAngle);
            const mx = cx + (outerRadius + width * 0.03) * cos;
            const my = cy + (outerRadius + width * 0.03) * sin;
            return (
                <g>
                    <circle cx={cx} cy={cy} r={width * 0.05} fill="#666" stroke="none"/>
                    <path d={`M${cx},${cy}L${mx},${my}`} strokeWidth="6" stroke="#666" fill="none" strokeLinecap="round"/>
                </g>
            );
        };

        const ActiveSectorMark = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => { //eslint-disable-line react/no-multi-comp
            return (
                <g>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius * 1.2}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                    />
                </g>
            );
        };

        return (
            <PieChart width={width} height={(width / 2) + 30} style={{border: '1px solid'}}>
                <Pie
                    activeIndex={activeSectorIndex}
                    activeShape={ActiveSectorMark}
                    data={colorData}
                    fill="#8884d8"
                    { ...pieRadius }
                    { ...pieProps }
                >
                    {
                        colorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorData[index].color} />
                        ))
                    }
                </Pie>
                <Pie
                    stroke="none"
                    activeIndex={1}
                    activeShape={ Arrow }
                    data={ arrowData }
                    outerRadius={ pieRadius.innerRadius }
                    fill="none"
                    { ...pieProps }
                />
            </PieChart>
        );
};

export default GaugeChart;
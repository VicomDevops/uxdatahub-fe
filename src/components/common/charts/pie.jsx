import React from 'react'
import {
    ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
const Piechart = (props) => {
    const { data, colors } = props
    return (

        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie dataKey="value" data={data}
                        label >
                        {data.map((e, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
export default Piechart;
"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PieData } from "../../Models/Models";

const data = [
  { label: "Apple", value: 400 },
  { label: "Banana", value: 300 },
  { label: "Orange", value: 300 },
  { label: "Mango", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomPieChart: React.FC<{ data: PieData[] }> = ({ data }) => {
  return (
    <div className="flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={150}
          dataKey="value"
          nameKey="label"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => ` ${value}`} />
        <Legend />
      </PieChart>
    </div>
  );
}
export default CustomPieChart;
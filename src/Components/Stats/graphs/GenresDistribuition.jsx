/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import proptypes from 'prop-types';
import { GRAPH_COLORS } from "../../../utils/constants";
import classes from './Graphs.module.css'


const GenresDistribution = ({ data = [] }) => {
  // Convert the array into one object where each genre is a property
  const transformedData = [
    data.reduce((acc, item) => {
      acc[item.name] = item.total;
      return acc;
    }, {}),
  ];

  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <section className={classes.sectionContainer}>
      <h5>Top 5 Genres Distribution</h5>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          layout="vertical"
          data={transformedData}
          margin={{ top: 10, right: 20, left: 20, bottom: 80 }}
        >
          <XAxis type="number" domain={[0, 'dataMax']}  hide  />
          <YAxis type="category" dataKey={() => ""} hide   />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000e1d",
              borderRadius: "6px",
              color: "#fff",
              border: "1px solid #388a81",
            }}
            formatter={(value, name) => [
              `${value} games (${((value / total) * 100).toFixed(1)}%)`,
              name,
            ]}
          />

          {data.map((item, index) => (
            <Bar
              key={item.name}
              dataKey={item.name}
              stackId="a"
              fill={GRAPH_COLORS[index % GRAPH_COLORS.length]}
              interval={0} 
              label={{
                content: (props) => {
                  const { x, width, viewBox } = props;
                  const { y, height } = viewBox;

                  return (
                    <text
                      x={x + width / 2}
                      y={y + height + 15} // move below the bar
                      textAnchor="end"
                      transform={`rotate(-45, ${x + width / 2}, ${y + height + 15})`}
                      fill="#fff"
                      fontSize={12}
                    >
                      {item.name}
                    </text>
                  );
                },
              }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

GenresDistribution.propTypes = {
  data: proptypes.array
}

export default GenresDistribution;
import { PieChart, Pie, Cell, Legend } from 'recharts';
import proptypes from 'prop-types';
import { CONDITION_GRAPH_COLORS } from '../../../utils/constants';
import classes from './Graphs.module.css';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {/* @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380 */}
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom Legend Renderer
const CustomLegend = ({ payload }) => {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {payload && payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              backgroundColor: entry.color,
              marginRight: 8,
              borderRadius: 2,
            }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};


const ConditionGraph = ({ data = [] }) => {
  return (
    <section className={classes.sectionContainer}>
      <h5>Games Condition</h5>
      <div className={classes.graphContainer}>
        <PieChart responsive className={classes.chartStyles} height={200} margin={{ right:50 }}>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
            outerRadius="80%" 
            innerRadius="60%"
            cx="50%"
          >
            {data && data.map((entry, index) => (
              <Cell key={`cell-${entry.name}`} fill={CONDITION_GRAPH_COLORS[index % CONDITION_GRAPH_COLORS.length]} />
            ))}
          </Pie>
          <Legend
            content={<CustomLegend />}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </div>
    </section>
  );
}

ConditionGraph.propTypes = {
  data: proptypes.array,
}

CustomLegend.propTypes = {
  payload: proptypes.array,
}




export default ConditionGraph;
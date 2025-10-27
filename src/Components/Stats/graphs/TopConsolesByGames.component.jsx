import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";
import proptypes from 'prop-types';
import { GRAPH_COLORS } from "../../../utils/constants";
import classes from './Graphs.module.css';

const CustomLabel = ({ x, width, y, value }) => {
    if (width < 40) return null;
    return (
      <text
        x={x + width / 2}
        y={y + 20} // vertical center of bar
        fill="#000e1d"
        textAnchor="middle"
        fontSize={14}
      >
        {value}
      </text>
    );
  };

const TopConsolesByGames = ({ data = []}) => {
  return (
    <section className={classes.sectionContainer}>
      <h5>Top 5 Consoles by Games</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <XAxis type="number" domain={[0, 'dataMax']} hide />
          <YAxis
            type="category"
            dataKey="name"
            domain={[0, 'dataMax']}
            width={120}
            tick={{ fill: "#ffffffff", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name, index) => [
              <span style={{ color: '#fff', textAlign: 'center'}} key={index}>{`${value} games`}</span>,
              ""]}
            contentStyle={{
              backgroundColor: "#000e1d",
              borderRadius: "6px",
              color: "#fff",
              border: "1px solid #8884d8",
            }}
          />
          <Bar dataKey="value" stackId="a">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={GRAPH_COLORS[index % GRAPH_COLORS.length]} />
            ))}
            <LabelList
              dataKey="value"
              content={CustomLabel}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

TopConsolesByGames.propTypes = {
  data: proptypes.array
}

CustomLabel.propTypes = {
  x: proptypes.number,
  y: proptypes.number,
  value: proptypes.number,
  width: proptypes.number
}

export default TopConsolesByGames;
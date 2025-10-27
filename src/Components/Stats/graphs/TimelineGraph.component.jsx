
import proptypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import classes from './Graphs.module.css'

const TimelineGraph = ({ data = [] }) => (
  <section className={classes.sectionContainer}>
    <h5>Number of Games by Console - Timeline</h5>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={60}
          tick={{ fill: "#ffffffff", fontSize: 12 }}
        />
        <YAxis
          tick={{ fill: "#ffffffff", fontSize: 12 }}
          label={{ value: 'Number of Games', angle: -90, position: 'insideBottomLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#000e1d",
            borderRadius: "6px",
            color: "#fff",
            border: "1px solid #8884d8",
          }}
          formatter={(value, name, index) => [
            <span style={{ color: '#fff', textAlign: 'center'}} key={index}>{`${value} games`}</span>,
            ""]}
        />
        <Bar dataKey="value" fill="#5ab5c1" stroke="none"/>
      </BarChart>
    </ResponsiveContainer>
  </section>
);

TimelineGraph.propTypes = {
  data: proptypes.array,
}


export default TimelineGraph;
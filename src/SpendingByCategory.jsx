import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getCategoryColor } from './categoryColors';
import { formatCurrency } from './format';

function SpendingByCategory({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const data = Object.entries(totalsByCategory).map(([category, amount]) => ({ category, amount }));

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-state">No expenses recorded yet. Add one below to see it here.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201, 162, 39, 0.15)" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: "#9fbba8", fontFamily: "IBM Plex Mono, monospace" }}
              axisLine={{ stroke: "rgba(201, 162, 39, 0.28)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9fbba8", fontFamily: "IBM Plex Mono, monospace" }}
              tickFormatter={(value) => formatCurrency(value)}
              width={60}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              cursor={{ fill: "rgba(201, 162, 39, 0.08)" }}
              contentStyle={{
                background: "#123522",
                border: "1px solid rgba(201, 162, 39, 0.4)",
                borderRadius: 4,
                color: "#f4efe1",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 12,
              }}
              labelStyle={{ color: "#c9a227" }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map(entry => (
                <Cell key={entry.category} fill={getCategoryColor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategory;

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categoryColors = {
  food: "#3b6fd6",
  housing: "#1e9e74",
  utilities: "#d69a2d",
  transport: "#7a5ac1",
  entertainment: "#c1447b",
  salary: "#e0663d",
  other: "#8a8f94",
};

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
        <p className="empty-state">No expenses yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e3e6e1" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: "#5b6168", fontFamily: "Inter, sans-serif" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#5b6168", fontFamily: "IBM Plex Mono, monospace" }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <Tooltip
              formatter={(value) => `$${value}`}
              cursor={{ fill: "#f5f6f2" }}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e3e6e1",
                borderRadius: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
              }}
              labelStyle={{ color: "#1c2024", fontWeight: 600, marginBottom: 4 }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {data.map(entry => (
                <Cell key={entry.category} fill={categoryColors[entry.category] ?? "#898781"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategory;

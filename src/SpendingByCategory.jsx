import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const categoryColors = {
  food: "#2a78d6",
  housing: "#1baf7a",
  utilities: "#eda100",
  transport: "#008300",
  entertainment: "#4a3aa7",
  salary: "#e34948",
  other: "#e87ba4",
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
            <CartesianGrid strokeDasharray="3 3" stroke="#e1e0d9" vertical={false} />
            <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#52514e" }} />
            <YAxis tick={{ fontSize: 12, fill: "#52514e" }} tickFormatter={(value) => `$${value}`} width={60} />
            <Tooltip formatter={(value) => `$${value}`} cursor={{ fill: "#f5f5f5" }} />
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

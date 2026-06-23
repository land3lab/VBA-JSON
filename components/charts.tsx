'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function RevenueChart({
  data,
}: {
  data: { month: string; expected: number; received: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={310}>
      <AreaChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="expected" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="received" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#0b2340" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#0b2340" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${v}만`} />
        <Tooltip formatter={(v) => `${Number(v).toLocaleString('ko-KR')}만원`} />
        <Legend />
        <Area dataKey="expected" name="예상 중개보수" stroke="#2563eb" fill="url(#expected)" strokeWidth={3} />
        <Area dataKey="received" name="실제 수령" stroke="#0b2340" fill="url(#received)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function StageChart({ data }: { data: { name: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 11 }} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="count" name="계약 건수" fill="#2563eb" radius={[8, 8, 0, 0]} barSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TypePie({ data }: { data: { name: string; value: number }[] }) {
  const colors = ['#0b2340', '#2563eb', '#64748b', '#22c55e', '#f59e0b', '#ef4444', '#7c3aed'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={54} outerRadius={92} paddingAngle={3} label>
          {data.map((_, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ContractVelocityChart({ data }: { data: { month: string; contracts: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={data} margin={{ top: 10, right: 12, left: -24, bottom: 0 }}>
        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="contracts" name="계약 건수" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

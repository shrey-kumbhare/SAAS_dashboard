import React from "react";

const Widgets = () => {
  const metrics = [
    { label: "Users", value: 1200 },
    { label: "Revenue", value: "$34,000" },
    { label: "Active Sessions", value: 75 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold">{metric.label}</h2>
          <p className="text-2xl font-bold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Widgets;

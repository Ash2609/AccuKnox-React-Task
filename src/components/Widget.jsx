import { useDispatch } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { removeWidget } from "../store/dashboardSlice";

// 🎨 Default palette for fallback
const DEFAULT_COLORS = [
  "#dc2626", // red
  "#f97316", // orange
  "#facc15", // yellow
  "#9ca3af", // gray
  "#3b82f6", // blue
  "#10b981", // green
];

export default function Widget({ categoryName, widget }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col h-80 hover:shadow-lg transition-shadow duration-200">
      {/* 🔹 Title + Remove button */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">{widget.title}</h4>
        <button
          onClick={() =>
            dispatch(removeWidget({ categoryName, widgetTitle: widget.title }))
          }
          className="text-red-500 text-lg font-bold hover:text-red-700"
          title="Remove Widget"
        >
          ✕
        </button>
      </div>

      {/* 🔹 Widget Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Donut Chart */}
        {widget.type === "donut" && widget.data && (
          <>
            <div className="w-full h-48 relative">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={widget.data}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {widget.data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          widget.colors?.[index % widget.colors.length] ||
                          DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-bold text-lg">{widget.total}</span>
                <span className="text-sm text-gray-500">Total</span>
              </div>
            </div>

            {/* Donut Legends */}
            <div className="flex flex-wrap justify-center mt-3 gap-4 text-sm">
              {widget.data.map((entry, index) => (
                <span key={index} className="flex items-center">
                  <span
                    className="w-3 h-3 mr-1 rounded"
                    style={{
                      backgroundColor:
                        widget.colors?.[index % widget.colors.length] ||
                        DEFAULT_COLORS[index % DEFAULT_COLORS.length],
                    }}
                  ></span>
                  {entry.name} ({entry.value})
                </span>
              ))}
            </div>
          </>
        )}

        {/* Bar Chart */}
        {widget.type === "bar" && widget.data && (
          <div className="w-full h-48 flex flex-col justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-lg">{widget.total}</span> Total
            </p>
            <div className="h-3 w-full bg-gray-200 rounded-lg overflow-hidden flex">
              {widget.data.map((d, i) => (
                <div
                  key={i}
                  style={{
                    width: `${(d.value / widget.total) * 100}%`,
                    backgroundColor:
                      d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                  }}
                ></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              {widget.data.map((d, i) => (
                <span key={i} className="flex items-center">
                  <span
                    className="w-3 h-3 mr-2 rounded"
                    style={{
                      backgroundColor:
                        d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
                    }}
                  ></span>
                  {d.name} ({d.value})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty Widget */}
        {widget.type === "empty" && (
          <div className="flex flex-col items-center justify-center w-full h-48">
            <span className="text-4xl text-black opacity-30">📉</span>
            <p className="text-sm text-gray-600 mt-2">
              No Graph data available!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

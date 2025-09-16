import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          title: "Cloud Accounts",
          type: "donut",
          visible: true,
          data: [
            { name: "Connected", value: 2 },
            { name: "Not Connected", value: 2 },
          ],
          total: 2,
          colors: ["#3b82f6", "#e5e7eb"],
        },
        {
          title: "Cloud Account Risk Assessment",
          type: "donut",
          visible: true,
          data: [
            { name: "Failed", value: 1689 },
            { name: "Warning", value: 681 },
            { name: "Not available", value: 36 },
            { name: "Passed", value: 7253 },
          ],
          total: 9659,
          colors: ["#dc2626", "#facc15", "#9ca3af", "#16a34a"],
        },
      ],
    },
    {
      name: "CWPP Dashboard",
      widgets: [
        { title: "Top 5 Namespace Specific Alerts", type: "empty", visible: true },
        { title: "Workload Alerts", type: "empty", visible: true },
      ],
    },
    {
      name: "Registry Scan",
      widgets: [
        {
          title: "Image Risk Assessment",
          type: "bar",
          visible: true,
          total: 1470,
          data: [
            { name: "Critical", value: 9, color: "#dc2626" },
            { name: "High", value: 150, color: "#f97316" },
            { name: "Medium", value: 500, color: "#facc15" },
            { name: "Low", value: 811, color: "#9ca3af" },
          ],
        },
        {
          title: "Image Security Issues",
          type: "bar",
          visible: true,
          total: 2,
          data: [
            { name: "Critical", value: 2, color: "#991b1b" },
            { name: "High", value: 2, color: "#ea580c" },
          ],
        },
      ],
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, widget } = action.payload;
      const category = state.categories.find((c) => c.name === categoryName);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetTitle } = action.payload;
      const category = state.categories.find((c) => c.name === categoryName);
      if (category) {
        category.widgets = category.widgets.filter(
          (w) => w.title !== widgetTitle
        );
      }
    },
    addCategory: (state, action) => {
      state.categories.push({ name: action.payload, widgets: [] });
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (c) => c.name !== action.payload
      );
    },
    toggleWidgetVisibility: (state, action) => {
      const { categoryName, widgetTitle } = action.payload;
      const category = state.categories.find((c) => c.name === categoryName);
      if (category) {
        const widget = category.widgets.find((w) => w.title === widgetTitle);
        if (widget) {
          widget.visible = !widget.visible;
        }
      }
    },
  },
});

export const {
  addWidget,
  removeWidget,
  addCategory,
  removeCategory,
  toggleWidgetVisibility,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

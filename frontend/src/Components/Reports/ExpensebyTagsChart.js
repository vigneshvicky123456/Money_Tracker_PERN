import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagExpenseReports } from "../../features/reportsSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ExpensebyTagsChart = () => {
  const dispatch = useDispatch();
  const { tagExpenseData = [] } = useSelector((state) => state.reports);

  const data =
    tagExpenseData.length > 0
      ? tagExpenseData.map((tag, index) => ({
          Tag: tag.tagName,
          TotalExpense: tag.totalExpense || 0,
        }))
      : [];
      
  useEffect(() => {
    dispatch(fetchTagExpenseReports());
  }, [dispatch, tagExpenseData]);

  return (
    <div>
      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="Tag" type="category" />
          <Tooltip />
          <Bar dataKey="TotalExpense" fill="#FF5F5E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensebyTagsChart;

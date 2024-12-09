import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";
import { fetchReports } from "../../features/reportsSlice";

const Expense_IncomeChart = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const { incomeData = [], expenseData = [], amountData =[] } = useSelector((state) => state.reports);

  const data = incomeData.length > 0 && expenseData.length > 0
      ? incomeData.map((income, index) => ({
          Month: ` ${income.month}`,
          TotalIncome: income.totalIncome || 0,
          TotalExpense: expenseData[index]?.totalExpense || 0,
        }))
      : [];

      const TotalIncomeAmount = amountData[0]?.totalIncomeAmount || 0;
      const TotalExpenseAmount = amountData[0]?.totalExpenseAmount || 0;

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch, currencyModel1?.currencyModel?.id]);

  if (!incomeData || !expenseData) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <div className="flex p-4 border-b">
        <span>
          <p className="text-green-600 text-center text-xl">{TotalIncomeAmount} {currencyModel1.currencyModel?.currency_code}</p>
          <p className="font-medium">TOTAL INCOME</p>
        </span>
        <span className="relative pl-[50px]">
          <p className="text-red-600 text-center text-xl">-{TotalExpenseAmount} {currencyModel1.currencyModel?.currency_code}</p>
          <p className="font-medium">TOTAL EXPENSE</p>
        </span>
      </div>
      <ResponsiveContainer width={"100%"} height={500}>
        <BarChart
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="TotalIncome"
            fill="#B3CDAD"
          />
          <Bar
            dataKey="TotalExpense"
            fill="#FF5F5E"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Expense_IncomeChart;

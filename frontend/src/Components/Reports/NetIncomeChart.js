import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";
import { fetchNetIncomeReports } from "../../features/reportsSlice";

const NetIncomeChart = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const { incomeData = [], amountData = [] } = useSelector((state) => state.reports);

  const data = incomeData.length > 0
      ? incomeData.map((income) => ({
          Month: ` ${income.month}`,
          NetIncome: income.NetIncome || 0,
        }))
      : [];

  const TotalNetIncome = amountData[0]?.totalNetIncome || 0;
  const AverageNetIncome = amountData[0]?.averageNetIncome || 0;

  useEffect(() => {
    dispatch(fetchNetIncomeReports());
  }, [dispatch, currencyModel1?.currencyModel?.id]);
  
  if (!incomeData) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <div className="flex p-4 border-b">
        <span>
          <p className="text-green-600 text-center text-xl">{TotalNetIncome} {currencyModel1.currencyModel?.currency_code}</p>
          <p className="font-medium">TOTAL NET INCOME</p>
        </span>
        <span className="relative pl-[50px]">
          <p className="text-red-600 text-center text-xl">{AverageNetIncome} {currencyModel1.currencyModel?.currency_code}</p>
          <p className="font-medium">AVERAGE NET INCOME</p>
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
          <Bar dataKey="NetIncome">
           {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.NetIncome >= 0 ? "#B3CDAD" : "#FF5F5E"}
              />
            ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default NetIncomeChart;

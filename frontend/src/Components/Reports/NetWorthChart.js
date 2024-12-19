import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchNetWorthReports } from "../../features/reportsSlice";

const NetWorthChart = () => {
  const dispatch = useDispatch();
  const currencyModel1 = useSelector((state) => state.currency.currencyModel1);
  const { incomeData = [] } = useSelector((state) => state.reports);

  const data = incomeData.length > 0
      ? incomeData.map((income) => ({
          Month: ` ${income.month}`,
          NetWorth: income.NetWorth || 0,
        }))
      : [];

  useEffect(() => {
    dispatch(fetchNetWorthReports());
  }, [dispatch, currencyModel1?.currencyModel?.id]);
    
  if (!incomeData) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
        <ResponsiveContainer width={"100%"} height={590}>
        <AreaChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 10,
            bottom: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="NetWorth" stroke="#3CB043" fill="#D3D3D3" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
      
    </div>
  )
}

export default NetWorthChart;

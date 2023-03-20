import "./overview.scss"
import React from 'react'
import AppointmentsChart from '../../../components/appointments-chart/Chart'
import useGetSummary from "../../../hooks/queries/admin/useGetSummary";

function Overview() {

  const { data: summary } = useGetSummary();

  const getDailySums = (items) => {
    const dailyInflow = [0, 0, 0, 0, 0, 0, 0];
    const dailyOutflow = [0, 0, 0, 0, 0, 0, 0];

    if (!items) return { monthlyInflow: dailyInflow, monthlyOutflow: dailyOutflow };

    for (const item of items) {
      const date = new Date(item.date);
      const month = date.getMonth();
      if (parseFloat(item.amount) > 0) {
        dailyInflow[month] += +item.amount;
      }
      else if (parseFloat(item.amount) < 0) {
        dailyOutflow[month] += -item.amount;
      }
    }
    return { monthlyInflow: dailyInflow, monthlyOutflow: dailyOutflow };
  }

  return (
    <div className='overview'>

      <h2>Overview</h2>

      <hr />

      <div className="content-wrapper">

        <div className="left-section-wrapper">
          <div className="left-section">

            <div className="balance">
              <p>Number of Patients</p>
              <h3>{summary?.patients}</h3>
            </div>

            <div className="balance">
              <p>Number of Professionals</p>
              <h3>{summary?.professionals}</h3>
            </div>

          </div>

        </div>

        <div className="right-section-wrapper">
          <div className="right-section">
            <h4>Patients Summary</h4>
            <div className="chart-holder">
              <AppointmentsChart chartData={summary ? getDailySums(null) : {}} />

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Overview
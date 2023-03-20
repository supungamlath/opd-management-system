import "./overview.scss"
import React from 'react'
import AppointmentsChart from '../../../components/appointments-chart/Chart'
import useGetAppointments from "../../../hooks/queries/professional/useGetAppointments";

function Overview() {

  const { data: appointments } = useGetAppointments();
  console.log(appointments);
  const getMonthlySums = (items) => {
    const monthlyInflow = [0, 0, 0, 3, 0, 1, 3];
    const monthlyOutflow = [0, 0, 0, 1, 0, 0, 0];

    if (!items) return { monthlyInflow, monthlyOutflow };

    for (const item of items) {
      const date = new Date(item.date);
      const month = date.getMonth();
      if (parseFloat(item.amount) > 0) {
        monthlyInflow[month] += +item.amount;
      }
      else if (parseFloat(item.amount) < 0) {
        monthlyOutflow[month] += -item.amount;
      }
    }
    return { monthlyInflow, monthlyOutflow };
  }

  return (
    <div className='overview'>

      <h2>Overview</h2>

      <hr />

      <div className="content-wrapper">

        <div className="left-section-wrapper">
          <div className="left-section">

            <div className="balance">
              <p>Number of Appointments</p>
              <h3>{appointments?.data?.rows?.length}</h3>
            </div>

          </div>

        </div>

        <div className="right-section-wrapper">
          <div className="right-section">
            <h4>Appointments Summary</h4>
            <div className="chart-holder">
              <AppointmentsChart chartData={appointments ? getMonthlySums(null) : {}} />

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Overview
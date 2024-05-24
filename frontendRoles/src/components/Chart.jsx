import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { questions } from "./questions";
import { useState } from "react";
import axios from "axios";
function BarChart() {
  // Count occurrences of each answer category

//  const [questions ,setQuestions] = useState([]);
 
//  console.log(questions)
//  setQuestions(ques);
//  useEffect(()=>{
//   setQuestions(ques[0].questions);
//   console.log(questions);
//  },[])

// const getAllQuestions = async () => {
//   axios
//     .get("https://manthanr.onrender.com/v1/getAllData")
//     .then((res) => {
//       // console.log(res.data);
//       setQuestions(res.data[0].questions);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// useEffect(()=>{
//   getAllQuestions();
// },[]);

  const answerCounts = {
    "strongly agree": 0,
    agree: 0,
    undecided: 0,
    disagree: 0,
    "strongly disagree": 0,
  };

  questions.forEach((question) => {
    answerCounts[question.answer]++;
  });

  // Extract labels and values for the chart
  const labels = Object.keys(answerCounts);
  const values = Object.values(answerCounts);

  // ApexCharts options
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: 14,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      title: {
        text: "Options",
        style: {
          fontWeight: "700",
          fontSize: "18px",
          fontFamily: "Montserrat, sans-serif",
        },
      },
      categories: labels,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Montserrat, sans-serif",
        },
      },
    },
    yaxis: {
      title: {
        text: "Count",
        style: {
          fontWeight: "700",
          fontSize: "18px",
          fontFamily: "Montserrat, sans-serif",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: "500",
          fontFamily: "Montserrat, sans-serif",
        },
      },
      forceNiceScale: true,
    },
    title: {
      text: "Chart Title",
      align: "center",
      margin: 26,
      offsetY: 10,
      style: {
        fontSize: "22px",
        fontWeight: "700",
        fontFamily: "Montserrat, sans-serif",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  // ApexCharts series data
  const series = [
    {
      name: "Count",
      data: values,
    },
  ];

  return (
    <div className="bg-blue-200 border p-6 rounded-lg border-gray-300">
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
}

export default BarChart;

// Author: Kyle Angeles
// File-Name: StatChart.jsx
// Description: This component handles the frontend for displaying certain charts 

// Import libraries for this component
import React from "react";
import {useState} from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



function StatChart() {


// declare some data
const [metrics, setMetrics] =  useState([
    {label: 'factor', value: ''},
    {label: 'score',  value:''},
    {label: 'trend', value:''},
    {label: 'risk', value:''}

    
])

function updateValue() {
  setMetrics((current) =>
    current.map((metric) =>
      metric.label === label ? { ...metric, value } : metric,
    ),
  );
}


    return (
        
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 w-full p-8 rounded-2xl border border-[var(--border)] shadow-2xl shadow-black/80">
        {metrics.map(({ label, value }, index) => (
            <article key={label} className="metric-card">
            <div className="flex items-center justify-between mb-2">
                <label htmlFor={`metric-${label}`}>{label}</label>
                <span>0{index + 1}</span>
            </div>
            <input
                
                id={`metric-${label}`}
                aria-label={`${label} value`}
                onChange={(event) => updateValue(label, event.target.value)}
                placeholder="—"
                type="text"
                value={value}
            />
    </article>
  ))}
</div>
  </section>
        
       
        
    )
}

export default StatChart;

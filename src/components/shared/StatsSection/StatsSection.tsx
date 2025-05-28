// components/StatsSection.tsx
import React from "react";
import './style.css'
// import { getStatistic } from "@/lib/api-client/statistic";
import { StatisticType } from "@/types";



const StatsSection = async ({ statistics }: { statistics: StatisticType[] }) => {

  return (
    <section id='stats-section' className="statistic w-full h-[200px] flex items-center justify-between  bg-cover bg-center  text-white py-10 px-5">
      <div className=" bg-opacity-50  py-10 px-5 w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-around  gap-6  text-center">
          {statistics.map((stat, index) => (
            <div key={index}>
              <h2 className="lg:text-5xl md:text-4xl text-3xl font-title-500">{stat.number}+</h2>
              <p className="mt-2 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

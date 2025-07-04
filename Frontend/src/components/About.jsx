// import React from "react";
import Statistics from "./Statistics";
import pilot  from "../assets/pilot.png";

function About() {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
                  About{" "}
                </span>
                PlaceMentor
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Placementor is an AI-powered interview practice platform
                designed to help you crack company-specific interviews with
                confidence. From personalized mock sessions to real-time
                feedback by intelligent agents, we tailor your prep to match the
                exact expectations of top recruiters.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

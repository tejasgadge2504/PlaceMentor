import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";

const serviceList = [
  {
    title: "Personalized Interview Preparation",
    description:
      "Tailored AI-driven mock interviews to match your target job role and industry.",
    icon: <ChartIcon />,
  },
  {
    title: "Real-Time Feedback",
    description:
      "Instant AI feedback to refine your answers and boost interview confidence.",
    icon: <WalletIcon />,
  },
  {
    title: "Resume Parsing Service",
    description:
      "Extracts structured candidate data from uploaded resumes to personalize the interview experience.",
    icon: <MagnifierIcon />,
  },
];

function Services() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
        {/* Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
              Comprehensive{" "}
            </span>
            Interview Preparation Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8">
            Tailored Solutions to Elevate Your Interview Skills and Confidence
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={cubeLeg}
            className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
            alt="About services"
          />
        </div>
      </div>
    </section>
  );
}

export default Services;

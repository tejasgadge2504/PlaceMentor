import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

const features = [
  {
    title: "Company-Specific Practice",
    description:
      "Get mock interviews tailored to companies like Google, Amazon, TCS, or startups — powered by AI trained on real patterns.",
    image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Built for ease — no clutter, no confusion. Focus only on what matters: your prep.",
    image: image3,
  },
  {
    title: "AI-Powered insights",
    description:
      "Receive instant, intelligent feedback on your answers with areas of improvement, strengths, and actionable tips.",
    image: image,
  },
];

const featureList = [
  "Company-Specific Interview Sets",
  "AI Agent-Based Mock Interviews",
  "Personalized Feedback & Insights",
  "Real-Time Performance Analytics",
];

function Features() {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Features;

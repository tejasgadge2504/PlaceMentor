
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

const features = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "Practice anytime, anywhere — all you need is a browser. Placementor is built for convenience and inclusivity.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Join a thriving network of learners and mentors, sharing tips, experiences, and motivation to grow together.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Whether you're targeting startups or FAANG, Placementor scales your prep with tailored interview sets for each company.",
  },
  {
    icon: <GiftIcon />,
    title: "Personalization",
    description:
      "Your journey, your pace. Get tailored question sets, feedback, and improvement plans aligned to your goals.",
  },
];

function HowItWorks() {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Master your interviews in four simple steps with Placementor’s AI
        agent–driven experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;

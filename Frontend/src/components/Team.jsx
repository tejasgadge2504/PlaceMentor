import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, Github } from "lucide-react";
import pfp from "../assets/tejaspfp.png";

const teamList = [
  {
    imageUrl: pfp,
    name: "Tejas Gadge",
    position: "Full Stack Developer",
    description:
      "Architects the logic behind the magic. Loves scalable systems, clean APIs, and debugging at 2 AM.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/tejas-gadge-8a395b258/",
      },
      { name: "Github", url: "https://github.com/tejasgadge2504" },
    ],
  },
  {
    imageUrl:
      "https://img.freepik.com/premium-photo/account-manager-digital-avatar-generative-ai_934475-9386.jpg",
    name: "Anisha Shankar",
    position: "Full Stack Developer",
    description:
      "Crafts seamless digital experiences from frontend polish to backend power. Runs on logic and caffeine.",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/anisha-shankar-/",
      },
      { name: "Github", url: "https://github.com/hahaanisha" },
    ],
  },
];

const socialIcon = (iconName) => {
  switch (iconName) {
    case "Linkedin":
      return <Linkedin size="20" />;
    case "Github":
      return <Github size="20" />;
    default:
      return null;
  }
};

function Team() {
  return (
    <section id="team" className="container py-24 sm:py-32">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
            Brains Behind{" "}
          </span>
          Placementor
        </h2>

        <p className="mt-4 mb-10 text-xl text-muted-foreground">
          Just two curious minds, a lot of caffeine, and one mission — to
          reinvent interview prep with AI.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 gap-y-10">
          {teamList.map(
            ({ imageUrl, name, position, description, socialNetworks }) => (
              <Card
                key={name}
                className="w-full max-w-sm bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
              >
                <CardHeader className="mt-8 flex justify-center items-center pb-2">
                  <img
                    src={imageUrl}
                    alt={`${name} ${position}`}
                    className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                  />
                  <CardTitle className="text-center">{name}</CardTitle>
                  <CardDescription className="text-primary">
                    {position}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-2">
                  <p>{description}</p>
                </CardContent>

                <CardFooter>
                  {socialNetworks.map(({ name, url }) => (
                    <div key={name}>
                      <a
                        rel="noreferrer noopener"
                        href={url}
                        target="_blank"
                        className={buttonVariants({
                          variant: "ghost",
                          size: "sm",
                        })}
                      >
                        <span className="sr-only">{name} icon</span>
                        {socialIcon(name)}
                      </a>
                    </div>
                  ))}
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Team;

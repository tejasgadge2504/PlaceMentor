import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import image from "../assets/teaminspire.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { LightBulbIcon } from "./Icons";

function HeroCards() {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="https://github.com/shadcn.png" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          Just aced my interview thanks to @Placementor! Highly recommend!.
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src={image}
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Team INSPIRE</CardTitle>
          <div className="flex gap-2.5">
            <CardDescription className="font-normal text-primary">
              <a href="https://www.linkedin.com/in/tejas-gadge-8a395b258/">
                <b>Tejas Gadge</b>
              </a>
            </CardDescription>
            <CardDescription className="font-normal text-primary">
              <a href="https://www.linkedin.com/in/anisha-shankar-/">
                <b>Anisha Shankar</b>
              </a>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            The team behind Placementor, committed to revolutionizing interview
            preparation with cutting-edge AI technology.
          </p>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Start Now
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Get started with essential interview preparation tools.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "AI-Powered Mock Interviews",
              "Real-Time Feedback",
              "Resume Parsing",
            ].map((benefit) => (
              <span key={benefit} className="flex">
                <Check className="text-green-500" />
                <h3 className="ml-2">{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Mock Interviews</CardTitle>
            <CardDescription className="text-md mt-2">
              Experience <b>AI-powered mock interviews </b>tailored to your
              target role.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default HeroCards;

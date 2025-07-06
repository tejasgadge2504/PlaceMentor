import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Priya",
    name: "Priya Sinha",
    userName: "@dev_diaries",
    comment:
      "Mock interviews felt so real, I forgot it was AI! Helped me crack my dream role at Amazon.",
  },
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Kevin",
    name: "Kevin Mathews",
    userName: "@codebykevin",
    comment:
      "The feedback was 🔥. Clear, concise, and super actionable. Placementor > random prep videos.",
  },
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Pari",
    name: "Pari Sharma",
    userName: "@pixel_pari",
    comment:
      "Resume parser saved me HOURS. Didn’t know I had so many weak spots till now 😅.",
  },
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Akash",
    name: "Akash Mehta",
    userName: "@akashloops",
    comment:
      "Practiced every night before placements. Felt like a cheat code. Highly recommend.",
  },
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ananya",
    name: "Ananya Rao",
    userName: "@ui_ananya",
    comment:
      "Finally, a platform that *gets* how different interviews are for different roles. Nailed my UX round!",
  },
  {
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Shiv",
    name: "Shiv Malhotra",
    userName: "@buildwithshiv",
    comment:
      "Loved how it simulated Google-style system design rounds. Feedback was spot on!",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="container py-10 sm:py-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Discover Why
          <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
            {" "}
            People Love{" "}
          </span>
          PlaceMentor
        </h2>

        <p className="text-xl text-muted-foreground pt-4 pb-8">
          Real voices. Real results. See how <b>Placementor</b> is transforming
          interview prep.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(({ image, name, userName, comment }) => (
          <Card
            key={userName}
            className="max-w-md md:break-inside-avoid overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={image} alt={`${name}'s profile`} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{userName}</CardDescription>
              </div>
            </CardHeader>

            <CardContent>{comment}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;

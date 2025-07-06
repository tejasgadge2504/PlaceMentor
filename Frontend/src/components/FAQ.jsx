import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";

const FAQList = [
  {
    question: "What is Placementor?",
    answer:
      "Placementor is an AI-powered platform designed to simulate real interview scenarios, generate personalized questions, and provide detailed feedback to help users improve their interview performance.",
    value: "item-1",
  },
  {
    question: "How does Placementor generate interview questions?",
    answer:
      "Placementor uses advanced AI agents, including Gemini within the Agno framework, to analyze your resume and chosen role to create a customized interview question set based on industry standards.",
    value: "item-2",
  },
  {
    question: "Can I upload my resume? What happens after that?",
    answer:
      "Yes. When you upload your resume, Placementor parses it to extract key information such as skills, projects, and experience to tailor the interview simulation accordingly.",
    value: "item-3",
  },
  {
    question: "How does the feedback system work?",
    answer:
      "After each mock interview, Placementor’s Feedback Agent evaluates your spoken responses on clarity, structure, and relevance, and gives you a score along with actionable suggestions for improvement.",
    value: "item-4",
  },
  {
    question:
      "Is Placementor suitable for both freshers and experienced professionals?",
    answer:
      "Absolutely. Whether you're a fresher preparing for your first job or an experienced professional switching roles, Placementor adapts to your profile and goals.",
    value: "item-5",
  },
  {
    question: "Can I reattempt the same interview questions for practice?",
    answer:
      "Yes, Placementor allows you to retry questions as many times as you'd like. The feedback agent updates its evaluation based on each new response, helping you track your improvement over time.",
    value: "item-6",
  },
];

function FAQ() {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-[#20B256] bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
}

export default FAQ;

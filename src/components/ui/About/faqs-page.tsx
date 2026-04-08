import { DecorIcon } from "@/components/ui/decor-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqsSection() {
  return (
    <section id="faqs" className="mx-auto grid py-10 w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:border-x">
      <div className="px-4 pt-12 pb-6">
        <div className="space-y-5">
          <h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Quick answers to common questions about SplitEase. Open any question
            to learn more.
          </p>
          <p className="text-muted-foreground">
            {"Can't find what you're looking for? "}
            <a className="text-primary hover:underline" href="#">
              Contact Us
            </a>
          </p>
        </div>
      </div>
      <div className="relative place-content-center">
        {/* vertical guide line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-3 h-full w-px bg-border"
        />

        <Accordion
          className="rounded-none border-x-0 border-y"
          collapsible
          type="single"
        >
          {faqs.map((item) => (
            <AccordionItem
              className="group relative pl-5"
              key={item.id}
              value={item.id}
            >
              <DecorIcon
                className="left-3.25 size-3 group-last:hidden"
                position="bottom-left"
              />

              <AccordionTrigger className="px-4 py-4 hover:no-underline focus-visible:underline focus-visible:ring-0">
                {item.title}
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const faqs = [
  {
    id: "item-1",
    title: "What is SplitEase?",
    content:
      "SplitEase is a shared-house management platform that helps members and managers track meals, deposits, expenses, and monthly settlements in one place.",
  },
  {
    id: "item-2",
    title: "Who can use SplitEase?",
    content:
      "SplitEase is ideal for shared flats, hostels, and co-living houses where multiple people contribute to monthly costs and need transparent records.",
  },
  {
    id: "item-3",
    title: "What features are included?",
    content:
      "You can manage houses and months, log meals by member, record deposits and expenses, review monthly summaries, and monitor balances with clear dashboard insights.",
  },
  {
    id: "item-4",
    title: "How is meal rate calculated?",
    content:
      "Meal rate is calculated from monthly totals based on recorded meals and expenses. The dashboard summary shows the current meal rate for the selected month.",
  },
  {
    id: "item-5",
    title: "Can members edit expense or deposit records?",
    content:
      "By default, role-based access keeps members in a read-only experience for sensitive actions. Managers can create, update, and remove financial records.",
  },
  {
    id: "item-6",
    title: "How do subscriptions and payments work?",
    content:
      "Managers can choose a plan and initiate secure checkout from the subscription page. After successful payment, subscription status and plan details are updated.",
  },
  {
    id: "item-7",
    title: "How do we get started?",
    content:
      "Create an account, set up your house and month, invite members, then start logging meals and shared expenses. You can upgrade plans anytime from the dashboard.",
  },
];

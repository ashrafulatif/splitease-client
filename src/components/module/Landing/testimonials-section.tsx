import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Before SplitEase, we argued every month over who paid what. Now deposits, bills, and balances are visible to everyone in our flat.",
    image: "https://i.pravatar.cc/150?img=12",
    name: "Afsana Rahman",
    role: "House Manager",
    company: "Green View Residency",
  },
  {
    quote:
      "The monthly summary saves me hours. Meal rate and expense categories are all there, so I no longer maintain a manual spreadsheet.",
    image: "https://i.pravatar.cc/150?img=33",
    name: "Sabbir Hasan",
    role: "Operations Lead",
    company: "Urban Nest Co-Living",
  },

  {
    quote:
      "I record rent, internet, and utility bills in minutes. Members can track every update, so there are fewer payment follow-ups.",
    image: "https://i.pravatar.cc/150?img=17",
    name: "Tanvir Hossain",
    role: "Property Coordinator",
    company: "North Point Housing",
  },
  {
    quote:
      "The house setup was simple and month-based tracking just works. We migrated from paper notes in one weekend.",
    image: "https://i.pravatar.cc/150?img=47",
    name: "Nusrat Jahan",
    role: "Admin",
    company: "Maple House Society",
  },
  {
    quote:
      "Role-based access is exactly what we needed. Managers handle updates while members can review records without accidental edits.",
    image: "https://i.pravatar.cc/150?img=59",
    name: "Mehedi Kabir",
    role: "Community Manager",
    company: "Lakeview Shared Homes",
  },
  {
    quote:
      "We upgraded our plan and completed checkout quickly. Billing history and active subscription status are easy to verify.",
    image: "https://i.pravatar.cc/150?img=23",
    name: "Faria Sultana",
    role: "Finance Officer",
    company: "Cornerstone Living",
  },
  {
    quote:
      "The dashboard is clear and fast. Our members now log meals regularly and budget discussions are based on real numbers.",
    image: "https://i.pravatar.cc/150?img=41",
    name: "Rafiul Islam",
    role: "Resident",
    company: "Sunset Boys Hostel",
  },
  {
    quote:
      "When we make an entry mistake, editing or removing it is straightforward. Real-time refresh has reduced monthly billing errors.",
    image: "https://i.pravatar.cc/150?img=68",
    name: "Muntasir Ahmed",
    role: "Assistant Manager",
    company: "Bluebell Residences",
  },
  {
    quote:
      "Filtering by house and month helps us review everything quickly before settlement day. It is now part of our monthly routine.",
    image: "https://i.pravatar.cc/150?img=29",
    name: "Jannatul Ferdous",
    role: "Member",
    company: "South City Co-Living",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function Testimonials() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4">
          <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
            What Our Users Say 
            <span className="inline-block text-primary animate-bounce italic">
              ?
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="h-1 w-8 rounded-full bg-primary/35" />
            <span className="h-1.5 w-28 rounded-full bg-linear-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_18px] shadow-primary/30" />
            <span className="h-1 w-8 rounded-full bg-primary/35" />
          </div>
          <p className="text-center text-muted-foreground text-sm">
            See what our customers have to say about us.
          </p>
        </div>

        <div
          className={cn(
            "mt-10 flex max-h-160 justify-center gap-6 overflow-hidden",
            "mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]",
          )}
        >
          <InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
            {firstColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden md:block"
            direction="vertical"
            speed={50}
            speedOnHover={25}
          >
            {secondColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden lg:block"
            direction="vertical"
            speed={35}
            speedOnHover={17}
          >
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role, company } = testimonial;
  return (
    <figure
      className={cn(
        "w-full max-w-xs rounded-3xl border bg-card p-8 shadow-foreground/10 shadow-lg dark:bg-card/20",
        className,
      )}
      {...props}
    >
      <blockquote>{quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-2">
        <Avatar className="size-8 rounded-full">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-medium not-italic leading-5 tracking-tight">
            {name}
          </cite>
          <span className="text-muted-foreground text-sm leading-5 tracking-tight">
            {role} {company && `, ${company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

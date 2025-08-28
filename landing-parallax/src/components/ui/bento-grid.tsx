import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
  >
    <div>{background}</div>
    {/* Dark overlay for better text contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-[0]"></div>
    <div className="pointer-events-none z-[1] flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon 
        className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" 
        style={{ color: '#455cff' }}
      />
      <h3 
        className="text-xl font-bold text-white drop-shadow-lg"
      >
        {name}
      </h3>
      <p 
        className="max-w-lg font-medium text-gray-200 drop-shadow-md"
      >
        {description}
      </p>
    </div>
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button 
        variant="ghost" 
        asChild 
        size="sm" 
        className="pointer-events-auto font-bold text-white bg-blue-600/80 hover:bg-blue-600 border-2 border-blue-400 drop-shadow-lg"
        style={{ backgroundColor: '#10069f', borderColor: '#455cff' }}
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4 text-white" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };

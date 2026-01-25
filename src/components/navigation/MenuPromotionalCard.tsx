// components/MenuPromotionalCard.tsx
// import GoToLinkArrowIcon from "@/components/icons/go-to-link";
import Link from "next/link";
import * as React from "react";

function cn(...c: Array<string | undefined>) {
    return c.filter(Boolean).join(" ");
}

type RootProps = {
    href: string;
    className?: string;
    children: React.ReactNode;
};

type TitleProps = React.ComponentPropsWithoutRef<"h2">;
type DescriptionProps = React.ComponentPropsWithoutRef<"p">;
type MediaProps = React.ComponentPropsWithoutRef<"div"> & {
    children: React.ReactNode; // e.g. <Image ... />
};

const Title: React.FC<TitleProps> = ({ className, children, ...rest }) => (
    <h2 className={cn("text-2xl leading-tight font-semibold text-black", className)} {...rest}>
        {children}
    </h2>
);
Title.displayName = "MenuPromotionalCard.Title";

const Description: React.FC<DescriptionProps> = ({ className, children, ...rest }) => (
    <p className={cn("text-justify text-[18px] leading-tight text-black", className)} {...rest}>
        {children}
    </p>
);
Description.displayName = "MenuPromotionalCard.Description";

const Media: React.FC<MediaProps> = ({ className, children, ...rest }) => (
    <div className={cn("relative", className)} {...rest}>
        {children}
    </div>
);
Media.displayName = "MenuPromotionalCard.Media";

type Compound = React.FC<RootProps> & {
    Title: typeof Title;
    Description: typeof Description;
    Media: typeof Media;
};

const Root: React.FC<RootProps> = ({ href, className, children }) => {
    // Pick out the first Title, first Description, first Media.
    let titleNode: React.ReactNode = null;
    let descriptionNode: React.ReactNode = null;
    let mediaNode: React.ReactNode = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        // Identify subcomponents via displayName
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const name = (child.type as any)?.displayName as string | undefined;

        if (name === "MenuPromotionalCard.Title" && !titleNode) {
            titleNode = child;
            return;
        }
        if (name === "MenuPromotionalCard.Description" && !descriptionNode) {
            descriptionNode = child;
            return;
        }
        if (name === "MenuPromotionalCard.Media" && !mediaNode) {
            mediaNode = child;
            return;
        }
    });

    return (
        <div className={cn("relative flex flex-col justify-between overflow-hidden p-8", className)}>
            <div className="max-w-sm overflow-hidden rounded-2xl bg-white shadow">
                {/* Top Section */}
                <Link href={href} aria-label="Open details" className="relative flex items-center justify-between gap-4 p-6 pb-4">
                    <div className="w-8/12">{titleNode}</div>
                    {/* <GoToLinkArrowIcon className="h-10 w-10" /> */}
                </Link>

                {/* Description under the top section */}
                {descriptionNode && <div className="px-6 pb-6">{descriptionNode}</div>}

                {/* Bottom Section */}
                {mediaNode}
            </div>
        </div>
    );
};

const MenuPromotionalCard = Root as Compound;
MenuPromotionalCard.Title = Title;
MenuPromotionalCard.Description = Description;
MenuPromotionalCard.Media = Media;

export default MenuPromotionalCard;

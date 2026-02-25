import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen bg-white pt-[100px] md:pt-[150px] overflow-hidden flex flex-col items-center justify-start pb-20">
            <div className="w-full max-w-[1440px] px-4 md:px-6 flex flex-col gap-0 select-none">

                {/* Row 1: Image + DIGITAL */}
                <div className="flex items-end mb-0 lg:mb-2">
                    <div className="relative w-[200px] h-[225px] md:w-[264px] md:h-[320px] shrink-0 z-20">
                        <Image
                            src="/images/hero.webp"
                            alt="Hero Character"
                            fill
                            className="object-contain object-bottom grayscale"
                            priority
                        />
                    </div>
                    <div className="relative flex-1">
                        <h1 className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[0.01em] whitespace-nowrap">
                            DIGITAL
                        </h1>
                    </div>
                </div>

                {/* Row 2: ELEVATION + Star */}
                <div className="relative w-full flex justify-start mt-0">
                    <div className="relative inline-block">
                        <h1 className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[-0.01em] whitespace-nowrap">
                            ELEVATION
                        </h1>
                        {/* Star above 'N' or hanging off the right */}
                        <div className="absolute top-0 right-[-15%] md:right-[-25%] lg:right-[-18%] -translate-y-[65%] pointer-events-none">
                            <div className="relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[350px] lg:h-[350px]">
                                <Image
                                    src="/images/star.svg"
                                    alt="Star"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3: STUDIO + Description */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mt-0 md:mt-4 gap-4 lg:gap-10">
                    <div className="order-2 lg:order-1">
                        <h1 className="font-anton text-[110px] sm:text-[180px] md:text-[260px] lg:text-[320px] leading-[0.9] text-black uppercase tracking-[-0.01em] whitespace-nowrap">
                            STUDIO
                        </h1>
                    </div>
                    <div className="order-1 lg:order-2 max-w-[450px] lg:max-w-[550px] lg:mb-12 xl:mb-16">
                        <p className="font-poppins font-normal text-[18px] md:text-[22px] lg:text-[24px] leading-[1.2] text-black text-left lg:text-right">
                            Powering Brands with Imagination and Bold Impact — a digital elevation studio crafting meaningful experiences, distinctive identities, and bold digital solutions for modern brands.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Hero;

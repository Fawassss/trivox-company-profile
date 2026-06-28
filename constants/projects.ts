export interface Project {
    id: number;
    slug: string;
    name: string;
    category: string;
    year: string;
    image: string;
    heroImage: string;
    client: string;
    industry: string;
    website: string;
    websiteUrl: string;
    services: string;
    overview: string;
    workImages: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: "ozil-noblas",
        name: "OZIL NOBLAS",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project1.png",
        heroImage: "/images/project3.png",
        client: "Ozil Noblas",
        industry: "Apparel",
        website: "ozil-noblas.trivox.id",
        websiteUrl: "https://ozil-noblas.trivox.id",
        services: "website development",
        overview: "Ozil Noblas is a custom apparel printing company specializing in personalized clothing and merchandise. To strengthen their digital presence and reach a wider market, they partnered with us to develop a data-driven and engaging digital campaign. The objective was to increase brand awareness, generate leads, promote their custom products, and boost social media engagement through a strategic digital approach tailored to their target audience.\n\nThe campaign delivered strong results, achieving an 82% increase in engagement. Through creative storytelling, visually compelling content, and precise audience targeting, Ozil Noblas experienced a significant improvement in online visibility and customer interaction, reinforcing their brand presence in the custom apparel market.",
        workImages: [
            "/images/project1.png",
            "/images/project2.png",
            "/images/project3.png",
            "/images/project1.png",
            "/images/project2.png"
        ]
    },
    {
        id: 2,
        slug: "ozil-noblas-2",
        name: "OZIL NOBLAS II",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project2.png",
        heroImage: "/images/project2.png",
        client: "Ozil Noblas",
        industry: "Apparel",
        website: "ozil-noblas.trivox.id",
        websiteUrl: "https://ozil-noblas.trivox.id",
        services: "Branding, Website, E-Commerce",
        overview: "A continuation of our partnership with Ozil Noblas, focusing on secondary brand elements and expansion into new digital territories.",
        workImages: ["/images/project2.png", "/images/project1.png"]
    },
    {
        id: 3,
        slug: "ozil-noblas-3",
        name: "OZIL NOBLAS III",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project3.png",
        heroImage: "/images/project3.png",
        client: "Ozil Noblas",
        industry: "Apparel",
        website: "ozil-noblas.trivox.id",
        websiteUrl: "https://ozil-noblas.trivox.id",
        services: "Branding, Website, E-Commerce",
        overview: "The third phase of the Ozil Noblas digital transformation, refining the user experience and optimizing conversion rates.",
        workImages: ["/images/project3.png", "/images/project2.png"]
    },
    {
        id: 4,
        slug: "ozil-noblas-4",
        name: "OZIL NOBLAS IV",
        category: "Branding, Website, E-Commerce",
        year: "2026",
        image: "/images/project3.png",
        heroImage: "/images/project3.png",
        client: "Ozil Noblas",
        industry: "Apparel",
        website: "ozil-noblas.trivox.id",
        websiteUrl: "https://ozil-noblas.trivox.id",
        services: "Branding, Website, E-Commerce",
        overview: "Further exploration and creative direction for the Ozil Noblas brand ecosystem.",
        workImages: ["/images/project3.png", "/images/project1.png"]
    },
    {
        id: 5,
        slug: "project-5",
        name: "PROJECT FIVE",
        category: "UI/UX, Mobile App",
        year: "2025",
        image: "/images/project1.png",
        heroImage: "/images/project1.png",
        client: "Future Client",
        industry: "Technology",
        website: "projectfive.id",
        websiteUrl: "#",
        services: "UI/UX, Mobile App",
        overview: "A cutting-edge mobile application designed for the modern user, focusing on seamless interactions and intuitive navigation.",
        workImages: ["/images/project1.png", "/images/project2.png"]
    },
    {
        id: 6,
        slug: "project-6",
        name: "PROJECT SIX",
        category: "Social Media, Mobile App ",
        year: "2025",
        image: "/images/project2.png",
        heroImage: "/images/project2.png",
        client: "Social Media Brand",
        industry: "Entertainment",
        website: "projectsix.id",
        websiteUrl: "#",
        services: "Social Media, Content",
        overview: "A comprehensive social media strategy and content creation campaign aimed at boosting audience engagement and brand recall.",
        workImages: ["/images/project2.png", "/images/project3.png"]
    }
];

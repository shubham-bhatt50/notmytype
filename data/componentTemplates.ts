import { ComponentTemplate } from "@/types";

export const componentTemplates: ComponentTemplate[] = [
  {
    name: "Product Card",
    type: "productCard",
    content: {
      heading: "Wireless Headphones",
      price: "$199.99",
      body: "Premium sound quality with active noise cancellation. Perfect for music lovers and professionals.",
      button: "Add to Cart",
      badge: "Bestseller",
    },
  },
  {
    name: "Blog Post Card",
    type: "blogCard",
    content: {
      heading: "The Future of Design Systems",
      body: "Exploring how modern teams are building scalable design systems that adapt to changing needs and technologies...",
      meta: "Jane Doe • 5 min read",
      tag: "Design",
    },
  },
  {
    name: "Landing Page Hero",
    type: "landingHero",
    content: {
      heading: "Build Better Products",
      subheading: "The all-in-one platform for modern teams",
      body: "Streamline your workflow, collaborate seamlessly, and ship faster with our powerful suite of tools designed for the way you work.",
      button: "Get Started",
    },
  },
  {
    name: "Testimonial Card",
    type: "testimonialCard",
    content: {
      quote: "This product has completely transformed how we work. The impact on our team's productivity has been remarkable.",
      author: "Sarah Johnson",
      company: "CEO, TechCorp",
    },
  },
  {
    name: "Pricing Table",
    type: "pricingTable",
    content: {
      plan: "Professional",
      price: "$29",
      period: "/month",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "Team collaboration",
      ],
      button: "Start Free Trial",
    },
  },
  {
    name: "Mobile App Screen",
    type: "mobileAppScreen",
    content: {
      heading: "Dashboard",
      nav: ["Home", "Discover", "Library", "Profile"],
      cardTitle: "Featured Playlist",
      cardBody: "Your weekly mix of handpicked tracks",
      action: "Play Now",
    },
  },
];


import { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import FunFact from "@/components/FunFact";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "SOBA Calgary - Saint Joseph's College Sasse Alumni Association",
  description: "SOBA Calgary is a registered not-for-profit organization supporting Sasse College alumni in Calgary, Canada. Join our community of active members."
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <FunFact />
      <Testimonial />
      <CTA />
      <FAQ />
      <Contact />
      <Blog />
    </main>
  );
}

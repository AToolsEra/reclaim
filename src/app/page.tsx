"use client";

import HomeHero from "@/components/home/home-hero";
import { Header, PageContainer } from "@/components/layout";

export default function Home() {
  return (
    <PageContainer header={<Header />}>
      <HomeHero />
    </PageContainer>
  );
}

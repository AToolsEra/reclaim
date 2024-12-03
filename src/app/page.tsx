"use client";

import HomeHero from "@/components/home/home-hero";
import { Header, PageContainer } from "@/components/layout";
import ReclaimDemo from "@/components/Reclaim";

export default function Home() {
  return (
    <PageContainer header={<Header />}>
      <div className="flex h-full bg-white">
        <ReclaimDemo />
      </div>
      <HomeHero />
    </PageContainer>
  );
}

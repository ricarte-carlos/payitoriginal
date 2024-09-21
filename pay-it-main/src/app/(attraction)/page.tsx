import { About } from "@/components/about";
import { Carousel } from "@/components/carousel";
import { SiteFooter } from "@/components/footer";
import { Managers } from "@/components/managers";
import { MapSection } from "@/components/map-section";
import { PartnerSection } from "@/components/partner-section";
import { Preview } from "@/components/preview";
import { Review } from "@/components/review";
import { SiteHeader } from "@/components/site-header";
import { WhatsappButton } from "@/components/whatsappButton";

import { getSlides } from "@/hooks/get-slides/fetcher";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "../admin/enums/query-keys";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [REACT_QUERY_KEYS.GET_SLIDES],
    queryFn: () => getSlides(),
  });

  return (
    <>
      <SiteHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Carousel />
      </HydrationBoundary>
      <About />
      <Managers />
      <PartnerSection />
      <MapSection />
      <Review />
      <Preview />
      <SiteFooter />
      <WhatsappButton />
    </>
  );
}

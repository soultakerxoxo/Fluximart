import PricingCard from '@/components/PricingCard'
import FaqAccordion from '@/components/FaqAccordion'
import AssetCategories from '@/components/AssetCategories'
import SiteFooter from '@/components/SiteFooter'
import CreativeProjects from '@/components/CreativeProjects'
import HeroPixelsquid from '@/components/HeroPixelsquid'
import Collections3D from '@/components/Collections3D'
import SubNavBar from '@/components/SubNavBar'
import BrowseByCategory from '@/components/BrowseByCategory'
import ImageTypeIcons from '@/components/ImageTypeIcons'
import CategoryDropdown from '@/components/CategoryDropdown'
import VideoHero from '@/components/VideoHero'
import CollectionsCarousel from '@/components/CollectionsCarousel'
import TrendingMusic from '@/components/TrendingMusic'
import ModelSelector from '@/components/ModelSelector'
import AiGeneratorHero from '@/components/AiGeneratorHero'
import CatalogCTA from '@/components/CatalogCTA'
import CreativeFlowSearch from '@/components/CreativeFlowSearch'
import CanvasSizesCarousel from '@/components/CanvasSizesCarousel'
import SocialTemplateRows from '@/components/SocialTemplateRows'
import FeaturedTemplateRows from '@/components/FeaturedTemplateRows'
import SnapStockXSearchBar from '@/components/SnapStockXSearchBar'
import DiscoverSeasonal from '@/components/DiscoverSeasonal'
import LovedCategories from '@/components/LovedCategories'
import GiftGuides from '@/components/GiftGuides'
import RelatedSearches from '@/components/RelatedSearches'
import BrowseByInterest from '@/components/BrowseByInterest'
import GiftSuggestions from '@/components/GiftSuggestions'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <SubNavBar />
      <SnapStockXSearchBar />
      <div className="container flex justify-end">
        <CategoryDropdown />
      </div>
      <VideoHero />
      <AiGeneratorHero />
      <section className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold">Fluximart</h1>
        <p className="mt-4 text-white/70">
          AI-powered marketplace. Fresh on-trend visuals every day.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a className="px-5 py-2 bg-brand rounded-md" href="/marketplace">Browse SnapStockX</a>
          <a className="px-5 py-2 border border-white/20 rounded-md" href="/drops">Daily AI Drops</a>
        </div>
      </section>
      <HeroPixelsquid />
      <CreativeProjects />
      <Collections3D />
      <CollectionsCarousel />
      <TrendingMusic />
      <ModelSelector />
      <CreativeFlowSearch />
      <CatalogCTA />
      <CanvasSizesCarousel />
      <FeaturedTemplateRows />
      <SocialTemplateRows />
      <DiscoverSeasonal />
      <LovedCategories />
      <GiftGuides />
      <BrowseByInterest />
      <GiftSuggestions />
      <RelatedSearches />
      <ImageTypeIcons />
      <BrowseByCategory />
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-md overflow-hidden border border-white/10">
              <img
                src={`https://picsum.photos/seed/feature-${i}/600/400`}
                alt="Featured"
                className="w-full h-40 object-cover"
              />
              <div className="p-3 text-sm">
                <div className="font-medium">On-trend visual #{i + 1}</div>
                <div className="text-white/60">AI curated · SnapStockX</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <FaqAccordion />
        </div>
        <PricingCard />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Explore categories</h2>
        <AssetCategories />
      </section>
      <SiteFooter />
    </div>
  )
}

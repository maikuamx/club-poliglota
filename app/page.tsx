import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import ClassesPreview from '@/components/classes-preview'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ClassesPreview />
    </main>
  )
}
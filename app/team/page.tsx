import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-background overflow-x-hidden">
            <Header />
            <div className="pt-24 pb-16">
                <TeamSection />
            </div>
            <Footer />
        </main>
    )
}

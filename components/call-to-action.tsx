import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Ready to Take Memo? Meet Memo!</h2>
                    <p className="mt-4">The memo-taking app that won’t judge your spelling. Start jotting, doodling, or plotting world domination—Memo’s got you covered.</p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/dashboard">
                                <span>Start Memoing (It’s Free!)</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        id: '1',
        question: 'Apakah course ini cocok untuk pemula?',
        answer: 'Sangat cocok! Course ini dirancang untuk mengakomodasi semua level, dari pemula absolut hingga editor berpengalaman. Kami mulai dari dasar-dasar editing dan secara bertahap meningkat ke teknik profesional yang lebih advanced.',
    },
    {
        id: '2',
        question: 'Software apa yang diperlukan?',
        answer: 'Course ini menggunakan DaVinci Resolve (gratis) dan Adobe Premiere Pro. Kami juga menyediakan alternatif untuk software editing lainnya. Semua software yang digunakan tersedia untuk Windows, Mac, dan Linux.',
    },
    {
        id: '3',
        question: 'Berapa lama akses course ini?',
        answer: 'Akses Anda adalah SELAMANYA! Sekali membeli, Anda akan mendapatkan akses ke semua materi course, update terbaru, dan bonus content tanpa batas waktu. Tidak ada biaya berlangganan atau biaya tersembunyi.',
    },
    {
        id: '4',
        question: 'Apakah ada garansi uang kembali?',
        answer: 'Ya! Kami menawarkan garansi 30 hari uang kembali 100%. Jika dalam 30 hari pertama Anda merasa course ini tidak sesuai ekspektasi, kami akan mengembalikan uang Anda tanpa pertanyaan.',
    },
    {
        id: '5',
        question: 'Bagaimana cara mendapatkan support?',
        answer: 'Anda akan mendapatkan akses ke komunitas privat dengan 12,000+ member, direct mentoring dari instruktur, dan support email 24/7. Rata-rata response time kami adalah kurang dari 2 jam.',
    },
    {
        id: '6',
        question: 'Apakah materi akan terus diupdate?',
        answer: 'Absolutely! Industri video editing terus berkembang, dan kami berkomitmen untuk selalu mengupdate materi dengan teknik dan trend terbaru. Semua update gratis untuk member lifetime.',
    },
];

interface FaqItemProps {
    faq: (typeof faqs)[0];
    index: number;
}

function FaqItem({ faq, index }: FaqItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div
                className={cn(
                    'group overflow-hidden rounded-2xl transition-all duration-500',
                    'from-card/80 to-card/40 bg-gradient-to-br backdrop-blur-sm',
                    'border transition-all duration-300',
                    isOpen ? 'border-primary/50 shadow-primary/20 shadow-lg' : 'border-border/30 hover:border-primary/30',
                    'animate-fade-in',
                )}
                style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'both' }}
            >
                <CollapsibleTrigger className="w-full text-left">
                    <div className="hover:bg-primary/5 flex items-center justify-between p-6 transition-colors duration-300">
                        <h3 className="text-foreground group-hover:text-primary pr-4 text-lg leading-tight font-semibold transition-colors duration-300">
                            {faq.question}
                        </h3>
                        <div
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-full',
                                'bg-primary/20 border-primary/30 flex-shrink-0 border',
                                'transition-all duration-300',
                                'group-hover:bg-primary/30 group-hover:border-primary/50',
                                isOpen && 'bg-primary/40 border-primary rotate-180',
                            )}
                        >
                            <ChevronDown className="text-primary h-4 w-4 transition-transform duration-300" />
                        </div>
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                    <div className="px-6 pb-6">
                        <div className="border-primary/20 border-t pt-4">
                            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}

export function FaqSection() {
    return (
        <section className="border-border/50 relative border-t py-20 lg:py-32">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column - Header */}
                    <div className="space-y-8 lg:sticky lg:top-8">
                        <div className="space-y-6">
                            <div className="animate-fade-in">
                                <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                    <HelpCircle className="text-primary h-4 w-4" />
                                    <span className="text-primary text-sm font-medium">FAQ</span>
                                </div>
                            </div>

                            <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                                <h2 className="text-foreground text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                    <span className="block">Pertanyaan Yang</span>
                                    <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
                                        Sering Ditanyakan
                                    </span>
                                </h2>
                                <p className="text-muted-foreground text-xl leading-relaxed">
                                    Temukan jawaban untuk pertanyaan yang paling sering ditanyakan tentang course Editor Amplifier.
                                </p>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
                            <div className="from-card/80 to-card/40 border-border/30 space-y-4 rounded-2xl border bg-gradient-to-br py-2 backdrop-blur-sm">
                                {/* <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 border-primary/30 flex h-10 w-10 items-center justify-center rounded-full border">
                                        <MessageCircle className="text-primary h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-foreground font-semibold">Masih ada pertanyaan?</h3>
                                        <p className="text-muted-foreground text-sm">Tim support kami siap membantu</p>
                                    </div>
                                </div> */}
                                <button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/30 hover:border-primary/50 w-full rounded-xl border px-4 py-3 font-medium transition-all duration-300">
                                    Join Sekarang
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - FAQ Items */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FaqItem key={faq.id} faq={faq} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

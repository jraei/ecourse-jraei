
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    faq: typeof faqs[0];
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
                    isOpen 
                        ? 'border-primary/50 shadow-lg shadow-primary/20' 
                        : 'border-border/30 hover:border-primary/30',
                    'animate-fade-in'
                )}
                style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'both' }}
            >
                <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center justify-between p-6 hover:bg-primary/5 transition-colors duration-300">
                        <h3 className="text-foreground font-semibold text-lg leading-tight pr-4 group-hover:text-primary transition-colors duration-300">
                            {faq.question}
                        </h3>
                        <div
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-full',
                                'bg-primary/20 border border-primary/30 flex-shrink-0',
                                'transition-all duration-300',
                                'group-hover:bg-primary/30 group-hover:border-primary/50',
                                isOpen && 'bg-primary/40 border-primary rotate-180'
                            )}
                        >
                            <ChevronDown className="h-4 w-4 text-primary transition-transform duration-300" />
                        </div>
                    </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-6 pb-6">
                        <div className="border-t border-primary/20 pt-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </CollapsibleContent>
            </div>
        </Collapsible>
    );
}

export function FaqSection() {
    return (
        <section className="relative py-20 lg:py-32 border-t border-border/50">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Column - Header */}
                    <div className="space-y-8 lg:sticky lg:top-8">
                        <div className="space-y-6">
                            <div className="animate-fade-in">
                                <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                                    <HelpCircle className="h-4 w-4 text-primary" />
                                    <span className="text-primary text-sm font-medium">FAQ</span>
                                </div>
                            </div>

                            <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                                <h2 className="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
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
                        <div
                            className="animate-fade-in"
                            style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                        >
                            <div className="from-card/80 to-card/40 bg-gradient-to-br backdrop-blur-sm border border-border/30 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary/20 border-primary/30 flex h-10 w-10 items-center justify-center rounded-full border">
                                        <MessageCircle className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-foreground font-semibold">Masih ada pertanyaan?</h3>
                                        <p className="text-muted-foreground text-sm">Tim support kami siap membantu</p>
                                    </div>
                                </div>
                                <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-xl px-4 py-3 font-medium transition-all duration-300">
                                    Hubungi Support
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

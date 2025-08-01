import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        id: '1',
        question: 'Apakah course ini cocok untuk pemula?',
        answer: 'Ya! Course ini disusun sedemekian rupa agar siapapun bisa  belajar mulai dari pemula sampai editor yang professional. tapi inget, lu tetep harus kasi effort dan terus belajar. karena kita ga cuman bakal mempelejari teknik dasarnya tapi juga fitur fitur advance yang ada didalam software kita',
    },
    {
        id: '2',
        question: 'Kelas Editor Amplifier Ini Untuk Siapa?',
        answer: 'Kelas Editor Amplifier dikembangkan khususnya untuk youtuber, tetapi juga bisa dipelajari oleh tipe editor lain. karena kita fokusny adalah untuk membuat visual effects, yang tentunya gaya editing yang bisa dipakai di platform lain juga seperti tiktok, ig reels, shorts, dll, jadi kelas ini cocok untuk semua yang ingin menjadi video editor',
    },
    {
        id: '3',
        question: 'Saya Bukan Youtuber, Apa Masi Bisa Ikut Kelasnya?',
        answer: 'Ya! Course ini bukan cuman dikembangkan untuk youtuber saja tapi juga akan dikembangkan kedepannya untuk mengajari gaya editing lain selain youtube. jadi kalian bisa banget belajar disini selama kalian berfokus membuat visual effects',
    },
    {
        id: '4',
        question: 'Apakah Materinya Ini Saja Dan Tidak Akan Di Update Lagi?',
        answer: 'Tidak, Materinya akan terus BERTAMBAH seiring berjalannya waktu. kalian juga bisa request modul dan materi apa yang kalian inginkan. dan jika banyak yang meminta, kita akan bikinkan modul itu untuk kalian. jadi masi banyak materi yang menanti kalian kedepannya',
    },
    {
        id: '5',
        question: 'Bagaimana Sistem Pembelajarannya?',
        answer: 'Kalian akan diberi akses ke member area dimana kalian bisa membuka dan menonton modul video yang disediakan kapan saja dan dimana saja. ini berarti kalian bisa langsung akses semua modulnya melalui website editoramplifier.com saja dan sudah bisa langsung menonton dari device kalian',
    },
    {
        id: '6',
        question: 'Software Apa Yang Digunakan?',
        answer: 'Software yang digunakan adalah davinci resolve, software editing professional terbaik di dunia yang juga dengan harga terbaik di dunia (gratis 😉). software ini cukup lengkap untuk semua kebutuhan editing mulai dari clipping, animasi dan visual effects, color grading dan juga design semuanya bisa. jadi lu gaperlu belajar software lain setelah belajar davinci karena semuanya udah bisa dilakuin didalamnya',
    },
    {
        id: '7',
        question: 'Apakah Sukses Dapet Views Itu Dijamin?',
        answer: 'Tidak, tidak ada hal yang pasti di dunia ini dan itu termasuk juga ke platform ini. karena tidak semua orang bisa menaruh effort yang diperlukan untuk sukses maka hasilnya tidak bisa dijamin untuk kalian. tetapi selama kalian tetap menaruh effort dan terus mengikuti pembelajarannya, kalian akan memiliki kemungkinan sukses yang jauh lebih tinggi dibanding 99% editor dan youtuber lain di luar sana.',
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

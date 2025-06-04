
import { cn } from '@/lib/utils';
import { MoneyBackGuarantee, CheckCircle, Shield } from 'lucide-react';

interface BenefitItemProps {
    icon: React.ReactNode;
    title: string;
    delay?: number;
}

function BenefitItem({ icon, title, delay = 0 }: BenefitItemProps) {
    return (
        <div 
            className={cn(
                'group flex items-center gap-4 p-4 rounded-xl',
                'bg-card/30 border border-border/30 backdrop-blur-sm',
                'hover:bg-card/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
                'transition-all duration-500 hover:-translate-y-1',
                'animate-fade-in cursor-pointer'
            )}
            style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
        >
            <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full',
                'bg-primary/10 border border-primary/20 text-primary',
                'group-hover:bg-primary/20 group-hover:border-primary/40',
                'transition-all duration-300 group-hover:scale-110'
            )}>
                {icon}
            </div>
            <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                {title}
            </span>
        </div>
    );
}

export function LearningBenefits() {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Yang Akan Kalian Pelajari</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Master professional video editing with DaVinci Resolve - the industry-standard software used by Hollywood professionals.
                </p>
                <p className="text-sm text-muted-foreground/80">
                    Dari basic hingga advanced techniques yang akan mengubah konten Anda menjadi karya profesional.
                </p>
            </div>

            <div className="space-y-4">
                <BenefitItem 
                    icon={<MoneyBackGuarantee className="h-6 w-6" />}
                    title="Gratis"
                    delay={100}
                />
                <BenefitItem 
                    icon={<CheckCircle className="h-6 w-6" />}
                    title="Fitur Lengkap"
                    delay={200}
                />
                <BenefitItem 
                    icon={<Shield className="h-6 w-6" />}
                    title="Reliable"
                    delay={300}
                />
            </div>
        </div>
    );
}

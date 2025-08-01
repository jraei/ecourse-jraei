import { Badge } from '@/components/ui/badge';
import { CtaButton } from '@/components/ui/cta-button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Play, Sparkles, Gift, Trophy, BookOpen, Video } from 'lucide-react';
import { useState } from 'react';

interface BonusItemProps {
  number: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

function BonusItem({ number, title, duration, description, thumbnail }: BonusItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex gap-4 p-4 rounded-xl transition-all duration-500 hover:bg-card/30 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 lg:w-28 lg:h-20">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Play button overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transform transition-all duration-300 hover:scale-110">
              <Play className="w-4 h-4 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
          
          {/* Gradient glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Number badge */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/30">
          {number}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm md:text-base lg:text-lg text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h4>
        
        <div className="flex items-center gap-1 mb-2">
          <Clock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
          <span className="text-xs md:text-sm text-muted-foreground font-medium">{duration}</span>
        </div>
        
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface StandardBonusProps {
  number: string;
  title: string;
  value: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

function StandardBonus({ number, title, value, description, image, icon }: StandardBonusProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        {/* Floating number badge */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="text-primary-foreground font-bold text-lg">{number}</span>
        </div>
        
        {/* Icon with glow effect */}
        <div className="mb-4 relative">
          <div className={`w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'shadow-lg shadow-primary/30 scale-110' : ''
          }`}>
            <div className="text-primary transition-transform duration-300">
              {icon}
            </div>
          </div>
          
          {/* Animated glow */}
          <div className={`absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur-xl transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
        
        <h3 className="font-bold text-lg md:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 hover:border-primary/50">
          <Sparkles className="w-3 h-3 mr-1" />
          Value Senilai: {value}
        </Badge>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        
        <CtaButton 
          variant="secondary" 
          size="default" 
          className="w-full group/btn"
        >
          <Gift className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
          Gabung Sekarang
        </CtaButton>
      </CardContent>
      
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 transition-opacity duration-700 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </Card>
  );
}

export function BonusSection() {
  const [activePreview, setActivePreview] = useState(0);

  const bonusItems = [
    {
      number: "01",
      title: "Full Course Youtube 1",
      duration: "1 Jam 45 Menit",
      description: "Panduan full Course Pertama menjelaskan terperinci yang pernah gw bahas mulai dari ide video, riset keyword, cara mendapatkan niche, circle of competition, thumbnail, scriptwriting, video editing, algoritma youtube, dll."
    },
    {
      number: "02", 
      title: "Full Course Youtube 2",
      duration: "50+ Menit",
      description: "Di Full Course kedua ini, gw bakal bahas lebih lanjut soal cara membangun channel dari basic sampai ke advanced dan menjadi creator yang dari follow, Live type youtuber, dan masih banyak lagi cara membuat content video youtuber yang bisa"
    },
    {
      number: "03",
      title: "Full Course Ide Video",
      duration: "24+ Menit", 
      description: "Di Full Course ini, gw bakal ngasih lu ke metode content ide video yang sebenarnya. Cara Lu bakal riset ide content gw kasih tau metode besar seperti mindset, riset penyakir, riset penyakir besar tanggung, bisa dipakai untuk 5 yang lebih"
    }
  ];

  const standardBonuses = [
    {
      number: "02",
      title: "Template Pack Premium",
      value: "Rp 750.000",
      description: "Koleksi lengkap template editing professional yang siap pakai. Termasuk motion graphics, transitions, dan effects yang akan membuat video Anda tampil lebih menarik dan professional.",
      image: "/storage/landing/bonus2.jpg",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      number: "03", 
      title: "Script Writing Masterclass",
      value: "Rp 500.000",
      description: "Rahasia menulis script yang engaging dan viral. Pelajari teknik storytelling yang membuat audience tidak bisa berhenti menonton video Anda dari awal sampai akhir.",
      image: "/storage/landing/bonus3.jpg",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      number: "04",
      title: "Live Consultation Session",
      value: "Rp 1.200.000", 
      description: "Sesi konsultasi langsung dengan mentor untuk membahas channel Anda. Dapatkan feedback personal dan strategi khusus untuk mengembangkan channel YouTube Anda.",
      image: "/storage/landing/bonus4.jpg",
      icon: <Video className="w-6 h-6" />
    }
  ];

  const previewImages = [
    "/storage/landing/preview1.jpg",
    "/storage/landing/preview2.jpg", 
    "/storage/landing/preview3.jpg",
    "/storage/landing/preview4.jpg"
  ];

  const totalValue = 1500000 + 750000 + 500000 + 1200000;

  return (
    <section className="relative py-16 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bonus Introduction */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/30 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              Bonus Tambahan
            </Badge>
          </div>
          
          <div className="animate-fade-in space-y-6" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
              <span className="block">Tapi tunggu.....</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-gradient-x">
                Masih Ada Lagi!
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Dapatkan bonus eksklusif senilai jutaan rupiah yang akan mempercepat perjalanan sukses YouTube Anda
            </p>
          </div>
          
          {/* Preview Grid */}
          <div className="animate-fade-in mt-12 grid grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            {previewImages.map((image, index) => (
              <div 
                key={index}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-500 cursor-pointer ${
                  activePreview === index 
                    ? 'border-primary shadow-lg shadow-primary/30 scale-105' 
                    : 'border-border/30 hover:border-primary/50'
                }`}
                onClick={() => setActivePreview(index)}
              >
                <img 
                  src={image} 
                  alt={`Bonus preview ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Preview indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Bonus (Complex Layout) */}
        <div className="animate-fade-in mb-16 lg:mb-24" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 border border-primary/30 shadow-2xl shadow-primary/10">
            <CardContent className="p-8 lg:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4 px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
                  Bonus #01
                </Badge>
                
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Full Course Value
                </h3>
                
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-6">
                  Youtuber Ekslusif
                </div>
                
                <Badge variant="secondary" className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 text-yellow-400 border-yellow-400/30">
                  <Trophy className="w-5 h-5 mr-2" />
                  Value Senilai: Rp1.500.000
                </Badge>
                
                <p className="text-muted-foreground mt-6 max-w-4xl mx-auto leading-relaxed">
                  Lu bakal dapat akses ke Full Course Youtube Ekslusif yang akan membahas semua aspek soal youtube, mulai dari ide video, thumbnail, hook, scriptwriting, dll.
                </p>
              </div>
              
              {/* Course List */}
              <div className="space-y-4">
                {bonusItems.map((item, index) => (
                  <BonusItem
                    key={index}
                    number={item.number}
                    title={item.title}
                    duration={item.duration}
                    description={item.description}
                    thumbnail="/lovable-uploads/f742eb0f-4236-4ac9-9d1a-335516703c84.png"
                  />
                ))}
              </div>
            </CardContent>
            
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </Card>
        </div>

        {/* Standard Bonuses Grid */}
        <div className="animate-fade-in mb-16 lg:mb-24" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {standardBonuses.map((bonus, index) => (
              <StandardBonus key={index} {...bonus} />
            ))}
          </div>
        </div>

        {/* Value Summary */}
        <div className="animate-fade-in text-center" style={{ animationDelay: '1000ms', animationFillMode: 'both' }}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/30 shadow-2xl shadow-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Total Nilai Bonus
                </h3>
                
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent mb-4">
                  Rp {totalValue.toLocaleString('id-ID')}
                </div>
                
                <p className="text-muted-foreground text-lg">
                  Nilai bonus yang Anda dapatkan melebihi harga course utama!
                </p>
              </div>
              
              <CtaButton variant="primary" size="lg" className="group/cta">
                <Gift className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/cta:rotate-12" />
                Klaim Semua Bonus Sekarang
                <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
              </CtaButton>
            </CardContent>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center animate-bounce">
              <Gift className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-primary/60 to-primary/40 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
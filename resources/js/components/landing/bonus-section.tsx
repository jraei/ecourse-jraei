import { CtaButton } from '@/components/ui/cta-button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Youtube, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const bonusData = {
  premium: {
    title: "Full Course Value Youtuber Eksklusif",
    badge: "Bonus #01",
    value: "Rp 540.000",
    description: "Lu bakal dapet akses ke Full Course Youtube Ekslusif yang akan membahas semua aspek soal youtube mulai dari ide video, thumbnail, hook, scriptwriting, dll",
    courses: [
      {
        id: 1,
        title: "Full Course Youtube 1",
        duration: "1 jam 45 Menit",
        description: "Dapatkan Full Course Pertama sebaiknya terpenting yang pernah gue buat disekama baris script untuk thumbnail, hook, scriptwriting, dan aspek storytelling dan aspek teknik dari youtube.",
        thumbnail: "/lovable-uploads/3c2f3f7a-519c-461e-b7f1-690e92055f98.png"
      },
      {
        id: 2,
        title: "Full Course Youtube 2", 
        duration: "2 jam 12 Menit",
        description: "Di Full Course kedua ini, gue bakal bahas lebih lanjut soal cara membangun Channel YouTube dan termasuk ke topik lanjutan seperti algorithm optimization, monetizing yang juga akan membahas banyak hal mulai dari faktor, A apa tips youtuber, dan proses pembuatan konten."
      },
      {
        id: 3,
        title: "Full Course Ide Video",
        duration: "24+ Menit", 
        description: "Di Full Course ini, gue bakal langkah ke lu masalah mencari ide video terbaik sebaiknya TERBERAT, masalah ini untuk digunakan oleh youtuber baru sebagian refleksi serta titikkan, dan youtuber baru bakalan kena masalah ini secara besar. Nah mantan channel yang akan kena akan yang akan dibahas untuk lebih aman channel yang lebih kena akan yang jauh dibahas secara menalam."
      }
    ]
  },
  standard: [
    {
      id: 2,
      badge: "Bonus #02",
      title: "Template Pack Eksklusif",
      value: "Rp 150.000",
      description: "Kumpulan template editing premium yang sudah terbukti meningkatkan engagement. Termasuk title cards, transitions, dan color grading presets.",
      image: "photo-1498050108023-c5249f4df085",
      features: ["50+ Template Premium", "Color Grading Presets", "Custom Transitions"]
    },
    {
      id: 3,
      badge: "Bonus #03", 
      title: "Music Library Bebas Copyright",
      value: "Rp 200.000",
      description: "Akses selamanya ke library musik bebas copyright dengan 200+ track berkualitas tinggi untuk semua genre video content.",
      image: "photo-1519389950473-47ba0277781c",
      features: ["200+ Music Tracks", "Bebas Copyright", "Update Bulanan"]
    },
    {
      id: 4,
      badge: "Bonus #04",
      title: "1-on-1 Portfolio Review",
      value: "Rp 300.000", 
      description: "Sesi review personal untuk portfolio editing kamu dengan feedback detail dan strategi improvement yang actionable.",
      image: "photo-1483058712412-4245e9b90334",
      features: ["60 Menit Review", "Feedback Detail", "Action Plan"]
    }
  ]
};

export function BonusSection() {
  const [activePreview, setActivePreview] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const totalValue = 540000 + 150000 + 200000 + 300000; // Rp 1,190,000

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bonus Introduction */}
        <div className="text-center mb-16 space-y-8">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-primary font-semibold text-sm">Bonus Tambahan</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
            </div>
          </div>

          <div className="animate-fade-in space-y-4" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-foreground">Tapi tunggu.....</span>
              <span className="block mt-2">
                <span className="text-foreground">Masih Ada </span>
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent animate-gradient-x">
                  Lagi!
                </span>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Selain course utama, kamu akan mendapatkan bonus eksklusif senilai{" "}
              <span className="text-primary font-bold">Rp {totalValue.toLocaleString('id-ID')}</span>{" "}
              yang akan membuat skill editing kamu naik ke level berikutnya.
            </p>
          </div>

          {/* Bonus Preview Grid */}
          <div className="animate-fade-in grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                className="group relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-card/50 to-card/20 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${hoveredCard === index ? 'scale-110 bg-primary/30' : ''}`}>
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-xs font-medium text-white">Bonus #{index}</div>
                </div>
                
                {/* Hover Glow Effect */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Premium Bonus Section */}
        <div className="mb-20">
          <div className="animate-fade-in bg-gradient-to-br from-card/50 via-card/30 to-background border border-border/50 rounded-3xl p-8 lg:p-12 relative overflow-hidden" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            </div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/30 text-primary">
                  {bonusData.premium.badge}
                </Badge>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="text-foreground">{bonusData.premium.title.split(' ').slice(0, 3).join(' ')}</span>{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {bonusData.premium.title.split(' ').slice(3).join(' ')}
                  </span>
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-primary font-bold">Value Senilai {bonusData.premium.value}</span>
                </div>
              </div>

              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Left Column - Thumbnails */}
                <div className="lg:col-span-2 space-y-4">
                  {bonusData.premium.courses.map((course, index) => (
                    <div 
                      key={course.id}
                      className={`group relative cursor-pointer transition-all duration-500 ${activePreview === course.id ? 'scale-105' : 'hover:scale-102'}`}
                      onClick={() => setActivePreview(course.id)}
                    >
                      <div className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${activePreview === course.id ? 'border-primary shadow-2xl shadow-primary/25' : 'border-border/50 hover:border-primary/50'}`}>
                        {course.thumbnail ? (
                          <img 
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Youtube className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Play className="h-6 w-6 text-primary-foreground ml-1" />
                          </div>
                        </div>

                        {/* Course Number */}
                        <div className="absolute top-3 left-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${activePreview === course.id ? 'bg-primary text-primary-foreground' : 'bg-black/50 text-white'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        {/* 100% Gratis Badge */}
                        {index === 0 && (
                          <div className="absolute bottom-3 right-3">
                            <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                              100% GRATIS
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column - Descriptions */}
                <div className="lg:col-span-3">
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {bonusData.premium.description}
                    </p>

                    {/* Course Details */}
                    {bonusData.premium.courses.map((course, index) => (
                      <div 
                        key={course.id}
                        className={`transition-all duration-500 ${activePreview === course.id ? 'opacity-100 transform translate-y-0' : 'opacity-60 transform translate-y-4'}`}
                      >
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-card/50 to-transparent border border-border/30 hover:border-primary/30 transition-all duration-300">
                          <div className="flex-shrink-0">
                            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                              {String(index + 1).padStart(2, '0')}.
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-foreground mb-2">
                              {course.title}
                            </h4>
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="text-sm text-primary font-medium">{course.duration}</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Bonuses */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {bonusData.standard.map((bonus, index) => (
            <div 
              key={bonus.id}
              className="animate-fade-in group relative bg-gradient-to-br from-card/50 to-card/20 border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10"
              style={{ animationDelay: `${800 + index * 200}ms`, animationFillMode: 'both' }}
            >
              {/* Background Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/${bonus.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={bonus.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-primary/90 border-primary text-primary-foreground backdrop-blur-sm">
                    {bonus.badge}
                  </Badge>
                </div>

                {/* Value Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold rounded-full">
                    Value {bonus.value}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {bonus.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {bonus.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {bonus.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Link href={route('register')}>
                    <CtaButton variant="secondary" size="default" className="w-full">
                      <Youtube className="h-4 w-4" />
                      Gabung Sekarang
                    </CtaButton>
                  </Link>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Value Summary */}
        <div className="animate-fade-in text-center" style={{ animationDelay: '1400ms', animationFillMode: 'both' }}>
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 border border-primary/30 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Total Nilai Bonus
              </h3>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Rp {totalValue.toLocaleString('id-ID')}
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Semua bonus senilai <span className="text-primary font-bold">Rp {totalValue.toLocaleString('id-ID')}</span> ini 
                kamu dapatkan <span className="text-primary font-bold">GRATIS</span> saat bergabung dengan course kami!
              </p>
              
              <div className="pt-4">
                <Link href={route('register')}>
                  <CtaButton variant="primary" size="lg" className="group">
                    <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                    Ambil Semua Bonus Sekarang
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
                  </CtaButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
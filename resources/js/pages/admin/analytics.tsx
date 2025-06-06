
import { MetricCard } from '@/components/analytics/metric-card';
import { RevenueChart } from '@/components/analytics/revenue-chart';
import { ConversionFunnel } from '@/components/analytics/conversion-funnel';
import { ReferralChart } from '@/components/analytics/referral-chart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BarChart3, Download, Eye, TrendingUp, Users, CreditCard, DollarSign, Target } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Analytics' },
];

interface AnalyticsProps {
    stats: {
        total_visits: number;
        unique_visitors: number;
        engagement_rate: number;
        conversion_rate: number;
        payment_rate: number;
        total_revenue: number;
        registrations: number;
        payments: number;
    };
    chartData: Record<string, any[]>;
    referralData: Array<{
        referral_source: string;
        count: number;
    }>;
    conversionFunnel: Array<{
        stage: string;
        count: number;
        percentage: number;
    }>;
    dateRange: string;
}

export default function Analytics({ stats, chartData, referralData, conversionFunnel, dateRange }: AnalyticsProps) {
    const [selectedRange, setSelectedRange] = useState(dateRange);

    const handleRangeChange = (range: string) => {
        setSelectedRange(range);
        router.get(route('admin.analytics'), { range }, { preserveState: true });
    };

    const handleExport = () => {
        window.open(route('admin.analytics.export', { range: selectedRange }), '_blank');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics Dashboard" />
            
            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
                    <div className="px-6 py-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                                <p className="text-muted-foreground mt-2">
                                    Comprehensive insights into user behavior and conversion metrics
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <Select value={selectedRange} onValueChange={handleRangeChange}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7">Last 7 days</SelectItem>
                                        <SelectItem value="30">Last 30 days</SelectItem>
                                        <SelectItem value="90">Last 90 days</SelectItem>
                                        <SelectItem value="365">Last year</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <Button onClick={handleExport} variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export CSV
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    {/* Primary Metrics */}
                    <div>
                        <h2 className="text-xl font-semibold text-foreground mb-6">Key Performance Indicators</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <MetricCard
                                title="Total Visits"
                                value={stats.total_visits.toLocaleString()}
                                icon={Eye}
                                description={`${stats.unique_visitors} unique visitors`}
                            />
                            <MetricCard
                                title="Engagement Rate"
                                value={`${stats.engagement_rate}%`}
                                icon={TrendingUp}
                                description="15+ second dwell time"
                            />
                            <MetricCard
                                title="Conversion Rate"
                                value={`${stats.conversion_rate}%`}
                                icon={Target}
                                description={`${stats.registrations} registrations`}
                            />
                            <MetricCard
                                title="Payment Rate"
                                value={`${stats.payment_rate}%`}
                                icon={CreditCard}
                                description={`${stats.payments} successful payments`}
                            />
                        </div>
                    </div>

                    {/* Revenue Card */}
                    <div>
                        <MetricCard
                            title="Total Revenue"
                            value={formatCurrency(stats.total_revenue)}
                            icon={DollarSign}
                            description={`Rp 499.000 × ${stats.payments} payments`}
                            className="lg:w-1/2"
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        <RevenueChart data={chartData} />
                        <ReferralChart data={referralData} />
                    </div>

                    {/* Conversion Funnel */}
                    <ConversionFunnel data={conversionFunnel} />

                    {/* Insights Section */}
                    <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Key Insights</h3>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <div className="text-primary font-semibold">Top Referral Source</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {referralData[0]?.referral_source || 'No data'} 
                                    {referralData[0] && ` (${referralData[0].count} visits)`}
                                </div>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div className="text-green-400 font-semibold">Revenue per Visit</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stats.total_visits > 0 
                                        ? formatCurrency(stats.total_revenue / stats.total_visits)
                                        : 'Rp 0'
                                    }
                                </div>
                            </div>
                            
                            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                <div className="text-blue-400 font-semibold">Avg. Revenue per User</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stats.unique_visitors > 0
                                        ? formatCurrency(stats.total_revenue / stats.unique_visitors)
                                        : 'Rp 0'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

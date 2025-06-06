
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface RevenueChartProps {
    data: Record<string, any[]>;
    className?: string;
}

export function RevenueChart({ data, className }: RevenueChartProps) {
    const chartData = useMemo(() => {
        const dates = new Set<string>();
        
        // Collect all dates
        Object.values(data).forEach(eventData => {
            eventData.forEach(item => dates.add(item.date));
        });
        
        // Sort dates
        const sortedDates = Array.from(dates).sort();
        
        // Create chart data
        return sortedDates.map(date => {
            const visits = data.visit?.find(item => item.date === date)?.total || 0;
            const conversions = data.conversion?.find(item => item.date === date)?.total || 0;
            const payments = data.payment?.find(item => item.date === date)?.total || 0;
            const revenue = payments * 499000;
            
            return {
                date: new Date(date).toLocaleDateString('id-ID', { 
                    month: 'short', 
                    day: 'numeric' 
                }),
                visits,
                conversions,
                payments,
                revenue: revenue / 1000000, // Convert to millions for display
            };
        });
    }, [data]);

    const formatCurrency = (value: number) => {
        return `Rp ${(value * 1000000).toLocaleString('id-ID')}`;
    };

    return (
        <div className={cn(
            'rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm',
            'hover:border-primary/30 hover:shadow-primary/10 hover:shadow-lg transition-all duration-300',
            className
        )}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
                <p className="text-sm text-muted-foreground">Daily revenue and conversion tracking</p>
            </div>
            
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            stroke="oklch(0.15 0 0)" 
                            opacity={0.3}
                        />
                        <XAxis 
                            dataKey="date" 
                            stroke="oklch(0.65 0 0)"
                            fontSize={12}
                        />
                        <YAxis 
                            stroke="oklch(0.65 0 0)"
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'oklch(0.08 0 0)',
                                border: '1px solid oklch(0.15 0 0)',
                                borderRadius: '8px',
                                color: 'oklch(0.98 0 0)',
                            }}
                            formatter={(value: any, name: string) => {
                                if (name === 'revenue') {
                                    return [formatCurrency(value), 'Revenue'];
                                }
                                return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="visits" 
                            stroke="oklch(0.75 0.15 85)" 
                            strokeWidth={2}
                            dot={{ fill: 'oklch(0.75 0.15 85)', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="conversions" 
                            stroke="oklch(0.6 0.12 184)" 
                            strokeWidth={2}
                            dot={{ fill: 'oklch(0.6 0.12 184)', strokeWidth: 2, r: 4 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="oklch(0.77 0.19 70)" 
                            strokeWidth={2}
                            dot={{ fill: 'oklch(0.77 0.19 70)', strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

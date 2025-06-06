import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

type RegisterForm = {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { trackEngagement, trackConversion, trackPayment } = useAnalytics();

    const { data, setData, post, processing, errors, reset, setError } = useForm<Required<RegisterForm>>({
        username: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        // Dynamically load Midtrans script
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        script.type = 'text/javascript';
        script.async = true;

        document.body.appendChild(script);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Track form submission attempt
        trackConversion('registration_attempt');

        try {
            // 1. Minta Snap Token + validasi form
            const res = await axios.post(route('register.get-snap-token'), data);

            if (res.data.snapToken) {
                // Track payment flow initiation
                trackEngagement('payment_flow_started');

                window.snap.pay(res.data.snapToken, {
                    onSuccess: async function () {
                        setToastMessage('Payment success, account is being created.');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 2000);

                        // Track successful payment
                        trackPayment('success', {
                            payment_method: 'midtrans',
                            amount: 499000,
                        });

                        // 2. Kalau bayar berhasil, buat akun
                        post(route('register'), {
                            onSuccess: () => {
                                // Track successful registration
                                trackConversion('registration_complete');
                            },
                            onFinish: () => reset('password', 'password_confirmation'),
                        });
                    },
                    onPending: function (result) {
                        setToastMessage('Payment pending');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 4000);
                        
                        trackPayment('pending');
                    },
                    onError: function (error) {
                        setToastMessage('Payment failed, please try again.');
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 4000);
                        
                        trackPayment('failed', { error: error.message });
                    },
                });
            }
        } catch (err: any) {
            // Track form validation errors
            trackEngagement('form_validation_error', {
                errors: err.response?.data?.errors ? Object.keys(err.response.data.errors) : []
            });

            if (err.response && err.response.data && err.response.data.errors) {
                const validationErrors = err.response.data.errors;

                // Ini triknya! Loop error & set ke useForm
                Object.keys(validationErrors).forEach((field) => {
                    setError(field, validationErrors[field][0]); // Hanya ambil error pertama
                });
            } else {
                console.error(err);
            }
        }
    };

    const handleFieldFocus = (fieldName: string) => {
        trackEngagement('form_field_focus', { field: fieldName });
    };

    const handleFieldBlur = (fieldName: string) => {
        trackEngagement('form_field_blur', { field: fieldName });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            {/* Toast Notification */}
            {showToast && (
                <div className="animate-fade-in fixed top-4 right-4 z-50">
                    <Alert className="border-primary/50 bg-primary/10 backdrop-blur-sm">
                        <CheckCircle className="text-primary h-4 w-4" />
                        <AlertDescription className="text-primary font-medium">{toastMessage}</AlertDescription>
                    </Alert>
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-4">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                onFocus={() => handleFieldFocus('username')}
                                onBlur={() => handleFieldBlur('username')}
                                disabled={processing}
                                placeholder="Username"
                            />
                            <InputError message={errors.username} className="mt-2" />
                        </div>
                        <div className="grid gap-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                onFocus={() => handleFieldFocus('name')}
                                onBlur={() => handleFieldBlur('name')}
                                disabled={processing}
                                placeholder="Full name"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            onFocus={() => handleFieldFocus('email')}
                            onBlur={() => handleFieldBlur('email')}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                            id="phone"
                            type="phone"
                            required
                            tabIndex={2}
                            autoComplete="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            onFocus={() => handleFieldFocus('phone')}
                            onBlur={() => handleFieldBlur('phone')}
                            disabled={processing}
                            placeholder="628xxxxxxxxx"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <div className="grid gap-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                onFocus={() => handleFieldFocus('password')}
                                onBlur={() => handleFieldBlur('password')}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="grid gap-4">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                onFocus={() => handleFieldFocus('password_confirmation')}
                                onBlur={() => handleFieldBlur('password_confirmation')}
                                disabled={processing}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Input type="text" tabIndex={5} value="Special Price Rp 499.000" disabled className="border-primary/80" />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={6} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Join Now
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

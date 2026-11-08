import { Head, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';

function GemMark({ className = 'h-8 w-8' }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <path
                d="M24 3 41 15 24 45 7 15 24 3Z"
                fill="#f0b64c"
                fillOpacity="0.18"
                stroke="#f0b64c"
                strokeWidth="1.5"
            />
            <path d="M7 15h34M24 3 17 15l7 30M24 3l7 12-7 30M17 15l7-12 7 12" stroke="#f0b64c" strokeWidth="1.2" />
            <path d="M17 15h14" stroke="#f0b64c" strokeWidth="1.2" />
        </svg>
    );
}

function WaitlistForm({ id, compact = false }: { id: string; compact?: boolean }) {
    const [joined, setJoined] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({ email: '' });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(route('waitlist.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setJoined(true);
                reset();
            },
        });
    }

    if (joined) {
        return (
            <div className="flex items-start gap-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 10.5 8.8 13 14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-amber-100">
                    You&rsquo;re on the waitlist. Pricing is announced at launch.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className={compact ? 'w-full max-w-md' : 'w-full max-w-lg'}>
            <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor={id} className="sr-only">
                    Email address
                </label>
                <input
                    id={id}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="h-12 flex-1 rounded-lg border border-stone-700 bg-stone-900/80 px-4 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="h-12 shrink-0 rounded-lg bg-amber-400 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-300 disabled:opacity-60"
                >
                    {processing ? 'Joining…' : 'Join the waitlist'}
                </button>
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            <p className="mt-3 text-xs leading-relaxed text-stone-500">
                Join the waitlist — pricing announced at launch.
            </p>
        </form>
    );
}

function ContactForm() {
    const [sent, setSent] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSent(true);
                reset();
            },
        });
    }

    if (sent) {
        return (
            <div className="flex items-start gap-3 rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 10.5 8.8 13 14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-amber-100">
                    Thanks — your message was received.
                </p>
            </div>
        );
    }

    const fieldClass =
        'rounded-lg border border-stone-700 bg-stone-900/80 px-4 text-sm text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400';

    return (
        <form onSubmit={submit} className="w-full max-w-lg">
            <div className="flex flex-col gap-3">
                <label htmlFor="contact-name" className="sr-only">
                    Your name
                </label>
                <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`h-12 ${fieldClass}`}
                />
                <label htmlFor="contact-email" className="sr-only">
                    Email address
                </label>
                <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={`h-12 ${fieldClass}`}
                />
                <label htmlFor="contact-message" className="sr-only">
                    Message
                </label>
                <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="What do you want to ask about jewel OS?"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className={`py-3 ${fieldClass}`}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="h-12 shrink-0 rounded-lg bg-amber-400 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-300 disabled:opacity-60"
                >
                    {processing ? 'Sending…' : 'Send message'}
                </button>
            </div>
            {(errors.name || errors.email || errors.message) && (
                <p className="mt-2 text-sm text-red-400">
                    {errors.name || errors.email || errors.message}
                </p>
            )}
        </form>
    );
}

const loopSteps = [
    { n: '01', title: 'Propose', text: 'The chief proposes a plan before anything moves.' },
    { n: '02', title: 'Check the gate', text: 'Every proposal passes a Human approval gate first.' },
    { n: '03', title: 'Delegate or do', text: 'The chief delegates to a specialist — or does the work itself.' },
    { n: '04', title: 'Verify against the brief', text: 'The result is checked against what was actually asked.' },
    { n: '05', title: 'Log before replying', text: 'Nothing is reported until the audit entry exists.' },
];

const subsystems = [
    'The loop',
    'Model integration — you bring the model',
    'Tools',
    'Memory and context',
    'Safety and permissions',
    'Orchestration',
    'Skills',
];

const specialists = [
    {
        name: 'Researcher',
        text: 'Finds and cites, never concludes for the Human.',
    },
    {
        name: 'Drafter',
        text: 'Drafts for sign-off, never sends.',
    },
    {
        name: 'Sweeper / Watcher',
        text: 'Scans on schedule, reports only what is new.',
    },
    {
        name: 'Publisher-preparer',
        text: 'Prepares outbound copy, never publishes without exact Human approval.',
    },
];

const floor = ['Spend', 'Publish', 'Send', 'Contact', 'Delete', 'Secrets'];

export default function Welcome() {
    return (
        <>
            <Head title="jewel OS — for the company of one">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
                <style>{`@keyframes jewel-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .jewel-fade-up { animation: jewel-fade-up .7s ease-out both; }`}</style>
            </Head>

            <div className="min-h-screen bg-[#0c0a08] font-sans text-stone-200 antialiased">
                {/* Header */}
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
                    <a href="#top" className="flex items-center gap-2.5">
                        <GemMark />
                        <span className="text-lg font-semibold tracking-tight text-stone-100">jewel OS</span>
                    </a>
                    <nav className="hidden items-center gap-8 text-sm text-stone-400 md:flex">
                        <a href="#what-you-get" className="transition hover:text-amber-300">What you get</a>
                        <a href="#how-it-works" className="transition hover:text-amber-300">How it works</a>
                        <a href="#safety" className="transition hover:text-amber-300">Safety</a>
                        <a href="#contact" className="transition hover:text-amber-300">Contact</a>
                        <a
                            href="#waitlist"
                            className="rounded-lg border border-amber-400/60 px-4 py-2 font-medium text-amber-300 transition hover:bg-amber-400 hover:text-stone-950"
                        >
                            Join the waitlist
                        </a>
                    </nav>
                </header>

                {/* Hero */}
                <main id="top">
                    <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
                        <div className="jewel-fade-up max-w-3xl">
                            <p className="text-xs font-semibold tracking-[0.22em] text-amber-400 uppercase">
                                jewel OS — for the company of one
                            </p>
                            <h1 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight text-stone-50 sm:text-5xl md:text-6xl">
                                One chief of staff. A staff that answers to you.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">
                                jewel OS is a sanitized, copy-paste-ready operating manual, file templates,
                                and protocols that let a Human run one chief-of-staff machine agent — which
                                hires specialist machine agents under Human approval gates.
                            </p>
                            <blockquote className="mt-8 border-l-2 border-amber-400 pl-5 text-base font-medium text-amber-100/90 italic">
                                &ldquo;Machines propose, but Humans are the source of all decisions.&rdquo;
                            </blockquote>
                            <div id="waitlist" className="mt-10 scroll-mt-24">
                                <WaitlistForm id="waitlist-email" />
                            </div>
                        </div>
                    </section>

                    {/* Who it is for */}
                    <section className="border-t border-stone-800/80">
                        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-stone-50">Who it is for</h2>
                                <p className="mt-4 leading-relaxed text-stone-400">
                                    A company-of-one operator, 18–64, North American, already using an AI
                                    assistant and frustrated that it forgets, invents, or acts without a trail.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-stone-50">Who it is not for</h2>
                                <p className="mt-4 leading-relaxed text-stone-400">
                                    Anyone who wants a done-for-you service with no setup, or autonomous agents
                                    that spend, publish, or contact people without Human approval.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* What you get */}
                    <section id="what-you-get" className="scroll-mt-24 border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">What you get</h2>
                            <div className="mt-10 grid gap-5 sm:grid-cols-2">
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 transition hover:border-amber-400/40">
                                    <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">01</p>
                                    <h3 className="mt-3 text-lg font-semibold text-stone-50">The 12 Protocols handbook</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        The operating manual for your chief of staff — the rules it runs on, in writing.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 transition hover:border-amber-400/40">
                                    <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">02</p>
                                    <h3 className="mt-3 text-lg font-semibold text-stone-50">The sanitized file tree</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        Copy-paste ready. Your memory, audit log, goals, and workspaces — structured from day one.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 transition hover:border-amber-400/40">
                                    <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">03</p>
                                    <h3 className="mt-3 text-lg font-semibold text-stone-50">The agent-hiring pack</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        Role cards, hire/revoke log, and an approval-gate checklist for every specialist your chief brings on.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6 transition hover:border-amber-400/40">
                                    <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase">04</p>
                                    <h3 className="mt-3 text-lg font-semibold text-stone-50">The setup guide</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        A 30-minute first setup that ends with a working memory file, an audit entry,
                                        one goal workspace, and one scheduled sweep or watcher you define.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </section>

                    {/* How it works */}
                    <section id="how-it-works" className="scroll-mt-24 border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">
                                How it works — the chief&rsquo;s loop
                            </h2>
                            <ol className="mt-10 grid gap-5 md:grid-cols-5">
                                {loopSteps.map((step) => (
                                    <li key={step.n} className="rounded-xl border border-stone-800 bg-stone-900/40 p-5">
                                        <p className="text-sm font-semibold text-amber-400">{step.n}</p>
                                        <h3 className="mt-2 font-semibold text-stone-50">{step.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{step.text}</p>
                                    </li>
                                ))}
                            </ol>
                            <div className="mt-12">
                                <h3 className="text-sm font-semibold tracking-widest text-stone-500 uppercase">
                                    The seven subsystems
                                </h3>
                                <ul className="mt-4 flex flex-wrap gap-2.5">
                                    {subsystems.map((s) => (
                                        <li
                                            key={s}
                                            className="rounded-full border border-stone-700 bg-stone-900/60 px-4 py-2 text-sm text-stone-300"
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* The specialists */}
                    <section className="border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">The specialists</h2>
                            <p className="mt-3 max-w-2xl leading-relaxed text-stone-400">
                                Your chief hires specialists under your approval gates. Each one has a job — and a hard limit.
                            </p>
                            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {specialists.map((s) => (
                                    <article key={s.name} className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
                                        <GemMark className="h-6 w-6 opacity-80" />
                                        <h3 className="mt-4 font-semibold text-stone-50">{s.name}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{s.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Safety */}
                    <section id="safety" className="scroll-mt-24 border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">
                                Safety, with a floor
                            </h2>
                            <div className="mt-10 grid gap-5 md:grid-cols-3">
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
                                    <h3 className="font-semibold text-stone-50">Plan mode</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        The chief plans and proposes. Nothing executes until you say so.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-amber-400/40 bg-amber-400/5 p-6">
                                    <h3 className="font-semibold text-stone-50">Default mode</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        The everyday mode. Routine work moves; anything consequential still waits on you.
                                    </p>
                                </article>
                                <article className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
                                    <h3 className="font-semibold text-stone-50">Automated mode</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                        Scheduled work runs on its own — inside the gates you set, and never below the floor.
                                    </p>
                                </article>
                            </div>
                            <div className="mt-8 rounded-xl border border-amber-400/30 bg-stone-900/60 p-6">
                                <h3 className="font-semibold text-amber-300">The hardline floor survives every mode</h3>
                                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                                    No mode changes this: the following always require Human approval.
                                </p>
                                <ul className="mt-4 flex flex-wrap gap-2.5">
                                    {floor.map((f) => (
                                        <li
                                            key={f}
                                            className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200"
                                        >
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* What it is not */}
                    <section className="border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">What it is not</h2>
                            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {['Not an app.', 'Not a SaaS.', 'Not a model.', 'Not a platform.'].map((t) => (
                                    <li key={t} className="rounded-xl border border-stone-800 px-5 py-4 text-stone-300">
                                        <span className="mr-2 text-amber-400">✕</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-8 max-w-2xl leading-relaxed text-stone-400">
                                You bring your own AI — jewel OS is the manual for running it.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-24 border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">
                                Talk to a Human
                            </h2>
                            <p className="mt-3 max-w-2xl leading-relaxed text-stone-400">
                                Questions about jewel OS, the pack, or the class? Send a message.
                            </p>
                            <div className="mt-8">
                                <ContactForm />
                            </div>
                        </div>
                    </section>

                    {/* Footer waitlist */}
                    <section className="border-t border-stone-800/80">
                        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
                            <div className="flex items-center gap-3">
                                <GemMark className="h-10 w-10" />
                                <h2 className="text-2xl font-semibold tracking-tight text-stone-50 md:text-3xl">
                                    jewel OS is files + teaching, not the assistant itself.
                                </h2>
                            </div>
                            <div className="mt-8">
                                <WaitlistForm id="waitlist-email-footer" compact />
                            </div>
                            <p className="mt-12 text-xs text-stone-600">
                                jewel OS — for the company of one.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

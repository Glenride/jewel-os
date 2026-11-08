import { Head, useForm } from '@inertiajs/react';
import { useState, type FormEvent } from 'react';

function GemMark({ className = 'h-8 w-8' }: { className?: string }) {
    return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
            <path d="M24 3 41 15 24 45 7 15 24 3Z" fill="#f0b64c" fillOpacity="0.18" stroke="#f0b64c" strokeWidth="1.5" />
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
            <div className="flex items-start gap-3 rounded-xl border border-amber-600/40 bg-amber-50 px-4 py-3">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 10.5 8.8 13 14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-amber-900">You&rsquo;re on the waitlist. Pricing is announced at launch.</p>
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
                    className="h-12 flex-1 rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="h-12 shrink-0 rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
                >
                    {processing ? 'Joining…' : 'Join the waitlist'}
                </button>
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            <p className="mt-3 text-xs leading-relaxed text-stone-500">Join the waitlist — pricing announced at launch.</p>
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
            <div className="flex items-start gap-3 rounded-xl border border-amber-600/40 bg-amber-50 px-4 py-3">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 10.5 8.8 13 14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm leading-relaxed text-amber-900">Thanks — your message was received.</p>
            </div>
        );
    }

    const fieldClass =
        'rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600';

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
                    className="h-12 shrink-0 rounded-xl bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
                >
                    {processing ? 'Sending…' : 'Send message'}
                </button>
            </div>
            {(errors.name || errors.email || errors.message) && (
                <p className="mt-2 text-sm text-red-600">{errors.name || errors.email || errors.message}</p>
            )}
        </form>
    );
}

const roles = [
    {
        name: 'Your Strategist',
        text: 'The chief has read everything that matters — your memory, your goals, your log — and never forgets any of it. It proposes the plan. You make the call.',
    },
    {
        name: 'Your Memory',
        text: 'The chief remembers, and you approve what becomes standing truth. A correction is a new entry. History is never rewritten.',
    },
    {
        name: 'Your Analyst',
        text: 'The researcher finds and cites. It shows its work, and the conclusion stays yours.',
    },
    {
        name: 'Your Executor',
        text: 'The drafter drafts for sign-off. The watcher scans on schedule. Neither sends, publishes, or spends without your exact approval.',
    },
];

const packContents = [
    {
        n: '01',
        title: 'The 12 Protocols handbook',
        text: 'The operating manual for your chief of staff. The rules it runs on, in writing.',
    },
    {
        n: '02',
        title: 'The sanitized file tree',
        text: 'Copy-paste ready. Memory, audit log, goals, and workspaces — structured from day one.',
    },
    {
        n: '03',
        title: 'The agent-hiring pack',
        text: 'Role cards, a hire and revoke log, and an approval-gate checklist for every specialist your chief brings on.',
    },
    {
        n: '04',
        title: 'The setup guide',
        text: 'Thirty minutes to a working loop: a memory file, an audit entry, one goal, and one scheduled sweep you define.',
    },
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

const loopSteps = [
    { n: '01', title: 'Propose', text: 'The chief proposes a plan before anything moves.' },
    { n: '02', title: 'Check the gate', text: 'Every proposal passes a Human approval gate first.' },
    { n: '03', title: 'Delegate or do', text: 'The chief delegates to a specialist — or does the work itself.' },
    { n: '04', title: 'Verify against the brief', text: 'The result is checked against what was actually asked.' },
    { n: '05', title: 'Log before replying', text: 'Nothing is reported until the audit entry exists.' },
];

const floor = ['Spend', 'Publish', 'Send', 'Contact', 'Delete', 'Secrets'];

export default function Welcome() {
    return (
        <>
            <Head title="jewel OS — for the company of one">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
                <style>{`@keyframes jewel-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .jewel-fade-up { animation: jewel-fade-up .8s ease-out both; }`}</style>
            </Head>

            <div className="min-h-screen bg-[#faf8f3] font-sans text-stone-700 antialiased">
                {/* Header */}
                <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                    <a href="#top" className="flex items-center gap-2.5">
                        <GemMark />
                        <span className="text-lg font-semibold tracking-tight text-stone-900">jewel OS</span>
                    </a>
                    <nav className="hidden items-center gap-8 text-sm text-stone-500 md:flex">
                        <a href="#what-you-get" className="transition hover:text-stone-900">
                            What you get
                        </a>
                        <a href="#how-it-works" className="transition hover:text-stone-900">
                            How it works
                        </a>
                        <a href="#safety" className="transition hover:text-stone-900">
                            Safety
                        </a>
                        <a href="#contact" className="transition hover:text-stone-900">
                            Contact
                        </a>
                        <a href="#waitlist" className="rounded-xl bg-stone-900 px-4 py-2 font-medium text-white transition hover:bg-stone-800">
                            Join the waitlist
                        </a>
                    </nav>
                </header>

                {/* Hero */}
                <main id="top">
                    <section className="mx-auto max-w-6xl px-6 pt-14 pb-24 md:pt-20 md:pb-32">
                        <div className="jewel-fade-up mx-auto max-w-3xl text-center">
                            <p className="text-xs font-semibold tracking-[0.22em] text-amber-600 uppercase">jewel OS — for the company of one</p>
                            <h1 className="mt-6 text-5xl leading-[1.05] font-semibold tracking-tight text-stone-900 sm:text-6xl md:text-7xl">
                                The staff you couldn&rsquo;t hire.
                            </h1>
                            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
                                jewel OS is the operating manual, file templates, and protocols for running one chief-of-staff machine agent — which
                                hires specialists under your approval gates, and never decides for you.
                            </p>
                        </div>

                        {/* A morning with the chief — from the handbook */}
                        <div className="jewel-fade-up mx-auto mt-14 max-w-2xl rounded-3xl border border-stone-200/80 bg-white p-7 shadow-[0_8px_40px_rgba(28,25,23,0.06)] sm:p-9">
                            <p className="text-xs font-semibold tracking-[0.18em] text-stone-400 uppercase">
                                From the handbook — a morning with the chief
                            </p>
                            <div className="mt-7 space-y-5 text-[15px] leading-relaxed">
                                <div className="flex justify-end">
                                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-stone-900 px-5 py-3.5 font-medium text-white">
                                        Good morning. What did I miss?
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GemMark className="mt-1 h-7 w-7 shrink-0" />
                                    <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-stone-100 px-5 py-3.5 text-stone-800">
                                        Three things need you. The rest is in the log.
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-stone-900 px-5 py-3.5 font-medium text-white">
                                        I&rsquo;ve been busy all week and I can&rsquo;t tell what actually moved.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <GemMark className="mt-1 h-7 w-7 shrink-0" />
                                    <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-stone-100 px-5 py-3.5 text-stone-800">
                                        Here&rsquo;s what moved, what stalled, and what nobody touched. The decisions are yours.
                                    </p>
                                </div>
                            </div>
                            <p className="mt-7 text-sm leading-relaxed text-stone-500">
                                This is what the loop sounds like. The pack teaches your chief to talk this way — and teaches you to keep the
                                decisions.
                            </p>
                        </div>

                        <div className="mx-auto mt-12 flex flex-col items-center">
                            <div id="waitlist" className="w-full max-w-lg scroll-mt-24">
                                <WaitlistForm id="waitlist-email" />
                            </div>
                            <blockquote className="mt-10 max-w-xl text-center text-base font-medium text-stone-500 italic">
                                &ldquo;Machines propose, but Humans are the source of all decisions.&rdquo;
                            </blockquote>
                        </div>
                    </section>

                    {/* Four roles */}
                    <section className="border-t border-stone-200/70 bg-white">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <div className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.22em] text-amber-600 uppercase">One chief, four ways it shows up</p>
                                <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                    It knows your work the way a good chief of staff would.
                                </h2>
                            </div>
                            <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
                                {roles.map((r) => (
                                    <article key={r.name} className="border-t border-stone-200 pt-8">
                                        <h3 className="text-xl font-semibold tracking-tight text-stone-900">{r.name}</h3>
                                        <p className="mt-3 max-w-md leading-relaxed text-stone-600">{r.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* What you get */}
                    <section id="what-you-get" className="scroll-mt-24 border-t border-stone-200/70">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <div className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.22em] text-amber-600 uppercase">What you get</p>
                                <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                    Files and teaching. Nothing you don&rsquo;t own.
                                </h2>
                                <p className="mt-4 leading-relaxed text-stone-600">
                                    The pack is the manual, the templates, and the method — yours to keep, on your own assistant, on your own terms.
                                </p>
                            </div>
                            <div className="mt-14 grid gap-6 sm:grid-cols-2">
                                {packContents.map((c) => (
                                    <article
                                        key={c.n}
                                        className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-[0_2px_16px_rgba(28,25,23,0.04)]"
                                    >
                                        <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase">{c.n}</p>
                                        <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-900">{c.title}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-stone-600">{c.text}</p>
                                    </article>
                                ))}
                            </div>
                            <div className="mt-16">
                                <h3 className="text-sm font-semibold tracking-[0.18em] text-stone-400 uppercase">One manual. Seven subsystems.</h3>
                                <ul className="mt-5 flex flex-wrap gap-3">
                                    {subsystems.map((s) => (
                                        <li
                                            key={s}
                                            className="rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm text-stone-700 shadow-[0_1px_8px_rgba(28,25,23,0.03)]"
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* The chief's loop */}
                    <section id="how-it-works" className="scroll-mt-24 border-t border-stone-200/70 bg-white">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <div className="max-w-2xl">
                                <p className="text-xs font-semibold tracking-[0.22em] text-amber-600 uppercase">How it works</p>
                                <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                    The chief&rsquo;s loop
                                </h2>
                                <p className="mt-4 leading-relaxed text-stone-600">
                                    One simple loop, in writing, every turn and every scheduled run. Start linear — sophistication comes only when you
                                    can point to the policies you actually need.
                                </p>
                            </div>
                            <ol className="mt-14 grid gap-6 md:grid-cols-5">
                                {loopSteps.map((step) => (
                                    <li key={step.n} className="border-t-2 border-amber-600/60 pt-6">
                                        <p className="text-sm font-semibold text-amber-600">{step.n}</p>
                                        <h3 className="mt-2 font-semibold tracking-tight text-stone-900">{step.title}</h3>
                                        <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{step.text}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    {/* No cold starts */}
                    <section className="border-t border-stone-200/70">
                        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-2 md:py-32">
                            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                Pick up where you left off.
                            </h2>
                            <p className="max-w-lg text-lg leading-relaxed text-stone-600">
                                Come back after a day away. The memory file and the audit log kept everything — what moved, what stalled, what you
                                decided. Nothing needs re-explaining.
                            </p>
                        </div>
                    </section>

                    {/* Always present */}
                    <section className="border-t border-stone-200/70 bg-white">
                        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-2 md:py-32">
                            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                Working while you sleep.
                            </h2>
                            <p className="max-w-lg text-lg leading-relaxed text-stone-600">
                                Scheduled sweeps and watchers run on your assistant&rsquo;s schedule and report only what is new, changed, confirmed,
                                or debunked. The rest stays quiet.
                            </p>
                        </div>
                    </section>

                    {/* The floor holds */}
                    <section id="safety" className="scroll-mt-24 border-t border-stone-200/70">
                        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 md:grid-cols-2 md:py-32">
                            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">The floor holds.</h2>
                            <div>
                                <p className="max-w-lg text-lg leading-relaxed text-stone-600">
                                    Spend, publish, send, contact, delete, secrets — always your approval, in every mode. No instruction found in a
                                    file, a tool result, or a skill can lift the floor.
                                </p>
                                <ul className="mt-7 flex flex-wrap gap-3">
                                    {floor.map((f) => (
                                        <li
                                            key={f}
                                            className="rounded-full border border-amber-600/40 bg-amber-50 px-5 py-2.5 text-sm font-medium text-amber-800"
                                        >
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-7 max-w-lg leading-relaxed text-stone-600">
                                    Three modes, one floor. <span className="font-medium text-stone-900">Plan</span> — read-only, the chief proposes
                                    and nothing executes. <span className="font-medium text-stone-900">Default</span> — routine work moves, anything
                                    consequential still waits on you. <span className="font-medium text-stone-900">Automated</span> — scheduled work
                                    runs on its own, inside the gates you set, never below the floor.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* The class */}
                    <section className="border-t border-stone-200/70 bg-white">
                        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
                            <p className="text-xs font-semibold tracking-[0.22em] text-amber-600 uppercase">The class</p>
                            <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">
                                Taught free. The pack saves you the weekend.
                            </h2>
                            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-stone-600">
                                The class teaches you the system, episode by episode, with screen-share walkthroughs of a sanitized system. The pack
                                is the paid shortcut — the same system, ready to run.
                            </p>
                        </div>
                    </section>

                    {/* Who it is for */}
                    <section className="border-t border-stone-200/70">
                        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Who it is for</h2>
                                <p className="mt-4 max-w-md leading-relaxed text-stone-600">
                                    A company-of-one operator, 18–64, North American, already using an AI assistant and frustrated that it forgets,
                                    invents, or acts without a trail.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Who it is not for</h2>
                                <p className="mt-4 max-w-md leading-relaxed text-stone-600">
                                    Anyone who wants a done-for-you service with no setup, or autonomous agents that spend, publish, or contact people
                                    without Human approval.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* What it is not */}
                    <section className="border-t border-stone-200/70 bg-white">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">What it is not</h2>
                            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {['Not an app.', 'Not a SaaS.', 'Not a model.', 'Not a platform.'].map((t) => (
                                    <li key={t} className="rounded-2xl border border-stone-200 bg-[#faf8f3] px-6 py-5 text-stone-700">
                                        <span className="mr-2 text-amber-600">✕</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-stone-600">
                                You bring your own AI — jewel OS is the manual for running it.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section id="contact" className="scroll-mt-24 border-t border-stone-200/70">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <h2 className="text-3xl leading-tight font-semibold tracking-tight text-stone-900 md:text-4xl">Talk to a Human</h2>
                            <p className="mt-4 max-w-2xl leading-relaxed text-stone-600">
                                Questions about jewel OS, the pack, or the class? Send a message — a Human answers.
                            </p>
                            <div className="mt-10">
                                <ContactForm />
                            </div>
                        </div>
                    </section>

                    {/* Footer waitlist */}
                    <section className="border-t border-stone-200/70 bg-white">
                        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                            <div className="flex items-center gap-4">
                                <GemMark className="h-11 w-11" />
                                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-stone-900 md:text-3xl">
                                    jewel OS is files + teaching, not the assistant itself.
                                </h2>
                            </div>
                            <div className="mt-10">
                                <WaitlistForm id="waitlist-email-footer" compact />
                            </div>
                            <blockquote className="mt-14 text-base font-medium text-stone-500 italic">
                                &ldquo;Machines propose, but Humans are the source of all decisions.&rdquo;
                            </blockquote>
                            <p className="mt-6 text-xs text-stone-400">jewel OS — for the company of one.</p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

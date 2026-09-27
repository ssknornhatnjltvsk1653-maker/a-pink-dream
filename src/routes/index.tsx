import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Heart, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "a little place for you ♡" },
    { name: "description", content: "A little pink world made with love, care, and a real apology." },
    { property: "og:title", content: "a little place for you ♡" },
    { property: "og:description", content: "A little pink world made with love, care, and a real apology." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Story,
});

function Strawberry({ className = "", onClick, label = "strawberry", open = false }: { className?: string; onClick?: () => void; label?: string; open?: boolean }) {
  const art = <svg viewBox="0 0 180 205" fill="none" aria-hidden="true" className="w-full h-full overflow-visible">
    <path d="M88 42C59 23 21 46 21 88c0 48 42 93 69 106 26-12 68-58 68-105 0-43-39-66-70-47Z" className="fill-berry stroke-berry-deep" strokeWidth="4" strokeLinejoin="round" />
    <path d="M89 44C66 32 36 50 35 88c-1 38 26 72 53 89" className="stroke-berry-light" strokeWidth="7" strokeLinecap="round" opacity=".6" />
    <path d="M89 46c-12-20-25-23-41-21 8 13 12 19 27 25-20-5-31-1-40 9 17 9 30 10 52 1 20 8 34 7 52-1-11-11-22-13-42-9 15-7 21-15 27-25-15-2-27 2-35 21Z" className="fill-leaf stroke-leaf-deep" strokeWidth="3" strokeLinejoin="round" />
    <path d="M89 36c-2-11 1-20 11-29" className="stroke-leaf-deep" strokeWidth="4" strokeLinecap="round" />
    {[[53,82],[82,76],[116,80],[42,110],[69,106],[99,108],[132,110],[55,139],[85,137],[115,139],[77,165],[102,162]].map(([x,y],i) => <path key={i} d={`M${x} ${y}q-3 5 0 9q3-4 0-9Z`} className="fill-seed" />)}
    {open && <path d="M90 58v105" className="stroke-cream" strokeWidth="6" strokeLinecap="round" />}
  </svg>;
  return onClick ? <Button type="button" variant="ghost" className={`strawberry-button p-0 h-auto ${className}`} onClick={onClick} aria-label={label}>{art}</Button> : <div className={className} aria-hidden="true">{art}</div>;
}

function Mascot({ className = "", sleepy = false }: { className?: string; sleepy?: boolean }) {
  return <svg viewBox="0 0 170 170" className={className} aria-hidden="true">
    <path d="M34 66 24 25q-2-13 12-8l27 25M136 66l10-41q2-13-12-8l-27 25" className="fill-cream stroke-rose-ink" strokeWidth="4" strokeLinejoin="round" />
    <path d="M38 55C10 75 17 129 52 146c20 10 49 10 69 0 36-17 43-70 15-91-26-22-73-22-98 0Z" className="fill-cream stroke-rose-ink" strokeWidth="4" />
    <ellipse cx="49" cy="108" rx="12" ry="7" className="fill-cheek" /><ellipse cx="121" cy="108" rx="12" ry="7" className="fill-cheek" />
    {sleepy ? <><path d="M58 94q10 9 20 0M94 94q10 9 20 0" className="stroke-rose-ink" strokeWidth="4" fill="none" strokeLinecap="round" /></> : <><ellipse cx="67" cy="94" rx="3.5" ry="5" className="fill-rose-ink" /><ellipse cx="103" cy="94" rx="3.5" ry="5" className="fill-rose-ink" /></>}
    <path d="M82 107q3 4 6 0m-3 0v5m-7 0q7 8 14 0" className="stroke-rose-ink" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M38 62q-13-18-4-21 7-1 16 11-2-14 5-15 7 0 10 20-12 15-27 5Z" className="fill-bow stroke-rose-ink" strokeWidth="3" />
    <circle cx="49" cy="56" r="6" className="fill-bow-dark" />
  </svg>;
}

function Doodle({ kind = "star", className = "" }: { kind?: "star" | "heart" | "flower" | "spark"; className?: string }) {
  const paths = {
    star: <path d="M22 2 26 16 40 20 26 24 22 39 18 24 4 20 18 16Z" />,
    heart: <path d="M22 38C15 32 3 23 3 14 3 2 17-1 22 10 27-1 41 2 41 14c0 9-12 18-19 24Z" />,
    flower: <><circle cx="22" cy="22" r="5" /><path d="M22 17C8 0 3 15 17 22 0 9 0 29 17 25 4 36 17 44 22 27c7 18 19 9 5-2 18 3 17-16 0-3 15-6 11-21-5-5Z" /></>,
    spark: <path d="M22 2v40M2 22h40M8 8l28 28M36 8 8 36" />,
  };
  return <svg viewBox="0 0 44 44" className={`doodle ${className}`} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[kind]}</svg>;
}

const thoughts = [
  "you make ordinary days feel softer", "i love having you in my life", "you deserve to feel appreciated",
  "you deserve reassurance", "you deserve patience", "you deserve softness",
  "i like the little world we have", "your smile matters to me", "i'm glad it's you",
  "you make the quiet moments lovely", "i want to listen better", "you matter on the hard days too",
  "i love the way you are simply you", "i want to choose kindness", "you deserve to be spoiled with love too 🥺",
];

function Room({ onBurst }: { onBurst: (x?: number, y?: number) => void }) {
  const [lamp, setLamp] = useState(false);
  const [night, setNight] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [clock, setClock] = useState(false);
  const activate = (action: () => void) => { action(); onBurst(); };
  const keyActivate = (event: React.KeyboardEvent<SVGGElement>, action: () => void) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(action); } };
  return <svg className="room-svg" viewBox="0 0 760 560" role="img" aria-label="An interactive handmade pink room with a lamp, strawberry milk, bow, clock and window">
    <defs><linearGradient id="roomWall" x2="0" y2="1"><stop stopColor="#ffe5eb" /><stop offset="1" stopColor="#ffd0df" /></linearGradient><linearGradient id="roomFloor" x2="0" y2="1"><stop stopColor="#f8b6c8" /><stop offset="1" stopColor="#eb91ab" /></linearGradient><radialGradient id="lampGlow"><stop stopColor="#fff8d6" stopOpacity=".9"/><stop offset="1" stopColor="#fff8d6" stopOpacity="0"/></radialGradient></defs>
    <path d="M25 91Q380-27 735 91v338Q380 575 25 429Z" fill="url(#roomWall)" stroke="#d8789b" strokeWidth="5" />
    <path d="M25 407Q380 500 735 407v28Q380 608 25 435Z" fill="url(#roomFloor)" stroke="#d8789b" strokeWidth="5" />
    <path d="M25 392Q380 485 735 392" fill="none" stroke="#d886a2" strokeWidth="5" />
    <g role="button" tabIndex={0} aria-label="Change the sky outside the window" onClick={() => activate(() => setNight(!night))} onKeyDown={e => keyActivate(e, () => setNight(!night))} className="room-click">
      <rect x="407" y="96" width="180" height="170" rx="65" fill="#fff5ee" stroke="#ca7596" strokeWidth="7" />
      <rect x="422" y="111" width="150" height="141" rx="53" fill={night ? "#a56eaa" : "#f8a8c8"} />
      {night ? <><circle cx="522" cy="150" r="20" fill="#fff4d3" /><circle cx="531" cy="141" r="20" fill="#a56eaa"/><circle cx="450" cy="149" r="3" fill="#fff4d3"/><circle cx="550" cy="195" r="3" fill="#fff4d3"/></> : <><circle cx="523" cy="150" r="25" fill="#ffe7a1" /><path d="M430 210q30-45 71 0 27-29 65 2" fill="#fff4ee" /></>}
      <path d="M496 109v145M422 183h150" stroke="#fff5ee" strokeWidth="9" />
      <path d="M410 101q-18 43 3 100 18-35 12-95m154-5q18 43-3 100-18-35-12-95" fill="#f3a3bd" stroke="#c77898" strokeWidth="3" />
    </g>
    <path d="M80 129h105v9H80zM88 138v82h89v-82" fill="#e69aaf" stroke="#b56c83" strokeWidth="4" />
    <path d="M100 140v68m24-68v68m28-68v68" stroke="#fff0e9" strokeWidth="15" />
    <path d="M93 210h80" stroke="#b56c83" strokeWidth="4" />
    <path d="M105 246q64-14 134 3l31 112-179 5Z" fill="#f1adbf" stroke="#bd708c" strokeWidth="5" />
    <path d="M123 255q64-13 104 0l14 75-138 10Z" fill="#fff7ee" stroke="#d9849d" strokeWidth="4" />
    <path d="M87 326q88-22 180 0l14 78q-99 27-207 0Z" fill="#f49eb7" stroke="#ba6f8c" strokeWidth="5" />
    <path d="M89 360q93-20 185-1M105 384q80-14 159-1" stroke="#ffd7e0" strokeWidth="5" fill="none" />
    <path d="M182 289c-21-17-48 4-37 25 9 18 24 22 37 31 14-9 30-22 35-38 7-23-19-33-35-18Z" fill="#d95d83" stroke="#ab4c6e" strokeWidth="3" />
    <path d="M181 291q-14-18-23-16l10 18q-16-9-22-3 15 14 35 4 19 9 34-5-8-6-23 3 12-16 6-18-9 0-17 17Z" fill="#96ad86" />
    <path d="M350 360v77m130-77v77M324 344q90-17 185 0v23q-93-14-185 0Z" fill="#d78ba4" stroke="#ad6683" strokeWidth="5" />
    <path d="M364 366h105v67H364Z" fill="#f6b6c9" stroke="#ad6683" strokeWidth="4" /><circle cx="416" cy="400" r="5" fill="#ad6683" />
    <g role="button" tabIndex={0} aria-label="Turn the lamp on or off" onClick={() => activate(() => setLamp(!lamp))} onKeyDown={e => keyActivate(e, () => setLamp(!lamp))} className="room-click">
      {lamp && <circle cx="369" cy="293" r="95" fill="url(#lampGlow)" className="lamp-light" />}
      <path d="M369 293v50m-22 0h44" stroke="#ac6b83" strokeWidth="6" strokeLinecap="round" />
      <path d="M350 281q18-13 38 0l14 30h-64Z" fill={lamp ? "#fff3b8" : "#f7c6a8"} stroke="#ae7187" strokeWidth="4" />
    </g>
    <g role="button" tabIndex={0} aria-label="Tap the strawberry milk" onClick={() => onBurst()} onKeyDown={e => keyActivate(e, () => onBurst())} className="room-click">
      <path d="M435 290h43l-5 52h-33Z" fill="#fff3eb" stroke="#b66f89" strokeWidth="3" /><path d="M438 307h37l-4 32h-29Z" fill="#efa0b6" /><path d="m452 290 15-24" stroke="#b66f89" strokeWidth="3" /><path d="M450 315q8-9 15 0-4 10-8 13-7-6-7-13Z" fill="#d95d83" />
    </g>
    <g role="button" tabIndex={0} aria-label="Wiggle the bow" onClick={() => activate(() => { setWiggle(true); setTimeout(() => setWiggle(false), 700); })} onKeyDown={e => keyActivate(e, () => setWiggle(!wiggle))} className={`room-click ${wiggle ? "bow-wiggle" : ""}`}>
      <path d="M615 151q-46-27-43 7 4 20 39 13-26 24-4 33 24 2 25-37 3 40 26 36 19-10-8-32 38 7 38-13-3-30-45-7Z" fill="#e984a5" stroke="#a95e7f" strokeWidth="4" /><circle cx="631" cy="165" r="12" fill="#c96890" />
    </g>
    <g role="button" tabIndex={0} aria-label="Make the clock sparkle" onClick={() => activate(() => { setClock(true); setTimeout(() => setClock(false), 850); })} onKeyDown={e => keyActivate(e, () => setClock(!clock))} className="room-click">
      <path d="M294 156c-25-28-61 4-37 32l37 31 37-31c24-28-12-60-37-32Z" fill="#fff4e8" stroke="#bd7791" strokeWidth="5" />
      <path d="M294 162v25l14 6" fill="none" stroke="#bd7791" strokeWidth="4" strokeLinecap="round" />
      {clock && <><path d="m340 147 5-15 5 15 15 5-15 5-5 15-5-15-15-5Z" fill="#fff4c5"/><circle cx="249" cy="145" r="5" fill="#fff4c5"/></>}
    </g>
    <path d="M585 342h100v16H585Zm9 16v76m82-76v76" fill="#d990a9" stroke="#b46c86" strokeWidth="4" />
    <path d="M617 345q-20-34 2-52m0 52q17-36 2-54m0 54q11-35 30-44" fill="none" stroke="#80a27e" strokeWidth="4" /><circle cx="620" cy="287" r="10" fill="#ed849f" /><circle cx="650" cy="298" r="9" fill="#f1adbd" /><circle cx="604" cy="302" r="8" fill="#f0b3c4" /><path d="M597 336h45l-7 31h-31Z" fill="#f6e4d9" stroke="#b46c86" strokeWidth="3" />
    <path d="M673 213q13-9 25 0v58q-12 9-25 0Z" fill="#f8d7df" stroke="#b46c86" strokeWidth="3" /><path d="M680 226q6-3 12 0m-12 12q6-3 12 0" stroke="#b46c86" strokeWidth="3" />
    <path d="M341 93v39m-7-23 7-7 7 7-7 7Z" fill="#ffefa9" stroke="#be8b9e" strokeWidth="2" />
    <path d="M671 90v38m-8-18 8-8 8 8-8 8Z" fill="#ffefa9" stroke="#be8b9e" strokeWidth="2" />
    <ellipse cx="320" cy="435" rx="38" ry="17" fill="#d987a1" opacity=".4" />
    <g transform="translate(282 346) scale(.43)"><path d="M34 66 24 25q-2-13 12-8l27 25M136 66l10-41q2-13-12-8l-27 25" fill="#fff8ef" stroke="#ad6886" strokeWidth="5"/><ellipse cx="85" cy="95" rx="67" ry="59" fill="#fff8ef" stroke="#ad6886" strokeWidth="5"/><circle cx="64" cy="91" r="4" fill="#ad6886"/><circle cx="106" cy="91" r="4" fill="#ad6886"/><path d="M78 111q7 10 14 0" fill="none" stroke="#ad6886" strokeWidth="3"/></g>
  </svg>;
}

function Story() {
  const [awake, setAwake] = useState(false);
  const [activeBerry, setActiveBerry] = useState<number | null>(null);
  const [surprise, setSurprise] = useState(false);
  const [hearts, setHearts] = useState(0);
  const [sound, setSound] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const burst = () => { setHearts(v => v + 1); window.setTimeout(() => setHearts(0), 2500); if (sound) chime(); };
  const chime = () => {
    try {
      const context = audioRef.current ?? new AudioContext(); audioRef.current = context;
      [523.25, 659.25, 783.99].forEach((frequency, i) => {
        const oscillator = context.createOscillator(); const gain = context.createGain();
        oscillator.type = "sine"; oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, context.currentTime + i * .09);
        gain.gain.exponentialRampToValueAtTime(.025, context.currentTime + i * .09 + .025);
        gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + i * .09 + .65);
        oscillator.connect(gain).connect(context.destination); oscillator.start(context.currentTime + i * .09); oscillator.stop(context.currentTime + i * .09 + .7);
      });
    } catch { /* sound is optional */ }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: .1, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let ticking = false;
    const update = () => { if (worldRef.current) { const max = document.documentElement.scrollHeight - window.innerHeight; worldRef.current.style.setProperty("--journey", String(max > 0 ? window.scrollY / max : 0)); } ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener("scroll", onScroll, { passive: true }); update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <main ref={worldRef} className={`world ${awake ? "world-awake" : ""}`}>
    <div className="paper-grain" aria-hidden="true" />
    <div className="travel-ribbon" aria-hidden="true"><svg viewBox="0 0 100 1600" preserveAspectRatio="none"><path d="M-20 2C120 90-10 135 53 220S110 353 48 423 13 569 59 650 94 784 38 858 9 974 63 1046 92 1185 42 1269 2 1419 68 1500 80 1570 28 1620" /></svg></div>
    <div className="sound-wrap"><Button variant="ghost" size="icon" aria-label={sound ? "Turn gentle sounds off" : "Turn gentle sounds on"} title={sound ? "sound off" : "sound on"} onClick={() => setSound(!sound)}>{sound ? <Volume2 /> : <VolumeX />}</Button></div>
    {hearts > 0 && <div className="heart-burst" key={hearts} aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} style={{ "--i": i, "--angle": `${i * 137.5}deg`, "--distance": `${75 + (i % 5) * 32}px` } as React.CSSProperties}>♡</span>)}</div>}

    <div className="opening" id="top">
      <Doodle className="opening-star star-a" /><Doodle kind="spark" className="opening-star star-b" /><Doodle className="opening-star star-c" />
      <div className="opening-whisper"><span>psst...</span><span>wait...</span><span>come here 🥺</span></div>
      <div className="opening-berry"><Mascot className="peek-mascot" /><Strawberry className="intro-strawberry" /></div>
      {!awake ? <Button className="sticker-button wake-button" onClick={() => { setAwake(true); if (sound) chime(); }}><span>tap me ♡</span></Button> : <div className="wake-message"><p>i made this little place for you</p><p>so just stay for a minute...</p><a href="#first-words" aria-label="Scroll down to the first words" className="scroll-doodle"><ArrowDown /></a></div>}
    </div>

    <div className="sky-drift" id="first-words">
      <div className="cloud cloud-one" /><div className="cloud cloud-two" /><div className="cloud cloud-three" />
      <Doodle kind="heart" className="float-mark sky-heart-one" /><Doodle kind="spark" className="float-mark sky-heart-two" />
      <div className="sky-words"><p className="reveal soft-intro">first things first...</p><h1 className="reveal">you are very<br />very loved</h1><p className="reveal sky-after">more than i probably say properly sometimes</p></div>
    </div>

    <div className="path-scene">
      <div className="path-line" aria-hidden="true" />
      <Strawberry className="path-berry berry-left" /><Strawberry className="path-berry berry-right" />
      <Doodle kind="flower" className="path-flower flower-one" /><Doodle kind="heart" className="path-flower flower-two" />
      <div className="thought apology-one reveal"><span className="tiny-kicker">a little honesty...</span><p>i’m sorry for letting my ego get in the way when what actually mattered was you and us. i know sometimes i get caught up in what i’m feeling in the moment and i end up making things harder than they need to be. and honestly, i hate that i let a stupid fight become bigger than the person i love.</p></div>
      <div className="thought apology-two reveal"><p>you didn’t deserve to feel like i was choosing my ego over you. i’m genuinely sorry for that. i’m not trying to make excuses for myself. i just want you to know that i realise where i went wrong, and i care about making things better — not just saying sorry and moving on.</p></div>
    </div>

    <div className="garden-scene">
      <div className="garden-hill hill-back" /><div className="garden-hill hill-front" />
      <div className="garden-heading reveal"><span className="tiny-kicker">a little garden of thoughts</span><h2>and there’s more<br />i want you to know...</h2></div>
      <div className="giant-garden-berry"><Strawberry label="Tap the big strawberry for little hearts" onClick={burst} className="giant-strawberry" /><Mascot className="garden-mascot" /></div>
      <div className="garden-vines" aria-hidden="true"><svg viewBox="0 0 400 2100" preserveAspectRatio="none"><path d="M186 0C310 183 49 292 185 430S325 694 169 826 43 1153 209 1303 318 1648 169 1807 187 2016 195 2100" /></svg></div>
      <div className="berry-notes">{thoughts.map((thought, i) => <div key={thought} className={`berry-note reveal berry-note-${i % 4}`}><Strawberry className="note-berry" label={`Read thought ${i + 1}`} onClick={() => { setActiveBerry(activeBerry === i ? null : i); burst(); }} /><p className={activeBerry === i ? "note-open" : ""}>{thought}</p></div>)}</div>
      <div className="garden-letter reveal"><p>sometimes i don't think i explain properly how much you mean to me...</p><p>it isn't only the big moments that make me love having you in my life. it is the little things too — the way you can make a normal conversation feel special, the way your presence can change the mood of an entire day, and the way somehow, even when everything feels messy, there is still a part of me that just wants to be close to you and make things okay.</p><p>i don't want my love for you to only exist in cute words. i want it to show in the way i listen, in the way i understand, in the way i apologise when i'm wrong, and in the way i keep choosing kindness even when we're annoyed with each other.</p></div>
      <Doodle kind="flower" className="garden-flower gf-one" /><Doodle kind="flower" className="garden-flower gf-two" /><Doodle kind="flower" className="garden-flower gf-three" /><Doodle kind="flower" className="garden-flower gf-four" />
    </div>

    <div className="scrapbook-scene">
      <div className="scrapbook-paper reveal"><div className="paper-tape tape-one"/><div className="paper-tape tape-two"/><Doodle kind="heart" className="paper-heart" /><span className="tiny-kicker">scribbled in the margins</span><h2>little things i love</h2><div className="scrap-lines">{["your presence", "your energy", "the way you make things feel less boring", "the comfort you bring", "the way you can make me smile without even trying", "your little habits", "your random moments", "the way you are simply you"].map((line, i) => <p className="reveal" key={line}><span className="line-spark">✳</span>{line}<span className="line-number">0{i + 1}</span></p>)}</div><div className="paper-ending reveal">basically...<strong>you. <span>♡ ♡</span></strong></div></div>
    </div>

    <div className="room-scene"><div className="room-stars" aria-hidden="true">✧　⋆　✧</div><div className="room-title reveal"><span className="tiny-kicker">somewhere in this little world</span><h2>a cozy place<br />to pause</h2></div><div className="room-stage reveal"><Room onBurst={burst} /></div><Mascot className="room-floating-friend" sleepy /></div>

    <div className="evening-scene"><div className="evening-cloud cloud" /><div className="evening-stars" aria-hidden="true">✦　⋆　✧　⋆　✦</div><div className="evening-lines"><p className="reveal">and honestly...</p><p className="reveal">i don't want this little thing between us to become bigger than the love behind it</p><p className="reveal">i care about you way too much for that</p><p className="reveal evening-sorry">i'm sorry baby</p></div><div className="evening-paragraph reveal"><p>i know saying sorry doesn't magically erase a bad moment. but i still want to say it properly, because you matter to me and because i should never let pride become louder than the care i have for you. i want to be better at understanding you and better at handling the moments when we don't agree. because loving someone isn't only about the easy days — it's also about learning how to be softer with each other on the difficult ones.</p><span>i mean that.</span></div></div>

    <div className="ribbon-scene"><div className="ribbon-path" aria-hidden="true" /><div className="ribbon-words">{["love", "patience", "comfort", "trust", "laughter", "understanding", "us"].map((word, i) => <span className={`reveal ribbon-word ribbon-word-${i % 3}`} key={word}>{word}</span>)}</div></div>

    <div className="big-heart-scene"><div className="heart-drawing reveal"><svg viewBox="0 0 500 470" aria-hidden="true"><path d="M250 427C191 379 34 269 31 160 28 43 174 8 250 122 326 8 472 43 469 160c-3 109-160 219-219 267Z" /></svg><div className="heart-center"><span>i love you</span><strong>so so much</strong></div></div><p className="reveal">and i'm really sorry</p><p className="reveal thanks">thank you for being you</p><Doodle kind="spark" className="heart-star hs-one" /><Doodle kind="star" className="heart-star hs-two" /></div>

    <div className="last-letter"><div className="letter-text reveal"><p>if i could take one thing from this whole moment, it would be the reminder that i never want my ego to make me forget how precious you are to me. i don't expect everything between us to always be perfect, and i don't think love means never getting annoyed or never having difficult moments. i just want us to always find our way back to understanding each other with a little more patience and a little more softness. and from my side, i want to do better at that, because you deserve that from me.</p></div><div className="last-lines"><p className="reveal">so yeah...</p><p className="reveal">this is me putting my ego down for a second...</p><p className="reveal">and choosing to tell you what i should've told you sooner...</p><p className="reveal last-love">i love you.</p></div></div>

    <div className={`surprise-scene ${surprise ? "surprise-open" : ""}`}><div className="surprise-stars" aria-hidden="true">✦　✧　⋆　✦　✧</div><div className="surprise-stage"><div className="surprise-halo" /><div className="surprise-heart" aria-hidden="true">♥</div><Strawberry className="surprise-berry" label="Open the strawberry surprise" open={surprise} onClick={() => { setSurprise(true); burst(); }} />{surprise && <div className="surprise-confetti" aria-hidden="true">{Array.from({ length: 45 }, (_, i) => <span key={i} style={{ "--i": i, "--angle": `${i * 137.5}deg`, "--distance": `${110 + (i % 7) * 34}px` } as React.CSSProperties}>{["♡", "✦", "✿", "🎀", "🍓"][i % 5]}</span>)}</div>}</div>{!surprise ? <p className="surprise-invite reveal">there's one more little thing...<br /><small>tap the strawberry ♡</small></p> : <div className="surprise-message"><p>okay...</p><p>one last thing</p><p>you are loved.</p><p>you are appreciated.</p><p>you are important.</p><p>and i hope you never forget that.</p></div>}</div>

    <div className="final-sky"><div className="final-cloud final-cloud-left" /><div className="final-cloud final-cloud-right" /><div className="final-moon"><svg viewBox="0 0 260 260" aria-hidden="true"><path d="M200 27c-80 18-110 112-55 168 26 27 62 34 95 19-32 41-100 52-148 8C42 176 40 97 91 51 124 21 162 18 200 27Z" className="fill-moon" /></svg><Mascot sleepy className="moon-mascot" /></div><Strawberry className="final-berry fb-one" /><Strawberry className="final-berry fb-two" /><Doodle kind="star" className="final-star fs-one" /><Doodle kind="spark" className="final-star fs-two" /><Doodle kind="heart" className="final-star fs-three" /><div className="final-words"><p className="reveal">that's all i wanted to say...</p><h2 className="reveal">i love you ♡</h2><p className="reveal">and i'm sorry</p><p className="reveal come-here">come here 🥺</p><Button variant="ghost" className="final-heart-button" onClick={burst} aria-label="Tap the heart if you smiled"><Heart fill="currentColor" /><span>tap the heart if you smiled</span></Button></div></div>
  </main>;
}

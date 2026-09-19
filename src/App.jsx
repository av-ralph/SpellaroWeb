import { useMemo, useState } from 'react'
import mascot from './assets/spellaroo-game-icon.png'
import appIcon from './assets/spellaroo-game-icon.png'
import adventureBg from './assets/spellaroo-adventure-bg.png'
import './App.css'
import './Theme.css'

const Icon = ({ name, size = 20 }) => {
  const icons = {
    apple: <><path d="M16.6 13.1c0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2.1-4-2.1-1.7-.2-3.3 1-4.2 1s-2.2-1-3.6-1C5.3 7 3.6 8 2.7 9.5c-1.9 3.3-.5 8.2 1.3 10.8.9 1.3 2 2.7 3.4 2.6 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3.1-.1 0-2.8-1.1-2.8-4.1Z"/><path d="M13.8 5.1c.7-.9 1.2-2.2 1.1-3.4-1.1 0-2.5.8-3.3 1.7-.7.8-1.3 2.1-1.2 3.3 1.3.1 2.6-.7 3.4-1.6Z"/></>,
    android: <><path d="M5.2 8.3h13.6v10.4c0 .7-.6 1.3-1.3 1.3h-1v2.2a1.3 1.3 0 0 1-2.6 0V20H10v2.2a1.3 1.3 0 0 1-2.6 0V20h-1c-.7 0-1.3-.6-1.3-1.3V8.3Z"/><path d="M3 9.3c-.7 0-1.3.6-1.3 1.3v6.2a1.3 1.3 0 0 0 2.6 0v-6.2C4.3 9.9 3.7 9.3 3 9.3Zm18 0c-.7 0-1.3.6-1.3 1.3v6.2a1.3 1.3 0 0 0 2.6 0v-6.2c0-.7-.6-1.3-1.3-1.3ZM7.3 7.2a5.4 5.4 0 0 1 9.4 0H7.3Zm.2-4.8 1.3 2.1m7.7-2.1-1.3 2.1"/></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>, play: <path d="m9 7 8 5-8 5V7Z"/>,
    sound: <><path d="M5 10v4h3l4 3V7L8 10H5Z"/><path d="M15 9.5a3 3 0 0 1 0 5m2-7a6 6 0 0 1 0 9"/></>,
    check: <path d="m5 12 4 4L19 6"/>, spark: <path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>, close: <path d="m6 6 12 12M18 6 6 18"/>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={`icon icon-${name}`}>{icons[name]}</svg>
}

const words = [
  { clue: 'A place where books live', letters: ['L','I','B','R','A','R','Y'], answer: 'LIBRARY' },
  { clue: 'Bright in the night sky', letters: ['S','T','A','R'], answer: 'STAR' },
  { clue: 'A baby kangaroo', letters: ['J','O','E','Y'], answer: 'JOEY' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [round, setRound] = useState(0)
  const [chosen, setChosen] = useState([])
  const [message, setMessage] = useState('')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [pendingDownload, setPendingDownload] = useState({ url: '', label: '' })
  const word = words[round]
  const platform = useMemo(() => /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'iPhone' : 'Android', [])
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }
  const requestDownload = (url, label) => { setPendingDownload({ url, label }); setShowDownloadModal(true) }
  const confirmDownload = () => { const a = document.createElement('a'); a.href = pendingDownload.url; a.download = ''; a.click(); setShowDownloadModal(false); setPendingDownload({ url: '', label: '' }) }
  const cancelDownload = () => { setShowDownloadModal(false); setPendingDownload({ url: '', label: '' }) }
  const chooseLetter = (letter, index) => {
    if (chosen.some(item => item.index === index) || message) return
    const next = [...chosen, { letter, index }]; setChosen(next)
    if (next.length === word.answer.length) setMessage(next.map(item => item.letter).join('') === word.answer ? 'Brilliant! You nailed it.' : 'Almost! Tap clear and try again.')
  }
  const nextRound = () => { setRound((round + 1) % words.length); setChosen([]); setMessage('') }
  return <main>
    <nav className="nav wrap" aria-label="Main navigation">
      <button className="brand" onClick={() => scrollTo('home')} aria-label="Spellaroo home"><img className="brand-mark" src={appIcon} alt=""/><span>Spellaroo</span></button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}><button onClick={() => scrollTo('how')}>How it works</button><button onClick={() => scrollTo('play')}>Try it</button><button onClick={() => scrollTo('download')}>Download</button></div>
      <button className="nav-cta" onClick={() => scrollTo('download')}>Get the app <Icon name="arrow" size={18}/></button>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><Icon name={menuOpen ? 'close' : 'menu'}/></button>
    </nav>
    <section className="hero-shell" id="home" style={{'--adventure-bg': `url(${adventureBg})`}}><div className="hero wrap">
      <div className="hero-copy"><div className="eyebrow"><Icon name="spark" size={16}/> Word skills that stick</div><h1>Spelling practice.<br/><em>Made to feel like play.</em></h1><p className="hero-lede">Short, joyful challenges help learners build confidence, grow their vocabulary, and master tricky words—one hop at a time.</p><div className="hero-actions"><button className="button primary" onClick={() => scrollTo('download')}>Download free <Icon name="arrow"/></button><button className="button secondary" onClick={() => scrollTo('play')}><span className="play-icon"><Icon name="play" size={16}/></span> Try a round</button></div><div className="trust"><div className="faces"><span>J</span><span>M</span><span>A</span></div><div><b>Loved by curious learners</b><small>Playful practice, zero pressure</small></div></div></div>
      <div className="hero-visual" aria-label="Spellaroo World Champ game mascot"><div className="float-card card-streak"><span>🔥</span><div><b>7 day streak</b><small>Keep exploring!</small></div></div><div className="float-card card-score"><span className="score-ring">92</span><div><b>Great work!</b><small>Word accuracy</small></div></div><img src={mascot} alt="Spellaroo World Champ kangaroo mascot" /></div>
    </div></section>
    <section className="marquee" aria-label="App benefits"><div>BUILD CONFIDENCE <span>✦</span> GROW VOCABULARY <span>✦</span> LEARN THROUGH PLAY <span>✦</span> MASTER EVERY WORD <span>✦</span> BUILD CONFIDENCE <span>✦</span> GROW VOCABULARY</div></section>
    <section className="how wrap" id="how"><div className="section-heading"><span className="kicker">A smarter way to practise</span><h2>Small wins. Big word power.</h2><p>Every session is designed to feel achievable, rewarding, and genuinely fun.</p></div><div className="feature-grid">
      <article className="feature-card purple"><span className="feature-number">01</span><div className="tile-stack"><i>C</i><i>A</i><i>T</i></div><div><h3>Play bite-sized rounds</h3><p>Quick challenges fit neatly into busy days and keep practice feeling fresh.</p></div></article>
      <article className="feature-card coral"><span className="feature-number">02</span><div className="sound-art"><span><Icon name="sound" size={34}/></span><i></i><i></i><i></i><i></i></div><div><h3>Hear it. Build it. Learn it.</h3><p>Audio cues and friendly hints support independent learning at every step.</p></div></article>
      <article className="feature-card yellow"><span className="feature-number">03</span><div className="progress-art"><div><b>12</b><small>words mastered</small></div><span>+3</span></div><div><h3>Watch confidence grow</h3><p>Clear progress celebrates effort and makes every new word feel like a win.</p></div></article>
    </div></section>
    <section className="play-section" id="play"><div className="wrap play-layout"><div className="play-copy"><span className="kicker">Try it yourself</span><h2>Can you spell it?</h2><p>Tap the letters in the right order. No timer, no pressure—just a satisfying little brain boost.</p><div className="learning-points"><span><Icon name="check"/>Instant feedback</span><span><Icon name="check"/>Friendly encouragement</span><span><Icon name="check"/>Fresh words every day</span></div></div><div className="game-card"><div className="game-top"><span>QUICK ROUND</span><span>{round + 1} / {words.length}</span></div><button className="clue" aria-label={`Hear clue: ${word.clue}`}><span><Icon name="sound"/></span><div><small>YOUR CLUE</small><b>{word.clue}</b></div></button><div className="answer-row" aria-label="Your answer">{word.letters.map((_, i) => <span key={i}>{chosen[i]?.letter || ''}</span>)}</div><div className="letter-row">{word.letters.map((letter, i) => <button key={`${letter}-${i}`} disabled={chosen.some(item => item.index === i)} onClick={() => chooseLetter(letter, i)}>{letter}</button>)}</div><div className={`game-message ${message.startsWith('Brilliant') ? 'success' : ''}`} aria-live="polite">{message || 'Choose a letter to begin'}</div><div className="game-actions"><button onClick={() => {setChosen([]); setMessage('')}}>Clear</button><button className="next" onClick={nextRound}>Next word <Icon name="arrow" size={17}/></button></div></div></div></section>
    <section className="download wrap" id="download"><div className="download-card"><div className="download-copy"><span className="kicker light">Ready when you are</span><h2>Take your next word<br/>for a hop.</h2><p>Download Spellaroo for free and make spelling the best ten minutes of the day.</p><div className="store-buttons"><button className={`store-btn ${platform === 'iPhone' ? 'recommended' : ''}`} onClick={() => requestDownload('/downloads/Spellaroo.ipa', 'iPhone & iPad')}><Icon name="apple" size={27}/><span><small>Download for</small><b>iPhone & iPad</b></span></button><button className={`store-btn ${platform === 'Android' ? 'recommended' : ''}`} onClick={() => requestDownload('/downloads/Spellaroo.apk', 'Android')}><Icon name="android" size={27}/><span><small>Download for</small><b>Android</b></span></button></div><small className="platform-note">We think you're on {platform}. The preview download includes early-access instructions.</small></div><div className="phone"><div className="phone-screen"><div className="phone-logo"><span>S</span> Spellaroo</div><div className="mini-progress">TODAY'S WORDS <b>4 / 5</b></div><div className="mini-word"><span>S</span><span>M</span><span>I</span><span>L</span><span>E</span></div><strong>Brilliant!</strong><p>You found the word.</p><button>Next word →</button></div></div></div></section>
    {showDownloadModal && <div className="modal-overlay" onClick={cancelDownload}><div className="modal-content" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={cancelDownload} aria-label="Close"><Icon name="close" size={20}/></button><div className="modal-icon"><Icon name="download" size={32}/></div><h3>Download Spellaroo</h3><p>You're about to download the <b>{pendingDownload.label}</b> version. This will save an installation file to your device.</p><div className="modal-actions"><button className="modal-btn cancel" onClick={cancelDownload}>Cancel</button><button className="modal-btn confirm" onClick={confirmDownload}>Download</button></div></div></div>}
    <footer className="footer wrap"><button className="brand" onClick={() => scrollTo('home')}><img className="brand-mark" src={appIcon} alt=""/><span>Spellaroo</span></button><p>Made for bright minds and brave spellers.</p><span>© 2026 Spellaroo</span></footer>
  </main>
}
export default App

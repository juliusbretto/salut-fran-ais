import './App.css'
import { useState } from 'react'
import { words, animals, corps, nourriture, habillement, famille, materiaux, articles, maison, directions, émotions, eny,
  temps, transport, sport, nature, weather, metiers, couleurs, verbes, vandertramp, cuisine, lieux, adjectifs, adverbes, comparisonnegation,
  futurSimple, futurProche, passeComposé, imparfait, present, pronominaux, prepositions, demonstratifs, pronoms, imperatif } from './wordDatabase'

export default function App() {
  const [view, setView] = useState('home')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false, show: false })
  const [gameCompleted, setGameCompleted] = useState(false)
  const [feedbackTimeout, setFeedbackTimeout] = useState(null)
  const [currentGameWords, setCurrentGameWords] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showWrongBox, setShowWrongBox] = useState(false)
  const [lastWrongAnswer, setLastWrongAnswer] = useState('')
  const [showGrammarDropdown, setShowGrammarDropdown] = useState(false)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongWords, setWrongWords] = useState([])

  const checkAnswer = () => {
    // Clear any existing timeout
    if (feedbackTimeout) {
      clearTimeout(feedbackTimeout)
    }

    const currentWord = currentGameWords[currentWordIndex]
    // Handle prepositions format (with answer field) vs regular format (with french field)
    const correctAnswer = currentWord.answer || currentWord.french
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1)
      setFeedback({
        message: `"${userAnswer}", c'est correct!`,
        isCorrect: true,
        show: true
      })
      if (currentWordIndex === currentGameWords.length - 1) {
        setGameCompleted(true)
      } else {
        setCurrentWordIndex(prev => prev + 1)
      }
      setUserAnswer('')
      // Hide feedback after a brief moment
      const timeout = setTimeout(() => {
        setFeedback(prev => ({ ...prev, show: false }))
      }, 1000)
      setFeedbackTimeout(timeout)
    } else {
      setLastWrongAnswer(userAnswer)
      setShowWrongBox(true)
      setIncorrectCount(prev => prev + 1)
      setWrongWords(prev => [...prev, currentWord])
      setUserAnswer('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer()
    }
  }

  const shuffleWords = (category) => {
    let wordList
    switch(category) {
      case 'animals':
        wordList = animals
        break
      case 'corps':
        wordList = corps
        break
      case 'nourriture':
        wordList = nourriture
        break
      case 'habillement':
        wordList = habillement
        break
      case 'famille': 
        wordList = famille
        break
      case 'materiaux':
        wordList = materiaux
        break
      case 'temps':
        wordList = temps
        break
      case 'transport':
        wordList = transport
        break
      case 'sport':
        wordList = sport
        break
      case 'nature':
        wordList = nature
        break
      case 'weather':
        wordList = weather
        break
      case 'metiers':
        wordList = metiers
        break
      case 'couleurs':
        wordList = couleurs
        break
      case 'articles':
        wordList = articles
        break
      case 'mix':
        wordList = [...animals, ...corps, ...nourriture, ...habillement, ...famille, ...materiaux, ...temps, ...transport, ...sport, ...nature, ...weather, ...metiers, ...couleurs, ...cuisine, ...lieux, ...maison, ...directions, ...émotions]
        break
      case 'verbes':
        wordList = verbes
        break
      case 'vandertramp':
        wordList = vandertramp
        break
      case 'futurSimple':
        wordList = futurSimple
        break
      case 'futurProche':
        wordList = futurProche
        break
      case 'passeComposé':
        wordList = passeComposé
        break
      case 'imparfait':
        wordList = imparfait
        break
      case 'present':
        wordList = present
        break
      case 'pronominaux':
        wordList = pronominaux
        break
      case 'prepositions':
        wordList = prepositions
        break
      case 'demonstratifs':
        wordList = demonstratifs
        break
      case 'pronoms':
        wordList = pronoms
        break
      case 'imperatif':
        wordList = imperatif
        break
      case 'mixVerbes':
        wordList = [...verbes, ...vandertramp, ...futurSimple, ...futurProche, ...passeComposé, ...imparfait, ...present, ...pronominaux, ...imperatif]
        break
      case 'mixGrammaire':
        wordList = [...articles, ...prepositions, ...demonstratifs, ...pronoms, ...adjectifs, ...adverbes, ...comparisonnegation, ...eny]
        break
      case 'cuisine':
        wordList = cuisine
        break
      case 'lieux':
        wordList = lieux
        break
      case 'adjectifs':
        wordList = adjectifs
        break
      case 'directions':
        wordList = directions
        break
      case 'maison':
        wordList = maison
        break
      case 'émotions':
        wordList = émotions
        break
      case 'adverbes':
        wordList = adverbes
        break
      case 'comparisonnegation':
        wordList = comparisonnegation
        break
      case 'eny':
        wordList = eny
        break
      default:
        break
    }
    const shuffled = [...wordList].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 20)
    console.log('Selected words:', selected.map(w => w.french))
    return selected
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setUserAnswer('')
    setFeedback({ message: '', isCorrect: false, show: false })
    setGameCompleted(false)
    setSelectedCategory(null)
    setIncorrectCount(0)
    setCorrectCount(0)
    setWrongWords([])
    setShowGrammarDropdown(false)
  }

  const startGame = (category) => {
    setSelectedCategory(category)
    setCurrentGameWords(shuffleWords(category))
  }

    if (view === 'mots') {
    // Show category selection if no category is selected
    if (selectedCategory === null) {
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => setView('home')} style={{ position: "absolute", left: 16 }}>← Retour</button>
            <h3 style={{ margin: 0 }}>Pratiquer les mots</h3>
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <div style={{ textAlign: "center", padding: 20, width: "100%", maxWidth: 900 }}>
              <h2 style={{ marginBottom: 24, color: "#333" }}>Quelle catégorie ?</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, width: "100%" }}>
                <button onClick={() => startGame('animals')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#4CAF50", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#43A047"} onMouseOut={(e) => e.target.style.background = "#4CAF50"}>Les animaux</button>
                <button onClick={() => startGame('corps')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#2196F3", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#1E88E5"} onMouseOut={(e) => e.target.style.background = "#2196F3"}>Les parties du corps</button>
                <button onClick={() => startGame('nourriture')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#FFDE21", color: "#333", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#E6C800"} onMouseOut={(e) => e.target.style.background = "#FFDE21"}>Le nourriture</button>
                <button onClick={() => startGame('habillement')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#9C27B0", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#8E24AA"} onMouseOut={(e) => e.target.style.background = "#9C27B0"}>L'habillement</button>
                <button onClick={() => startGame('famille')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#009688", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#00897B"} onMouseOut={(e) => e.target.style.background = "#009688"}>La famille</button>
                <button onClick={() => startGame('materiaux')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#795548", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#6D4C41"} onMouseOut={(e) => e.target.style.background = "#795548"}>Les matériaux</button>
                <button onClick={() => startGame('temps')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#3F51B5", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#3949AB"} onMouseOut={(e) => e.target.style.background = "#3F51B5"}>Le temps ⏰</button>
                <button onClick={() => startGame('transport')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#00BCD4", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#00ACC1"} onMouseOut={(e) => e.target.style.background = "#00BCD4"}>Le transport</button>
                <button onClick={() => startGame('sport')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#E91E63", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#C2185B"} onMouseOut={(e) => e.target.style.background = "#E91E63"}>Le sport</button>
                <button onClick={() => startGame('nature')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#8BC34A", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#7CB342"} onMouseOut={(e) => e.target.style.background = "#8BC34A"}>La nature</button>
                <button onClick={() => startGame('weather')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#607D8B", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#546E7A"} onMouseOut={(e) => e.target.style.background = "#607D8B"}>Le temps 🌦️</button>
                <button onClick={() => startGame('metiers')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#673AB7", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#5E35B1"} onMouseOut={(e) => e.target.style.background = "#673AB7"}>Les métiers</button>
                <button onClick={() => startGame('couleurs')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#FF5722", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#E64A19"} onMouseOut={(e) => e.target.style.background = "#FF5722"}>Les couleurs</button>
                <button onClick={() => startGame('cuisine')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#2E7D32", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#1B5E20"} onMouseOut={(e) => e.target.style.background = "#2E7D32"}>La cuisine</button>
                <button onClick={() => startGame('lieux')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#8B0000", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#5A0000"} onMouseOut={(e) => e.target.style.background = "#8B0000"}>Les lieux</button>
                <button onClick={() => startGame('émotions')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#D2691E", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#A05215"} onMouseOut={(e) => e.target.style.background = "#D2691E"}>Les émotions</button>
                <button onClick={() => startGame('directions')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#1E90FF", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#1565B8"} onMouseOut={(e) => e.target.style.background = "#1E90FF"}>Les directions</button>
                <button onClick={() => startGame('maison')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#2E8B57", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#20613E"} onMouseOut={(e) => e.target.style.background = "#2E8B57"}>La maison</button>
              </div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", width: "100%" }}>
                <button onClick={() => startGame('mix')} style={{ padding: "16px 32px", fontSize: 18, borderRadius: 12, border: "none", background: "#FF9800", color: "white", cursor: "pointer", transition: "background-color 0.2s", minWidth: 220 }} onMouseOver={(e) => e.target.style.background = "#F57C00"} onMouseOut={(e) => e.target.style.background = "#FF9800"}>Un mélange de tout</button>
              </div>
            </div>
          </div>
        </>
      )
    }
    
    if (gameCompleted) {
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/*<button onClick={() => setView('home')} style={{ position: "absolute", left: 16 }}>← Retour</button>*/}
            <h3 style={{ margin: 0 }}>Pratiquer les mots</h3>
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 20 }}>
              <h2 style={{ color: "#4CAF50", marginBottom: 20 }}>Félicitations! 🎉</h2>
              <p style={{ fontSize: 18, marginBottom: 10 }}>Vous avez terminé tous les mots!</p>
              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Score: {currentGameWords.length - wrongWords.length}/{currentGameWords.length} corrects — {wrongWords.length} mots à réviser
              </p>
              {wrongWords.length > 0 && (
                <div style={{
                  margin: '0 auto 24px',
                  maxWidth: 520,
                  textAlign: 'left',
                  background: '#f7f7f7',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '12px 16px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Mots à réviser:</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {wrongWords.map((w, idx) => (
                      <li key={`${w.french}-${idx}`}>
                        {w.english} → <strong>{w.french}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={() => {
                const newWords = shuffleWords(selectedCategory)
                setCurrentGameWords(newWords)
                setCurrentWordIndex(0)
                setUserAnswer('')
                setFeedback({ show: false, message: '', color: '' })
                setGameCompleted(false)
                setShowWrongBox(false)
                setLastWrongAnswer('')
                setIncorrectCount(0)
                setCorrectCount(0)
                setWrongWords([])
                setShowGrammarDropdown(false)
              }} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, border: "none", background: "#4CAF50", color: "white", cursor: "pointer", marginRight: "12px" }}>
                Recommencer
              </button>
              <button onClick={() => {
                setCurrentWordIndex(0)
                setUserAnswer('')
                setFeedback({ show: false, message: '', color: '' })
                setGameCompleted(false)
                setCurrentGameWords([])
                setSelectedCategory(null)
                setShowWrongBox(false)
                setLastWrongAnswer('')
                setIncorrectCount(0)
                setCorrectCount(0)
                setWrongWords([])
                setShowGrammarDropdown(false)
              }} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, border: "none", background: "#4CAF50", color: "white", cursor: "pointer" }}>
                Retour à la sélection
              </button>
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => {
            resetGame()
            setView('home')
          }} style={{ position: "absolute", left: 16 }}>← Retour</button>
          <h3 style={{ margin: 0 }}>Pratiquer les mots</h3>
        </div>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 400, height: 250, background: "#e8e8e8", borderRadius: 12, color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: 10, boxSizing: "border-box", position: "relative" }}>
            <div style={{ position: "absolute", top: 10, right: 10, fontSize: 14, color: "#666" }}>
              {currentWordIndex + 1}/{currentGameWords.length}
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, textAlign: "center", width: "100%" }}>
              <span style={{ fontSize: 18, lineHeight: 1.4, wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {selectedCategory === 'prepositions' || selectedCategory === 'demonstratifs' ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: 8, fontSize: 16 }}>{currentGameWords[currentWordIndex]?.french || ''}</div>
                    <div style={{ fontSize: 14, color: "#666", fontStyle: "italic" }}>Clue: {currentGameWords[currentWordIndex]?.clue || ''}</div>
                  </div>
                ) : (
                  currentGameWords[currentWordIndex]?.english || ''
                )}
              </span>
            </div>
            <input 
              type="text" 
              placeholder={selectedCategory === 'prepositions' ? "Tapez la préposition..." : selectedCategory === 'demonstratifs' ? "Tapez le démonstratif..." : "Traduisez en français..."} 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", background: "#c8c8c8", color: "#666" }} 
            />
            {feedback.show && (
              <div style={{ 
                position: "absolute",
                bottom: -50,
                left: "50%",
                transform: "translateX(-50%)",
                color: feedback.isCorrect ? "#4CAF50" : "#f44336",
                fontWeight: "bold",
                fontSize: 14,
                transition: "opacity 0.5s ease-in-out",
                minWidth: "300px",
                textAlign: "center"
              }}>
                {feedback.message}
              </div>
            )}
          </div>
          {showWrongBox && (
            <div style={{
              marginTop: 16,
              background: '#fff3f3',
              border: '1px solid #f44336',
              color: '#b71c1c',
              borderRadius: 8,
              padding: '12px 16px',
              width: 400,
              boxSizing: 'border-box',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 12 }}>
                {`"${lastWrongAnswer}", c'est faux! La bonne réponse est "${currentGameWords[currentWordIndex]?.answer || currentGameWords[currentWordIndex]?.french}".`}
              </div>
              <button onClick={() => {
                setShowWrongBox(false)
                if (currentWordIndex === currentGameWords.length - 1) {
                  setGameCompleted(true)
                } else {
                  setCurrentWordIndex(prev => prev + 1)
                }
              }} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer' }}>
                Suivant
              </button>
            </div>
          )}
        </div>
      </>
    )
  }

  if (view === 'verbes') {
    // If verbs category is selected and game not completed, show quiz UI (same as mots)
    if (selectedCategory !== null && currentGameWords.length > 0 && !gameCompleted) {
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => {
              setCurrentWordIndex(0)
              setUserAnswer('')
              setFeedback({ message: '', isCorrect: false, show: false })
              setGameCompleted(false)
              setShowWrongBox(false)
              setIncorrectCount(0)
              setCorrectCount(0)
              setWrongWords([])
              setSelectedCategory(null)
            }} style={{ position: "absolute", left: 16 }}>← Retour</button>
            <h3 style={{ margin: 0 }}>Pratiquer les verbes</h3>
            {selectedCategory === 'passeComposé' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px"}}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>Passé composé</div>
                      <div style={{ marginBottom: 12 }}>
                        Passé composé is used to describe completed actions or events that happened once in the past.
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>1.</strong> Auxiliary verb ("avoir" or "être") conjugated in the present tense
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>2.</strong> Past participle of the main verb
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>• er verbs → -é</div>
                        <div>• ir verbs → -i</div>
                        <div>• re verbs → -u</div>
                      </div>
                      <div style={{ marginBottom: 6 }}><strong>Irregular verbs when using "avoir" as auxiliary:</strong>
                        <div>avoir – eu – to have</div>
                        <div>être – été – to be</div>
                        <div>faire – fait – to do / make</div>
                        <div>mettre – mis – to put</div>
                        <div>prendre – pris – to take</div>
                        <div>dire – dit – to say</div>
                        <div>lire – lu – to read</div>
                        <div>écrire – écrit – to write</div>
                        <div>voir – vu – to see</div>
                        <div>boire – bu – to drink</div>
                        <div>savoir – su – to know (a fact)</div>
                        <div>connaître – connu – to know (a person/place)</div>
                        <div>vouloir – voulu – to want</div>
                        <div>pouvoir – pu – to be able to</div>
                        <div>devoir – dû – to have to / must</div>
                        <div>vivre – vécu – to live</div>
                        <div>ouvrir – ouvert – to open</div>
                        <div style={{ marginBottom: 12 }}>recevoir – reçu – to receive</div>
                        <div>Some verbs use "être", especially, for verbs of movement or change of state (Vandertramp). 
                        <strong> All reflexive verbs</strong> (se lever, se laver, se promener…) are constructed with être.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'futurProche' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>Futur proche</div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Use:</strong> To talk about actions that are going to happen soon (equivalent to "I'm going to [verb]").
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Structure:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>👉 pronoun + aller (present) + infinitive verb</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Steps:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>1. Conjugate aller (to go) in the present tense</div>
                        <div>2. Add the infinitive of the main verb (the action)</div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Aller – to go:</strong>
                        <div>je vais</div>
                        <div>tu vas</div>
                        <div>il/elle/on va</div>
                        <div>nous allons</div>
                        <div>vous allez</div>
                        <div>ils/elles vont</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'futurSimple' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>Futur simple</div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Use:</strong> To express actions that will happen in the future ("I will [verb]").
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Structure:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>👉 infinitive / modified stem + future endings</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Future endings:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>Je → -ai</div>
                        <div>Tu → -as</div>
                        <div>Il/Elle/On → -a</div>
                        <div>Nous → -ons</div>
                        <div>Vous → -ez</div>
                        <div>Ils/Elles → -ont</div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>📝 Pronunciation tip:</strong>
                        <div>⚠ Do not pronounce three syllables in futur simple — only two.</div>
                        <div>e.g. préparerai → prépare-rai ✅ (not prépare-re-ai ❌)</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>📌 Regular Verbs</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>1️⃣ –ER verbs</strong></div>
                        <div>→ infinitive + endings</div>
                        <div>Ex: parler → je parlerai (I will speak)</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>2️⃣ –IR verbs</strong></div>
                        <div>→ infinitive + endings</div>
                        <div>Ex: finir → je finirai (I will finish)</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div><strong>3️⃣ –RE verbs</strong></div>
                        <div>→ remove final -e, then add endings</div>
                        <div>Ex: vendre → je vendrai (I will sell)</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>📌 Irregular Future Stems</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div>Some verbs have irregular stems but take the same endings:</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 4 }}>
                        <div><strong>Verb</strong>  <strong>Stem</strong>  <strong>Example (je)</strong></div>
                        <div>aller  ir-  j'irai</div>
                        <div>avoir  aur-  j'aurai</div>
                        <div>être  ser-  je serai</div>
                        <div>faire  fer-  je ferai</div>
                        <div>pouvoir  pourr-  je pourrai</div>
                        <div>savoir  saur-  je saurai</div>
                        <div>venir  viendr-  je viendrai</div>
                        <div>voir  verr-  je verrai</div>
                        <div>vouloir  voudr-  je voudrai</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'imparfait' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>L'imparfait</div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Use:</strong> To describe background actions, ongoing past actions, habits, or states in the past.
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>👉 English equivalents:</strong> I was doing, I used to do, It was...
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>Main Uses:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>🕰 Ongoing actions in the past</strong> → Je lisais un livre (I was reading a book)</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>🔁 Habitual / repeated actions</strong> → On allait à la plage chaque été (We used to go to the beach every summer)</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div><strong>🌦 Descriptions / background</strong> → Il faisait beau (The weather was nice)</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>📌 Formation</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>1️⃣</strong> Take nous form of the verb in present tense</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>2️⃣</strong> Remove -ons</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div><strong>3️⃣</strong> Add imparfait endings:</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div><strong>Subject</strong>  <strong>Ending</strong>  <strong>Example (parler)</strong></div>
                        <div>je  -ais  je parlais</div>
                        <div>tu  -ais  tu parlais</div>
                        <div>il/elle/on  -ait  il parlait</div>
                        <div>nous  -ions  nous parlions</div>
                        <div>vous  -iez  vous parliez</div>
                        <div>ils/elles  -aient  ils parlaient</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>📌 Irregular Verb: Être</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8 }}>
                        <div>The only irregular verb in imparfait is être:</div>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>j'étais</div>
                        <div>tu étais</div>
                        <div>il/elle/on était</div>
                        <div>nous étions</div>
                        <div>vous étiez</div>
                        <div>ils/elles étaient</div>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>💡 Tip:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 4 }}>
                        <div>L'imparfait is often used for setting the scene, background info, or describing states. It pairs often with passé composé, which expresses punctual actions.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'vandertramp' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 8 }}>Dr. & Mrs. Vandertramp</div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Most verbs in passé composé use avoir</strong> → J'ai mangé (I ate)
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <strong>Vandertramp verbs use être</strong> → Je suis allé(e) (I went)
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <strong>With être, the past participle agrees in gender and number with the subject:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 4 }}>
                        <div>Je suis allé ✅ (masculine)</div>
                        <div>Je suis allée ✅ (feminine)</div>
                        <div>Nous sommes allés ✅ (masculine/mixed plural)</div>
                        <div>Nous sommes allées ✅ (feminine plural)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'present' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>📌 🇫🇷 Present Tense — Regular Verb Endings</div>
                      
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontWeight: "bold", marginBottom: 8, color: "#E91E63" }}>-ER verbs</div>
                        <div style={{ marginLeft: 16, marginBottom: 8 }}>
                          <div>je → -e</div>
                          <div>tu → -es</div>
                          <div>il/elle/on → -e</div>
                          <div>nous → -ons</div>
                          <div>vous → -ez</div>
                          <div>ils/elles → -ent</div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontWeight: "bold", marginBottom: 8, color: "#2196F3" }}>-IR verbs</div>
                        <div style={{ marginLeft: 16, marginBottom: 8 }}>
                          <div>je → -is</div>
                          <div>tu → -is</div>
                          <div>il/elle/on → -it</div>
                          <div>nous → -issons</div>
                          <div>vous → -issez</div>
                          <div>ils/elles → -issent</div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontWeight: "bold", marginBottom: 8, color: "#4CAF50" }}>-RE verbs</div>
                        <div style={{ marginLeft: 16, marginBottom: 8 }}>
                          <div>je → -s</div>
                          <div>tu → -s</div>
                          <div>il/elle/on → ∅</div>
                          <div>nous → -ons</div>
                          <div>vous → -ez</div>
                          <div>ils/elles → -ent</div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>📌 Irregular Verbs — Quick List</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                        <div>être • avoir • aller • faire • venir • pouvoir</div>
                        <div>vouloir • savoir • voir • dire • prendre • mettre</div>
                        <div>comprendre • boire • connaître • écrire • lire</div>
                        <div>suivre • tenir • recevoir • falloir</div>
                      </div>
                      
                      <div style={{ marginBottom: 8, padding: "8px", background: "#fff3e0", borderRadius: 4, border: "1px solid #ffcc02" }}>
                        <div style={{ fontWeight: "bold", marginBottom: 4, fontSize: 13 }}>💡 Special Note: Falloir</div>
                        <div style={{ fontSize: 12, lineHeight: 1.4 }}>
                          <strong>Falloir</strong> – To be necessary. This is only used in third person singular to describe something that is necessary to do.
                        </div>
                        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                          Example: Il faut étudier (It's necessary to study)
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'pronominaux' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>🔄 Reflexive Verbs (Verbes Pronominaux)</div>
                      
                      <div style={{ marginBottom: 12 }}>
                        <strong>Definition:</strong> Verbs where the subject and object are the same person (action performed on oneself).
                      </div>
                      
                      <div style={{ marginBottom: 12 }}>
                        <strong>Note:</strong> Some verbs use reflexive pronouns but aren't truly reflexive (e.g., "Il m'appelle" = "He calls me").
                      </div>
                      
                      <div style={{ marginBottom: 12 }}>
                        <strong>Reflexive Pronouns:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12 }}>
                        <div>Je → <strong>me</strong></div>
                        <div>Tu → <strong>te</strong></div>
                        <div>Il/Elle → <strong>se</strong></div>
                        <div>Nous → <strong>nous</strong></div>
                        <div>Vous → <strong>vous</strong></div>
                        <div>Ils/Elles → <strong>se</strong></div>
                      </div>
                      
                      <div style={{ marginBottom: 12 }}>
                        <strong>Infinitive Form:</strong> se + [infinitive verb]
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 12, fontSize: 13, color: "#666" }}>
                        Example: se laver (to wash oneself)
                      </div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>Conjugation:</strong> Same as present tense + reflexive pronoun
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 4, fontSize: 13 }}>
                        <div>Je me lave (I wash myself)</div>
                        <div>Tu te laves (You wash yourself)</div>
                        <div>Il se lave (He washes himself)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedCategory === 'imperatif' && (
              <div style={{ position: "absolute", right: 16, top: 20 }}>
                <button 
                  onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                  style={{ 
                    padding: "8px 12px", 
                    fontSize: 14, 
                    borderRadius: 6, 
                    border: "1px solid #ccc", 
                    background: "#f5f5f5", 
                    cursor: "pointer",
                    color: "#333"
                  }}
                >
                  📚 Grammar
                </button>
                {showGrammarDropdown && (
                  <div style={{
                    position: "absolute",
                    top: 40,
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "300px",
                    maxWidth: "400px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    zIndex: 1000
                  }}>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>⚡ L'Impératif</div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>📝 Three Forms (no subject pronouns):</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                        <div><strong>Tu</strong> - informal singular (Parle!)</div>
                        <div><strong>Nous</strong> - inclusive "let's" (Parlons!)</div>
                        <div><strong>Vous</strong> - formal/plural (Parlez!)</div>
                      </div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>🔧 Irregular Verbs:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                        <div><strong>Être:</strong> Sois! / Soyons! / Soyez!</div>
                        <div><strong>Avoir:</strong> Aie! / Ayons! / Ayez!</div>
                        <div><strong>Savoir:</strong> Sache! / Sachons! / Sachez!</div>
                        <div><strong>Aller:</strong> Va! / Allons! / Allez!</div>
                        <div><strong>Vouloir:</strong> Veuillez! (please)</div>
                      </div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>📍 Object Pronouns:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                        <div><strong>Affirmative:</strong> After verb with hyphen</div>
                        <div>Donne-moi! / Montrez-nous!</div>
                        <div><strong>Negative:</strong> Before verb</div>
                        <div>Ne me parle pas!</div>
                      </div>
                      
                      <div style={{ marginBottom: 8 }}>
                        <strong>🔗 Special Rules:</strong>
                      </div>
                      <div style={{ marginLeft: 16, marginBottom: 4, fontSize: 13 }}>
                        <div>• Add <strong>s</strong> before en/y: Parles-en!</div>
                        <div>• Reflexive: Lève-toi! (not me/te)</div>
                        <div>• Negative reflexive: Ne te lève pas!</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: 400, height: 250, background: "#e8e8e8", borderRadius: 12, color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: 10, boxSizing: "border-box", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, right: 10, fontSize: 14, color: "#666" }}>
                {currentWordIndex + 1}/{currentGameWords.length}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, textAlign: "center", width: "100%" }}>
                <span style={{ fontSize: 18, lineHeight: 1.4, wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {selectedCategory === 'prepositions' || selectedCategory === 'demonstratifs' ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: 8, fontSize: 16 }}>{currentGameWords[currentWordIndex]?.french || ''}</div>
                    <div style={{ fontSize: 14, color: "#666", fontStyle: "italic" }}>Clue: {currentGameWords[currentWordIndex]?.clue || ''}</div>
                  </div>
                ) : (
                  currentGameWords[currentWordIndex]?.english || ''
                )}
              </span>
              </div>
              <input 
                type="text" 
                placeholder={selectedCategory === 'prepositions' ? "Tapez la préposition..." : selectedCategory === 'demonstratifs' ? "Tapez le démonstratif..." : "Traduisez en français..."} 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", background: "#c8c8c8", color: "#666" }} 
              />
              {feedback.show && (
                <div style={{ 
                  position: "absolute",
                  bottom: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: feedback.isCorrect ? "#4CAF50" : "#f44336",
                  fontWeight: "bold",
                  fontSize: 14,
                  transition: "opacity 0.5s ease-in-out",
                  minWidth: "300px",
                  textAlign: "center"
                }}>
                  {feedback.message}
                </div>
              )}
            </div>
            {showWrongBox && (
              <div style={{
                marginTop: 16,
                background: '#fff3f3',
                border: '1px solid #f44336',
                color: '#b71c1c',
                borderRadius: 8,
                padding: '12px 16px',
                width: 400,
                boxSizing: 'border-box',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: 12 }}>
                  {`"${lastWrongAnswer}", c'est faux! La bonne réponse est "${currentGameWords[currentWordIndex]?.answer || currentGameWords[currentWordIndex]?.french}".`}
                </div>
                <button onClick={() => {
                  setShowWrongBox(false)
                  if (currentWordIndex === currentGameWords.length - 1) {
                    setGameCompleted(true)
                  } else {
                    setCurrentWordIndex(prev => prev + 1)
                  }
                }} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer' }}>
                  Suivant
                </button>
              </div>
            )}
          </div>
        </>
      )
    }

    // If game completed in verbs, show summary similar to mots
    if (gameCompleted) {
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h3 style={{ margin: 0 }}>Pratiquer les verbes</h3>
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 20 }}>
              <h2 style={{ color: "#4CAF50", marginBottom: 20 }}>Félicitations! 🎉</h2>
              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Score: {currentGameWords.length - wrongWords.length}/{currentGameWords.length} corrects — {wrongWords.length} mots à réviser
              </p>
              {wrongWords.length > 0 && (
                <div style={{
                  margin: '0 auto 24px',
                  maxWidth: 520,
                  textAlign: 'left',
                  background: '#f7f7f7',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '12px 16px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Verbes à réviser:</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {wrongWords.map((w, idx) => (
                      <li key={`${w.french}-${idx}`}>
                        {w.english} → <strong>{w.french}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={() => {
                // Restart verbs selection
                setCurrentWordIndex(0)
                setUserAnswer('')
                setFeedback({ message: '', isCorrect: false, show: false })
                setGameCompleted(false)
                setShowWrongBox(false)
                setIncorrectCount(0)
                setCorrectCount(0)
                setWrongWords([])
                setSelectedCategory(null)
              }} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, border: "none", background: "#4CAF50", color: "white", cursor: "pointer" }}>
                Retour à la sélection
              </button>
            </div>
          </div>
        </>
      )
    }

    // Else show verbs category selection grid
    return (
      <>
        <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setView('home')} style={{ position: "absolute", left: 16 }}>← Retour</button>
          <h3 style={{ margin: 0 }}>Pratiquer les verbes</h3>
        </div>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={{ textAlign: "center", padding: 20, width: "100%", maxWidth: 900 }}>
            <h2 style={{ marginBottom: 24, color: "#333" }}>Quelle catégorie ?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, width: "100%" }}>
              <button onClick={() => startGame('verbes')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#4CAF50", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#43A047"} onMouseOut={(e) => e.target.style.background = "#4CAF50"}>Les verbes les plus courants</button>
              <button onClick={() => startGame('vandertramp')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#2196F3", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#1E88E5"} onMouseOut={(e) => e.target.style.background = "#2196F3"}>Dr. & Mrs. Vandertramp</button>
              <button onClick={() => startGame('passeComposé')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#009688", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#00897B"} onMouseOut={(e) => e.target.style.background = "#009688"}>Passé composé</button>
              <button onClick={() => startGame('imparfait')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#795548", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#6D4C41"} onMouseOut={(e) => e.target.style.background = "#795548"}>Imparfait</button>
              <button onClick={() => startGame('futurSimple')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#3F51B5", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#3949AB"} onMouseOut={(e) => e.target.style.background = "#3F51B5"}>Futur Simple</button>
              <button onClick={() => startGame('futurProche')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#9C27B0", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#8E24AA"} onMouseOut={(e) => e.target.style.background = "#9C27B0"}>Futur Proche</button>
              <button onClick={() => startGame('present')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#FF5722", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#E64A19"} onMouseOut={(e) => e.target.style.background = "#FF5722"}>Present</button>
              <button onClick={() => startGame('pronominaux')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#8D6E63", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#795548"} onMouseOut={(e) => e.target.style.background = "#8D6E63"}>Les verbes pronominaux</button>
              <button onClick={() => startGame('imperatif')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#4CAF50", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#45A049"} onMouseOut={(e) => e.target.style.background = "#4CAF50"}>L'impératif</button>
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", width: "100%" }}>
              <button onClick={() => startGame('mixVerbes')} style={{ padding: "16px 32px", fontSize: 18, borderRadius: 12, border: "none", background: "#FF9800", color: "white", cursor: "pointer", transition: "background-color 0.2s", minWidth: 220 }} onMouseOver={(e) => e.target.style.background = "#F57C00"} onMouseOut={(e) => e.target.style.background = "#FF9800"}>Un mélange de verbes</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (view === 'grammaire') {
    // If grammar category is selected and game not completed, show quiz UI (same as mots and verbes)
    if (selectedCategory !== null && currentGameWords.length > 0 && !gameCompleted) {
      const current = currentGameWords[currentWordIndex] || {};
      const needsFrenchFormat = ['prepositions', 'demonstratifs', 'pronoms', 'adjectifs'].includes(selectedCategory) || (selectedCategory === 'mixGrammaire' && !current.english);
             
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => {
              setCurrentWordIndex(0)
              setUserAnswer('')
              setFeedback({ show: false, message: '', color: '' })
              setGameCompleted(false)
              setCurrentGameWords([])
              setSelectedCategory(null)
              setShowWrongBox(false)
              setLastWrongAnswer('')
              setIncorrectCount(0)
              setCorrectCount(0)
              setWrongWords([])
              setShowGrammarDropdown(false)
            }} style={{ position: "absolute", left: 16 }}>← Retour</button>
            <h3 style={{ margin: 0 }}>Pratiquer la grammaire</h3>
            {selectedCategory === 'articles' && (
            <div style={{ position: "absolute", right: 16, top: 20 }}>
              <button 
                onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                style={{ 
                  padding: "8px 12px", 
                  fontSize: 14, 
                  borderRadius: 6, 
                  border: "1px solid #ccc", 
                  background: "#f5f5f5", 
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                📚 Grammar
              </button>
              {showGrammarDropdown && (
                <div style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "300px",
                  maxWidth: "400px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  zIndex: 1000
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>📝 📌 French Articles — Mini Cheat Sheet</div>
                    
                    <div style={{ marginBottom: 16, border: "1px solid #ddd", borderRadius: 6, overflow: "hidden" }}>
                      <div style={{ background: "#f5f5f5", padding: "8px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1.5fr", gap: "8px" }}>
                          <div>Type</div>
                          <div>Masculine</div>
                          <div>Feminine</div>
                          <div>Vowel</div>
                          <div>Plural</div>
                          <div>Meaning</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1.5fr", gap: "8px" }}>
                          <div><strong>Definite</strong></div>
                          <div>le</div>
                          <div>la</div>
                          <div>l'</div>
                          <div>les</div>
                          <div>the (specific)</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1.5fr", gap: "8px" }}>
                          <div><strong>Indefinite</strong></div>
                          <div>un</div>
                          <div>une</div>
                          <div>—</div>
                          <div>des</div>
                          <div>a/an/some</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1.5fr", gap: "8px" }}>
                          <div><strong>Partitive</strong></div>
                          <div>du</div>
                          <div>de la</div>
                          <div>de l'</div>
                          <div>des</div>
                          <div>some/any (mass)</div>
                        </div>
                      </div>
                      <div style={{ padding: "8px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1.5fr", gap: "8px" }}>
                          <div><strong>Negative</strong></div>
                          <div>de</div>
                          <div>de</div>
                          <div>d'</div>
                          <div>de</div>
                          <div>no/any (after "ne...pas")</div>
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>⚡ Quick Rules:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 4 }}>
                      <div style={{ marginBottom: 6 }}>✅ <strong>le/la/les</strong> → specific things (J'aime le pain)</div>
                      <div style={{ marginBottom: 6 }}>✅ <strong>un/une/des</strong> → countable items (J'ai une pomme)</div>
                      <div style={{ marginBottom: 6 }}>✅ <strong>du/de la/des</strong> → unspecified amounts (Je prends du pain)</div>
                      <div style={{ marginBottom: 12 }}>✅ <strong>de/d'</strong> → after negation (Je ne prends pas de pain). This is true for indefinite and partitive articles, always.</div>
                    </div>
                    
                    <div style={{ marginBottom: 8, padding: "8px", background: "#f0f8ff", borderRadius: 4, border: "1px solid #b3d9ff" }}>
                      <div style={{ fontWeight: "bold", marginBottom: 4 }}>🧠 Special Rule: Verbs of Liking</div>
                      <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                        With verbs like <strong>aimer, adorer, préférer, détester</strong> → always use <strong>le/la/les</strong> (definite article) because you're talking about the whole category, not a quantity.
                      </div>
                      <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                        Examples: J'aime le chocolat, Elle adore la musique, Nous préférons les films
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedCategory === 'prepositions' && (
            <div style={{ position: "absolute", right: 16, top: 20 }}>
              <button 
                onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                style={{ 
                  padding: "8px 12px", 
                  fontSize: 14, 
                  borderRadius: 6, 
                  border: "1px solid #ccc", 
                  background: "#f5f5f5", 
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                📚 Grammar
              </button>
              {showGrammarDropdown && (
                <div style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "300px",
                  maxWidth: "400px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  zIndex: 1000
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>📍 French Prepositions</div>
                    
                    <div style={{ marginBottom: 12 }}>
                      <strong>🔗 Article Contractions:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8 }}>
                      <div><strong>à + le = au</strong> (Je vais au cinéma)</div>
                      <div><strong>à + les = aux</strong> (Je vais aux étudiants)</div>
                      <div><strong>à + la = à la</strong> (Je vais à la cuisine)</div>
                      <div><strong>à + l' = à l'</strong> (Je vais à l'école)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>📍 Place:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div>à (at/in/to) • dans (in/inside) • sous (under) • sur (on)</div>
                      <div>devant (in front) • derrière (behind) • entre (between)</div>
                      <div>chez (at someone's house) • vers (towards)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>⏰ Time:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div>à (at time) • en (in duration) • depuis (since/for)</div>
                      <div>pendant (during) • dans (in future) • avant/après (before/after)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>🕐 Time Expressions:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>il y a</strong> - moment du passé (Je suis arrivé il y a six mois)</div>
                      <div><strong>dans</strong> - moment du futur (Je partirai dans deux ans)</div>
                      <div><strong>depuis</strong> - durée continue (Je vis à Rome depuis deux ans)</div>
                      <div><strong>pour</strong> - durée prévue (Je suis à Paris pour deux ans)</div>
                      <div><strong>pendant</strong> - durée finie (Il a plu pendant huit jours)</div>
                      <div><strong>en</strong> - quantité de temps (J'ai fait ça en une heure)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>🎯 Purpose/Cause:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div>pour (for) • à cause de (because of - negative)</div>
                      <div>grâce à (thanks to - positive) • par (by)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>🚗 Means/Transport:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div>en (by transport) • par (by communication)</div>
                      <div>avec (with)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>🌍 Countries:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>en</strong> - feminine countries (en Italie, en Chine)</div>
                      <div><strong>au</strong> - masculine countries (au Canada, au Japon)</div>
                      <div><strong>aux</strong> - plural countries (aux États-Unis)</div>
                      <div><strong>en</strong> - masculine starting with vowel (en Iran)</div>
                      <div style={{ marginTop: 4, fontSize: 12, color: "#666" }}>
                        Same for "going TO" and "being IN" the country. For cities, always use <strong>à</strong> (à Paris, à Londres)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedCategory === 'demonstratifs' && (
            <div style={{ position: "absolute", right: 16, top: 20 }}>
              <button 
                onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                style={{ 
                  padding: "8px 12px", 
                  fontSize: 14, 
                  borderRadius: 6, 
                  border: "1px solid #ccc", 
                  background: "#f5f5f5", 
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                📚 Grammar
              </button>
              {showGrammarDropdown && (
                <div style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "300px",
                  maxWidth: "400px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  zIndex: 1000
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>🔍 French Demonstratives</div>
                    
                    <div style={{ marginBottom: 12 }}>
                      <strong>📝 Ce(t)/Cette/Ces — "this/that/these/those":</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>ce</strong> - this/that + masculine noun</div>
                      <div><strong>cet</strong> - this/that + masculine noun (before vowel)</div>
                      <div><strong>cette</strong> - this/that + feminine noun</div>
                      <div><strong>ces</strong> - these/those + plural noun</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>👤 Celui/Celle/Ceux/Celles — "the one(s)":</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>celui</strong> - the one (masc. sing.)</div>
                      <div><strong>celle</strong> - the one (fem. sing.)</div>
                      <div><strong>ceux</strong> - the ones (masc. plural)</div>
                      <div><strong>celles</strong> - the ones (fem. plural)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>📍 This/That + One:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>celui-ci/celui-là</strong> - this/that one (masc.)</div>
                      <div><strong>celle-ci/celle-là</strong> - this/that one (fem.)</div>
                      <div><strong>ceux-ci/ceux-là</strong> - these/those ones (masc. plural)</div>
                      <div><strong>celles-ci/celles-là</strong> - these/those ones (fem. plural)</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>❓ Which One(s):</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 4, fontSize: 13 }}>
                      <div><strong>lequel</strong> - which one (masc. sing.)</div>
                      <div><strong>laquelle</strong> - which one (fem. sing.)</div>
                      <div><strong>lesquels</strong> - which ones (masc. plural)</div>
                      <div><strong>lesquelles</strong> - which ones (fem. plural)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedCategory === 'pronoms' && (
            <div style={{ position: "absolute", right: 16, top: 20 }}>
              <button 
                onClick={() => setShowGrammarDropdown(!showGrammarDropdown)}
                style={{ 
                  padding: "8px 12px", 
                  fontSize: 14, 
                  borderRadius: 6, 
                  border: "1px solid #ccc", 
                  background: "#f5f5f5", 
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                📚 Grammar
              </button>
              {showGrammarDropdown && (
                <div style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "300px",
                  maxWidth: "400px",
                  maxHeight: "70vh",
                  overflowY: "auto",
                  zIndex: 1000
                }}>
                  <div style={{ fontSize: 14, lineHeight: 1.5, color: "#333", paddingBottom: "20px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 16 }}>🎯 Les Pronoms Compléments</div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>📍 Direct Object Pronouns:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>me, te, le, la, nous, vous, les</strong></div>
                      <div>Replace nouns that directly receive the action</div>
                      <div>Je vois Marie → Je <strong>la</strong> vois</div>
                      <div>Il mange la pomme → Il <strong>la</strong> mange</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>📍 Indirect Object Pronouns:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div><strong>me, te, lui, nous, vous, leur</strong></div>
                      <div>Replace nouns after "à" (usually people)</div>
                      <div>Je parle à Luc → Je <strong>lui</strong> parle</div>
                      <div>Elle téléphone à ses parents → Elle <strong>leur</strong> téléphone</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>🚫 Negative Sentences:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
                      <div>Pronouns go before the verb</div>
                      <div>Je ne <strong>le</strong> regarde pas</div>
                      <div>Tu ne <strong>lui</strong> parles pas</div>
                    </div>
                    
                    <div style={{ marginBottom: 8 }}>
                      <strong>💡 Key Rules:</strong>
                    </div>
                    <div style={{ marginLeft: 16, marginBottom: 4, fontSize: 13 }}>
                      <div>• Direct: no preposition between verb and object</div>
                      <div>• Indirect: replaces "à + person"</div>
                      <div>• <strong>Leur</strong> can mean "their" (leur loyer)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: 400, height: 250, background: "#e8e8e8", borderRadius: 12, color: "#333", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: 10, boxSizing: "border-box", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, right: 10, fontSize: 14, color: "#666" }}>
                {currentWordIndex + 1}/{currentGameWords.length}
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 10, textAlign: "center", width: "100%" }}>
              <span style={{ fontSize: 18, lineHeight: 1.4, wordBreak: "break-word", overflowWrap: "break-word", maxWidth: "100%" }}>
                {needsFrenchFormat ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: 8, fontSize: 16 }}>{current.french || ''}</div>
                    <div style={{ fontSize: 14, color: "#666", fontStyle: "italic" }}>
                      Clue: {current.clue || ''}
                    </div>
                  </div>
                ) : (
                  current.english || ''
                )}
              </span>
              </div>
              <input 
                type="text" 
                placeholder={
                  needsFrenchFormat
                    ? "Tapez la réponse en français..."
                    : "Traduisez en français..."
                }
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc", background: "#c8c8c8", color: "#666" }} 
              />
            </div>
            {feedback.show && (
              <div style={{ 
                position: "absolute",
                bottom: -50,
                left: "50%",
                transform: "translateX(-50%)",
                color: feedback.isCorrect ? "#4CAF50" : "#f44336",
                fontWeight: "bold",
                fontSize: 14,
                transition: "opacity 0.5s ease-in-out",
                minWidth: "300px",
                textAlign: "center"
              }}>
                {feedback.message}
              </div>
            )}
            {showWrongBox && (
            <div style={{
              marginTop: 16,
              background: '#fff3f3',
              border: '1px solid #f44336',
              color: '#b71c1c',
              borderRadius: 8,
              padding: '12px 16px',
              width: 400,
              boxSizing: 'border-box',
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 12 }}>
                {`"${lastWrongAnswer}", c'est faux! La bonne réponse est "${currentGameWords[currentWordIndex]?.answer || currentGameWords[currentWordIndex]?.french}".`}
              </div>
              <button onClick={() => {
                setShowWrongBox(false)
                if (currentWordIndex === currentGameWords.length - 1) {
                  setGameCompleted(true)
                } else {
                  setCurrentWordIndex(prev => prev + 1)
                }
              }} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer' }}>
                Suivant
              </button>
            </div>
          )}
          </div>
        </>
      )
    }

    // Grammar completion screen
    if (selectedCategory !== null && gameCompleted) {
      return (
        <>
          <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h3 style={{ margin: 0 }}>Pratiquer la grammaire</h3>
          </div>
          <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: 20 }}>
              <h2 style={{ color: "#4CAF50", marginBottom: 20 }}>Félicitations! 🎉</h2>
              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Score: {currentGameWords.length - wrongWords.length}/{currentGameWords.length} corrects — {wrongWords.length} mots à réviser
              </p>
              {wrongWords.length > 0 && (
                <div style={{
                  margin: '0 auto 24px',
                  maxWidth: 520,
                  textAlign: 'left',
                  background: '#f7f7f7',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: 16
                }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#f44336' }}>Mots à réviser :</h4>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {wrongWords.map((word, index) => (
                      <li key={index} style={{ marginBottom: 4, fontSize: 14 }}>
                        <strong>{word.french}</strong> → {word.english}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={() => {
                const newWords = shuffleWords(selectedCategory)
                setCurrentGameWords(newWords)
                setCurrentWordIndex(0)
                setUserAnswer('')
                setFeedback({ show: false, message: '', color: '' })
                setGameCompleted(false)
                setShowWrongBox(false)
                setLastWrongAnswer('')
                setIncorrectCount(0)
                setCorrectCount(0)
                setWrongWords([])
                setShowGrammarDropdown(false)
              }} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, border: "none", background: "#4CAF50", color: "white", cursor: "pointer", marginRight: "12px" }}>
                Recommencer
              </button>
              <button onClick={() => {
                setCurrentWordIndex(0)
                setUserAnswer('')
                setFeedback({ show: false, message: '', color: '' })
                setGameCompleted(false)
                setCurrentGameWords([])
                setSelectedCategory(null)
                setShowWrongBox(false)
                setLastWrongAnswer('')
                setIncorrectCount(0)
                setCorrectCount(0)
                setWrongWords([])
                setShowGrammarDropdown(false)
              }} style={{ padding: "12px 24px", fontSize: 16, borderRadius: 8, border: "none", background: "#4CAF50", color: "white", cursor: "pointer" }}>
                Retour à la sélection
              </button>
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        <div style={{ fontFamily: "system-ui, sans-serif", position: "fixed", top: 0, left: 0, right: 0, padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setView('home')} style={{ position: "absolute", left: 16 }}>← Retour</button>
          <h3 style={{ margin: 0 }}>Pratiquer la grammaire</h3>
        </div>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={{ textAlign: "center", padding: 20, width: "100%", maxWidth: 900 }}>
            <h2 style={{ marginBottom: 24, color: "#333" }}>Quelle catégorie ?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, width: "100%" }}>
              <button onClick={() => startGame('articles')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#E65100", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#D84315"} onMouseOut={(e) => e.target.style.background = "#E65100"}>Les articles</button>
              <button onClick={() => startGame('prepositions')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#607D8B", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#546E7A"} onMouseOut={(e) => e.target.style.background = "#607D8B"}>Les prépositions</button>
              <button onClick={() => startGame('demonstratifs')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#9C27B0", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#8E24AA"} onMouseOut={(e) => e.target.style.background = "#9C27B0"}>Les démonstratifs</button>
              <button onClick={() => startGame('pronoms')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#795548", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#6D4C41"} onMouseOut={(e) => e.target.style.background = "#795548"}>Les Pronoms Compléments</button>
              <button onClick={() => startGame('adjectifs')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#8B0000", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#5A0000"} onMouseOut={(e) => e.target.style.background = "#8B0000"}>Les adjectifs</button>
              <button onClick={() => startGame('adverbes')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#2E7D32", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#1B5E20"} onMouseOut={(e) => e.target.style.background = "#2E7D32"}>Les adverbes</button>
              <button onClick={() => startGame('comparisonnegation')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#E91E63", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#C2185B"} onMouseOut={(e) => e.target.style.background = "#E91E63"}>Les comparaisons et négations</button>
              <button onClick={() => startGame('eny')} style={{ padding: "16px 24px", fontSize: 18, borderRadius: 12, border: "none", background: "#0D47A1", color: "white", cursor: "pointer", transition: "background-color 0.2s" }} onMouseOver={(e) => e.target.style.background = "#082F6B"} onMouseOut={(e) => e.target.style.background = "#0D47A1"}>Les pronoms 'en' et 'y'</button>
              
            </div>
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center", width: "100%" }}>
              <button onClick={() => startGame('mixGrammaire')} style={{ padding: "16px 32px", fontSize: 18, borderRadius: 12, border: "none", background: "#FF9800", color: "white", cursor: "pointer", transition: "background-color 0.2s", minWidth: 220 }} onMouseOver={(e) => e.target.style.background = "#F57C00"} onMouseOut={(e) => e.target.style.background = "#FF9800"}>Un mélange de grammaire</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (view === 'home') {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", marginTop: "40px" }}>
        <h1>Salut 👋</h1>
        <p>Bienvenue à mon appli pour pratiquer le français!</p>
        <div style={{ display: "inline-flex", gap: "12px", marginTop: "20px" }}>
          <button onClick={() => setView('mots')}>Pratiquer les mots</button>
          <button onClick={() => setView('verbes')}>Pratiquer les verbes</button>
          <button onClick={() => setView('grammaire')}>Pratiquer la grammaire</button>
        </div>
      </div>
    )
  }
}


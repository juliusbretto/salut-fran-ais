// pages/Mots.jsx
import TopBar from '../components/TopBar'
import QuizCard from '../components/QuizCard'
import WrongBox from '../components/WrongBox'
import useQuizGame from '../hooks/useQuizGame'

export default function Mots({ goHome }) {
  const {
    selectedCategory,
    currentGameWords,
    currentWordIndex,
    userAnswer,
    feedback,
    gameCompleted,
    showWrongBox,
    lastWrongAnswer,
    wrongWords,
    correctCount,
    incorrectCount,
    setUserAnswer,
    setShowWrongBox,
    startGame,
    resetAll,
    checkAnswer,
    nextOrFinish
  } = useQuizGame()

  // ------ Selection View ------
  if (!selectedCategory && !gameCompleted) {
    return (
      <>
        <TopBar title="Pratiquer les mots" onBack={goHome} />
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div style={{ textAlign: 'center', padding: 20, width: '100%', maxWidth: 900 }}>
            <h2 style={{ marginBottom: 24, color: '#333' }}>Quelle catégorie ?</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 16,
                width: '100%'
              }}
            >
              <button
                onClick={() => startGame('animals')}
                style={btnStyle('#4CAF50', '#43A047')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#43A047')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#4CAF50')}
              >
                Les animaux
              </button>

              <button
                onClick={() => startGame('corps')}
                style={btnStyle('#2196F3', '#1E88E5')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1E88E5')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#2196F3')}
              >
                Les parties du corps
              </button>

              <button
                onClick={() => startGame('nourriture')}
                style={btnStyle('#FFDE21', '#E6C800', true)}
                onMouseOver={(e) => (e.currentTarget.style.background = '#E6C800')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#FFDE21')}
              >
                Le nourriture
              </button>

              <button
                onClick={() => startGame('habillement')}
                style={btnStyle('#9C27B0', '#8E24AA')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#8E24AA')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#9C27B0')}
              >
                L&apos;habillement
              </button>

              <button
                onClick={() => startGame('famille')}
                style={btnStyle('#009688', '#00897B')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#00897B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#009688')}
              >
                La famille
              </button>

              <button
                onClick={() => startGame('materiaux')}
                style={btnStyle('#795548', '#6D4C41')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#6D4C41')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#795548')}
              >
                Les matériaux
              </button>

              <button
                onClick={() => startGame('temps')}
                style={btnStyle('#3F51B5', '#3949AB')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#3949AB')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#3F51B5')}
              >
                Le temps ⏰
              </button>

              <button
                onClick={() => startGame('transport')}
                style={btnStyle('#00BCD4', '#00ACC1')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#00ACC1')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#00BCD4')}
              >
                Le transport
              </button>

              <button
                onClick={() => startGame('sport')}
                style={btnStyle('#E91E63', '#C2185B')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#C2185B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#E91E63')}
              >
                Le sport
              </button>

              <button
                onClick={() => startGame('nature')}
                style={btnStyle('#8BC34A', '#7CB342')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#7CB342')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#8BC34A')}
              >
                La nature
              </button>

              <button
                onClick={() => startGame('weather')}
                style={btnStyle('#607D8B', '#546E7A')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#546E7A')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#607D8B')}
              >
                Le temps 🌦️
              </button>

              <button
                onClick={() => startGame('metiers')}
                style={btnStyle('#673AB7', '#5E35B1')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#5E35B1')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#673AB7')}
              >
                Les métiers
              </button>

              <button
                onClick={() => startGame('couleurs')}
                style={btnStyle('#FF5722', '#E64A19')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#E64A19')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#FF5722')}
              >
                Les couleurs
              </button>
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                onClick={() => startGame('mix')}
                style={{
                  padding: '16px 32px',
                  fontSize: 18,
                  borderRadius: 12,
                  border: 'none',
                  background: '#FF9800',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  minWidth: 220
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#F57C00')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#FF9800')}
              >
                Un mélange de tout
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ------ Completed View ------
  if (gameCompleted) {
    return (
      <>
        <TopBar title="Pratiquer les mots" />
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ textAlign: 'center', padding: 20 }}>
            <h2 style={{ color: '#4CAF50', marginBottom: 20 }}>Félicitations! 🎉</h2>
            <p style={{ fontSize: 18, marginBottom: 10 }}>Vous avez terminé tous les mots!</p>
            <p style={{ fontSize: 16, marginBottom: 20 }}>
              Score: {currentGameWords.length - wrongWords.length}/{currentGameWords.length} corrects —{' '}
              {wrongWords.length} mots à réviser
            </p>

            {wrongWords.length > 0 && (
              <div
                style={{
                  margin: '0 auto 24px',
                  maxWidth: 520,
                  textAlign: 'left',
                  background: '#f7f7f7',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '12px 16px'
                }}
              >
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

            <button
              onClick={() => {
                // Recommencer with the same category (reshuffle inside the hook)
                // We call startGame again with the last selectedCategory
                // The hook still remembers selectedCategory, so we can reuse it safely.
                // If you prefer, you could store it locally before completion.
                const lastCategory = selectedCategory // still available in state here
                if (lastCategory) {
                  startGame(lastCategory)
                } else {
                  // fallback: go back to selection if somehow missing
                  resetAll()
                }
              }}
              style={{
                padding: '12px 24px',
                fontSize: 16,
                borderRadius: 8,
                border: 'none',
                background: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                marginRight: '12px'
              }}
            >
              Recommencer
            </button>

            <button
              onClick={() => {
                resetAll()
              }}
              style={{
                padding: '12px 24px',
                fontSize: 16,
                borderRadius: 8,
                border: 'none',
                background: '#4CAF50',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Retour à la sélection
            </button>
          </div>
        </div>
      </>
    )
  }

  // ------ Quiz View ------
  const w = currentGameWords[currentWordIndex] || {}
  const prompt = w.english || ''
  const correctAnswer = w.answer || w.french || ''

  return (
    <>
      <TopBar
        title="Pratiquer les mots"
        onBack={() => {
          resetAll()
          goHome()
        }}
      />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <QuizCard
          index={currentWordIndex}
          total={currentGameWords.length}
          prompt={prompt}
          placeholder="Traduisez en français..."
          value={userAnswer}
          onChange={setUserAnswer}
          onEnter={checkAnswer}
          feedback={feedback}
        />

        {showWrongBox && (
          <WrongBox
            wrongAnswer={lastWrongAnswer}
            correctAnswer={correctAnswer}
            onNext={() => {
              setShowWrongBox(false)
              nextOrFinish()
            }}
          />
        )}
      </div>
    </>
  )
}

/* ----------------- helpers ----------------- */

function btnStyle(bg, hoverBg, darkText = false) {
  return {
    padding: '16px 24px',
    fontSize: 18,
    borderRadius: 12,
    border: 'none',
    background: bg,
    color: darkText ? '#333' : 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
}

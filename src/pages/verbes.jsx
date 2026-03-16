// pages/Verbes.jsx
import TopBar from '../components/TopBar'
import QuizCard from '../components/QuizCard'
import WrongBox from '../components/WrongBox'
import GrammarDropdown from '../components/GrammarDropdown'
import useQuizGame from '../hooks/useQuizGame'

export default function Verbes({ goHome }) {
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

  const rightSlot = selectedCategory ? renderGrammarFor(selectedCategory) : null

  // ------ Selection View ------
  if (!selectedCategory && !gameCompleted) {
    return (
      <>
        <TopBar title="Pratiquer les verbes" onBack={goHome} />
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
                onClick={() => startGame('verbes')}
                style={btnStyle('#4CAF50', '#43A047')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#43A047')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#4CAF50')}
              >
                Les verbes les plus courants
              </button>

              <button
                onClick={() => startGame('vandertramp')}
                style={btnStyle('#2196F3', '#1E88E5')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1E88E5')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#2196F3')}
              >
                Dr. &amp; Mrs. Vandertramp
              </button>

              <button
                onClick={() => startGame('passeComposé')}
                style={btnStyle('#009688', '#00897B')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#00897B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#009688')}
              >
                Passé composé
              </button>

              <button
                onClick={() => startGame('imparfait')}
                style={btnStyle('#795548', '#6D4C41')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#6D4C41')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#795548')}
              >
                Imparfait
              </button>

              <button
                onClick={() => startGame('futurSimple')}
                style={btnStyle('#3F51B5', '#3949AB')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#3949AB')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#3F51B5')}
              >
                Futur Simple
              </button>

              <button
                onClick={() => startGame('futurProche')}
                style={btnStyle('#9C27B0', '#8E24AA')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#8E24AA')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#9C27B0')}
              >
                Futur Proche
              </button>

              <button
                onClick={() => startGame('present')}
                style={btnStyle('#FF5722', '#E64A19')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#E64A19')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#FF5722')}
              >
                Present
              </button>

              <button
                onClick={() => startGame('pronominaux')}
                style={btnStyle('#8D6E63', '#795548')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#795548')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#8D6E63')}
              >
                Les verbes pronominaux
              </button>

              <button
                onClick={() => startGame('imperatif')}
                style={btnStyle('#4CAF50', '#45A049')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#45A049')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#4CAF50')}
              >
                L&apos;impératif
              </button>
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                onClick={() => startGame('mixVerbes')}
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
                Un mélange de verbes
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
        <TopBar title="Pratiquer les verbes" />
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

            <button
              onClick={() => {
                const lastCategory = selectedCategory
                if (lastCategory) {
                  startGame(lastCategory)
                } else {
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
  const prompt = w.english || '' // verbs: show English prompt to translate to French
  const correctAnswer = w.answer || w.french || ''

  return (
    <>
      <TopBar
        title="Pratiquer les verbes"
        onBack={() => {
          resetAll()
          goHome()
        }}
        rightSlot={rightSlot}
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

/**
 * Returns a <GrammarDropdown> with the appropriate content for the selected category
 * or null if no dropdown is needed.
 */
function renderGrammarFor(category) {
  switch (category) {
    case 'passeComposé':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Passé composé</div>
            <div style={{ marginBottom: 12 }}>
              Passé composé is used to describe completed actions or events that happened once in the past.
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>1.</strong> Auxiliary verb (&quot;avoir&quot; or &quot;être&quot;) conjugated in the present tense
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>2.</strong> Past participle of the main verb
            </div>
            <div style={{ marginLeft: 16, marginBottom: 12 }}>
              <div>• er verbs → -é</div>
              <div>• ir verbs → -i</div>
              <div>• re verbs → -u</div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <strong>Irregular verbs when using &quot;avoir&quot; as auxiliary:</strong>
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
              <div>
                Some verbs use &quot;être&quot;, especially for verbs of movement or change of state (Vandertramp).{' '}
                <strong>All reflexive verbs</strong> (se lever, se laver, se promener…) use être.
              </div>
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'futurProche':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Futur proche</div>
            <div style={{ marginBottom: 12 }}>
              <strong>Use:</strong> To talk about actions that are going to happen soon (equivalent to &quot;I&apos;m going to
              [verb]&quot;).
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
        </GrammarDropdown>
      )
    case 'futurSimple':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Futur simple</div>
            <div style={{ marginBottom: 12 }}>
              <strong>Use:</strong> To express actions that will happen in the future (&quot;I will [verb]&quot;).
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
              <div>⚠ Only two syllables in futur simple.</div>
              <div>préparerai → prépare-rai ✅ (not prépare-re-ai ❌)</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>📌 Regular Verbs</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>1️⃣ –ER verbs</strong></div>
              <div>→ infinitive + endings (parler → je parlerai)</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>2️⃣ –IR verbs</strong></div>
              <div>→ infinitive + endings (finir → je finirai)</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 12 }}>
              <div><strong>3️⃣ –RE verbs</strong></div>
              <div>→ remove final -e, then add endings (vendre → je vendrai)</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>📌 Irregular Future Stems</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 4 }}>
              <div><strong>Verb</strong>  <strong>Stem</strong>  <strong>Example (je)</strong></div>
              <div>aller  ir-  j&apos;irai</div>
              <div>avoir  aur-  j&apos;aurai</div>
              <div>être  ser-  je serai</div>
              <div>faire  fer-  je ferai</div>
              <div>pouvoir  pourr-  je pourrai</div>
              <div>savoir  saur-  je saurai</div>
              <div>venir  viendr-  je viendrai</div>
              <div>voir  verr-  je verrai</div>
              <div>vouloir  voudr-  je voudrai</div>
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'imparfait':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>L&apos;imparfait</div>
            <div style={{ marginBottom: 12 }}>
              <strong>Use:</strong> background actions, ongoing past actions, habits, or states in the past.
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>👉 English equivalents:</strong> I was doing, I used to do, It was...
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Main Uses:</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>🕰 Ongoing actions</strong> → Je lisais un livre</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>🔁 Habitual actions</strong> → On allait à la plage chaque été</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 12 }}>
              <div><strong>🌦 Descriptions / background</strong> → Il faisait beau</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>📌 Formation</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>1️⃣</strong> Take &quot;nous&quot; form in present</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8 }}>
              <div><strong>2️⃣</strong> Remove -ons</div>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 12 }}>
              <div><strong>3️⃣</strong> Add endings: je -ais, tu -ais, il -ait, nous -ions, vous -iez, ils -aient</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>📌 Irregular Verb: Être</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 12 }}>
              <div>j&apos;étais, tu étais, il/elle/on était, nous étions, vous étiez, ils/elles étaient</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>💡 Tip:</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 4 }}>
              L&apos;imparfait often pairs with passé composé (background vs punctual actions).
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'vandertramp':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Dr. &amp; Mrs. Vandertramp</div>
            <div style={{ marginBottom: 12 }}>
              <strong>Most verbs in passé composé use avoir</strong> → J&apos;ai mangé
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Vandertramp verbs use être</strong> → Je suis allé(e)
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>With être, the past participle agrees with the subject:</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 4 }}>
              <div>Je suis allé ✅ (masc.)</div>
              <div>Je suis allée ✅ (fem.)</div>
              <div>Nous sommes allés ✅ (masc./mixed plural)</div>
              <div>Nous sommes allées ✅ (fem. plural)</div>
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'present':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}>
              📌 🇫🇷 Present Tense — Regular Verb Endings
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#E91E63' }}>-ER verbs</div>
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
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#2196F3' }}>-IR verbs</div>
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
              <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#4CAF50' }}>-RE verbs</div>
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

            <div
              style={{
                marginBottom: 8,
                padding: '8px',
                background: '#fff3e0',
                borderRadius: 4,
                border: '1px solid #ffcc02'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 13 }}>💡 Special Note: Falloir</div>
              <div style={{ fontSize: 12, lineHeight: 1.4 }}>
                <strong>Falloir</strong> – used only in 3rd person singular to express necessity.
              </div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                Example: Il faut étudier (It&apos;s necessary to study)
              </div>
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'pronominaux':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}>
              🔄 Reflexive Verbs (Verbes Pronominaux)
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Definition:</strong> the subject and object are the same person (action on oneself).
            </div>

            <div style={{ marginBottom: 12 }}>
              <strong>Note:</strong> Some verbs use object pronouns but aren&apos;t reflexive (e.g., &quot;Il m&apos;appelle&quot; = He calls me).
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
              <strong>Infinitive:</strong> se + [infinitive verb] (e.g., se laver)
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Conjugation:</strong> Present tense + reflexive pronoun
            </div>
            <div style={{ marginLeft: 16, marginBottom: 4, fontSize: 13 }}>
              <div>Je me lave • Tu te laves • Il se lave</div>
            </div>
          </div>
        </GrammarDropdown>
      )
    case 'imperatif':
      return (
        <GrammarDropdown>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#333', paddingBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}>⚡ L&apos;Impératif</div>

            <div style={{ marginBottom: 8 }}>
              <strong>📝 Three Forms (no subject pronouns):</strong>
            </div>
            <div style={{ marginLeft: 16, marginBottom: 8, fontSize: 13 }}>
              <div><strong>Tu</strong> - informal singular (Parle!)</div>
              <div><strong>Nous</strong> - inclusive &quot;let&apos;s&quot; (Parlons!)</div>
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
              <div><strong>Affirmative:</strong> after verb with hyphen — Donne-moi! / Montrez-nous!</div>
              <div><strong>Negative:</strong> before verb — Ne me parle pas!</div>
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
        </GrammarDropdown>
      )
    default:
      return null
  }
}

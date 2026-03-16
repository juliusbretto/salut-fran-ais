// pages/Grammaire.jsx
import { useState } from 'react'
import TopBar from '../components/TopBar'
import GrammarDropdown from '../components/GrammarDropdown'

export default function Grammaire({ goHome }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  // ------ Selection View ------
  if (!selectedTopic) {
    return (
      <>
        <TopBar title="Grammaire" onBack={goHome} />
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
            <h2 style={{ marginBottom: 24, color: '#333' }}>Quelle règle voulez-vous réviser ?</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 16,
                width: '100%'
              }}
            >
              <button
                onClick={() => setSelectedTopic('articles')}
                style={btnStyle('#4CAF50', '#43A047')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#43A047')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#4CAF50')}
              >
                Les articles
              </button>

              <button
                onClick={() => setSelectedTopic('adjectifs')}
                style={btnStyle('#2196F3', '#1E88E5')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1E88E5')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#2196F3')}
              >
                Les adjectifs
              </button>

              <button
                onClick={() => setSelectedTopic('negation')}
                style={btnStyle('#FF5722', '#E64A19')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#E64A19')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#FF5722')}
              >
                La négation
              </button>

              <button
                onClick={() => setSelectedTopic('pronoms')}
                style={btnStyle('#9C27B0', '#8E24AA')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#8E24AA')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#9C27B0')}
              >
                Les pronoms
              </button>

              <button
                onClick={() => setSelectedTopic('questions')}
                style={btnStyle('#009688', '#00897B')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#00897B')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#009688')}
              >
                Les questions
              </button>

              <button
                onClick={() => setSelectedTopic('prepositions')}
                style={btnStyle('#795548', '#6D4C41')}
                onMouseOver={(e) => (e.currentTarget.style.background = '#6D4C41')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#795548')}
              >
                Les prépositions
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // ------ Topic View ------
  const explanation = renderGrammar(selectedTopic)

  return (
    <>
      <TopBar title="Grammaire" onBack={() => setSelectedTopic(null)} />
      <div
        style={{
          padding: '20px',
          maxWidth: 800,
          margin: '0 auto',
          marginTop: 20
        }}
      >
        {explanation}
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

function renderGrammar(topic) {
  switch (topic) {
    case 'articles':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>📌 Les articles</h2>
            <p>
              En français, les noms sont presque toujours accompagnés d’un article qui indique leur genre et leur nombre.
            </p>
            <h3 style={subtitleStyle}>Articles définis</h3>
            <ul>
              <li>le — masculin singulier</li>
              <li>la — féminin singulier</li>
              <li>l’ — devant voyelle ou h muet</li>
              <li>les — pluriel</li>
            </ul>
            <h3 style={subtitleStyle}>Articles indéfinis</h3>
            <ul>
              <li>un — masculin singulier</li>
              <li>une — féminin singulier</li>
              <li>des — pluriel</li>
            </ul>
            <h3 style={subtitleStyle}>Articles partitifs</h3>
            <ul>
              <li>du — masculin singulier</li>
              <li>de la — féminin singulier</li>
              <li>de l’ — devant voyelle</li>
              <li>des — pluriel</li>
            </ul>
          </div>
        </GrammarDropdown>
      )
    case 'adjectifs':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>🎨 Les adjectifs</h2>
            <p>
              Les adjectifs s’accordent en genre et en nombre avec le nom qu’ils décrivent.
            </p>
            <ul>
              <li>masculin singulier — petit</li>
              <li>féminin singulier — petite</li>
              <li>masculin pluriel — petits</li>
              <li>féminin pluriel — petites</li>
            </ul>
            <p>
              La plupart se placent après le nom, sauf quelques adjectifs courts et fréquents (beau, grand, bon…).
            </p>
          </div>
        </GrammarDropdown>
      )
    case 'negation':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>🚫 La négation</h2>
            <p>
              Pour nier une phrase, on encadre le verbe avec <strong>ne</strong> et <strong>pas</strong>.
            </p>
            <div style={exampleBox}>
              Je mange → Je <strong>ne</strong> mange <strong>pas</strong>.
            </div>
            <p>
              D’autres formes existent :
            </p>
            <ul>
              <li>ne… jamais — never</li>
              <li>ne… plus — no longer</li>
              <li>ne… rien — nothing</li>
              <li>ne… personne — no one</li>
            </ul>
          </div>
        </GrammarDropdown>
      )
    case 'pronoms':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>🙋 Les pronoms personnels</h2>
            <ul>
              <li>je — I</li>
              <li>tu — you (informal)</li>
              <li>il/elle/on — he/she/one</li>
              <li>nous — we</li>
              <li>vous — you (formal or plural)</li>
              <li>ils/elles — they (masc./fem.)</li>
            </ul>
            <h3 style={subtitleStyle}>Pronoms objets directs</h3>
            <ul>
              <li>me / m’</li>
              <li>te / t’</li>
              <li>le / la / l’</li>
              <li>nous</li>
              <li>vous</li>
              <li>les</li>
            </ul>
          </div>
        </GrammarDropdown>
      )
    case 'questions':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>❓ Poser des questions</h2>
            <p>Trois façons principales :</p>
            <ul>
              <li>Intonation : Tu viens ?</li>
              <li>Est-ce que : Est-ce que tu viens ?</li>
              <li>Inversion : Viens-tu ?</li>
            </ul>
            <h3 style={subtitleStyle}>Mots interrogatifs</h3>
            <ul>
              <li>où — where</li>
              <li>quand — when</li>
              <li>comment — how</li>
              <li>pourquoi — why</li>
              <li>combien — how many/much</li>
              <li>quel/le/s — which</li>
            </ul>
          </div>
        </GrammarDropdown>
      )
    case 'prepositions':
      return (
        <GrammarDropdown>
          <div style={sectionStyle}>
            <h2 style={titleStyle}>📍 Les prépositions</h2>
            <h3 style={subtitleStyle}>Prépositions de lieu</h3>
            <ul>
              <li>à — to / at / in</li>
              <li>dans — in (inside)</li>
              <li>sur — on</li>
              <li>sous — under</li>
              <li>devant — in front of</li>
              <li>derrière — behind</li>
            </ul>
            <h3 style={subtitleStyle}>Prépositions de temps</h3>
            <ul>
              <li>en — in (months, seasons, years)</li>
              <li>à — at (hours), in (spring)</li>
              <li>pendant — during</li>
              <li>depuis — since</li>
              <li>avant — before</li>
              <li>après — after</li>
            </ul>
          </div>
        </GrammarDropdown>
      )
    default:
      return null
  }
}

/* ------------- styles for sections ------------- */
const sectionStyle = {
  fontSize: 15,
  lineHeight: 1.6,
  color: '#333'
}

const titleStyle = {
  fontSize: 20,
  marginBottom: 12,
  fontWeight: 'bold'
}

const subtitleStyle = {
  fontSize: 16,
  marginTop: 12,
  marginBottom: 4,
  fontWeight: 'bold'
}

const exampleBox = {
  background: '#f1f1f1',
  padding: '8px 12px',
  borderRadius: 6,
  margin: '8px 0'
}

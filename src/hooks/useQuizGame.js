import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, CATEGORY_MODE } from '../lib/categories'
import { pickShuffled } from '../lib/shuffle'

export default function useQuizGame() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentGameWords, setCurrentGameWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false, show: false })
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showWrongBox, setShowWrongBox] = useState(false)
  const [lastWrongAnswer, setLastWrongAnswer] = useState('')
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongWords, setWrongWords] = useState([])

  const displayMode = useMemo(
    () => (selectedCategory && CATEGORY_MODE[selectedCategory]) || CATEGORY_MODE.default,
    [selectedCategory]
  )

  function startGame(category) {
    setSelectedCategory(category)
    const list = CATEGORIES[category] || []
    setCurrentGameWords(pickShuffled(list))
    setCurrentWordIndex(0)
    setUserAnswer('')
    setFeedback({ message: '', isCorrect: false, show: false })
    setGameCompleted(false)
    setShowWrongBox(false)
    setLastWrongAnswer('')
    setIncorrectCount(0)
    setCorrectCount(0)
    setWrongWords([])
  }

  function resetAll() {
    setSelectedCategory(null)
    setCurrentGameWords([])
    setCurrentWordIndex(0)
    setUserAnswer('')
    setFeedback({ message: '', isCorrect: false, show: false })
    setGameCompleted(false)
    setShowWrongBox(false)
    setLastWrongAnswer('')
    setIncorrectCount(0)
    setCorrectCount(0)
    setWrongWords([])
  }

  function nextOrFinish() {
    if (currentWordIndex >= currentGameWords.length - 1) {
      setGameCompleted(true)
    } else {
      setCurrentWordIndex(i => i + 1)
    }
  }

  function checkAnswer() {
    const currentWord = currentGameWords[currentWordIndex]
    const correctAnswer = currentWord?.answer || currentWord?.french || ''
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase()

    if (isCorrect) {
      setCorrectCount(n => n + 1)
      setFeedback({ message: `"${userAnswer}", c'est correct!`, isCorrect: true, show: true })
      setUserAnswer('')
      // advance shortly so user sees feedback
      setTimeout(() => {
        setFeedback(f => ({ ...f, show: false }))
        nextOrFinish()
      }, 800)
    } else {
      setLastWrongAnswer(userAnswer)
      setShowWrongBox(true)
      setIncorrectCount(n => n + 1)
      setWrongWords(ws => ws.concat(currentWord))
      setUserAnswer('')
    }
  }

  return {
    // state
    selectedCategory, currentGameWords, currentWordIndex, userAnswer, feedback,
    gameCompleted, showWrongBox, lastWrongAnswer, incorrectCount, correctCount,
    wrongWords, displayMode,
    // actions
    setUserAnswer, setShowWrongBox, setFeedback, startGame, resetAll, checkAnswer, nextOrFinish
  }
}

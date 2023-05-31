import { ChangeEvent, FormEvent, useState } from 'react'

import { WelcomeModal } from '../components/WelcomeModal'
import { Header } from '../components/Header'
import { Card } from '../components/Card'

export interface ICard {
  user: string
  description: string
  title: string
  id: number
  date: Date
}

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [cards, setCards] = useState<ICard[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [user, setUser] = useState('')

  function handleCreateCard(event: FormEvent) {
    event.preventDefault()

    setCards([
      ...cards,
      {
        user,
        title: newTitle,
        description: newContent,
        id: Math.random(),
        date: new Date(),
      },
    ])

    setNewTitle('')
    setNewContent('')
  }

  function handleNewTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value)
  }

  function handleNewContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewContent(event.target.value)
  }

  function deleteCard(cardToDelete: object) {
    const cardsWithoutDeletedOne = cards.filter((card) => {
      return card !== cardToDelete
    })
    setCards(cardsWithoutDeletedOne)
  }

  function onCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className=" md:max-w-3xl m-auto relative">
        <Header />
        <main className="p-7 bg-white">
          <form onSubmit={handleCreateCard} className="p-5 border rounded-2xl">
            <h1 className="text-xl font-bold mb-6">What’s on your mind?</h1>

            <label htmlFor="">
              <span>Title</span>
              <input
                type="text"
                className={
                  'border border-[#777777] w-full rounded-lg h-8 p-2 mt-2 mb-6'
                }
                value={newTitle}
                placeholder="Hello world"
                onChange={handleNewTitleChange}
              />
            </label>

            <label htmlFor="">
              <span>Content</span>
              <textarea
                className={
                  'border border-[#777777] w-full rounded-lg h-24 p-2 mt-2  mb-6 placeholder:absolute placeholder:top-2 placeholder:left-3'
                }
                value={newContent}
                onChange={handleNewContentChange}
                placeholder="Content here"
              />
            </label>

            <div className="flex items-center pt-3 justify-end">
              <button
                disabled={newTitle.trim() === '' || newContent.trim() === ''}
                type="submit"
                className=" flex items-center justify-center gap-3 bg-[#7695EC] text-white w-28 h-8 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </form>

          {cards.map((card) => {
            return (
              <Card
                key={card.title}
                content={card}
                onDeleteCard={deleteCard}
                setCards={setCards}
              />
            )
          })}
        </main>
        <WelcomeModal
          onCloseModal={onCloseModal}
          isModalOpen={isModalOpen}
          setUser={setUser}
        />
      </div>
    </>
  )
}

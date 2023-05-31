import Trash from '../assets/trash.svg'
import Edit from '../assets/edit.svg'
import { DeleteModal } from './DeleteModal'
import { Dispatch, SetStateAction, useState } from 'react'
import { EditModal } from './EditModal'
import { ICard } from '../pages/Home'
import { formatDistanceToNow } from 'date-fns'

interface CardProps {
  content: ICard
  onDeleteCard: (cardToDelete: object) => void
  setCards: Dispatch<SetStateAction<ICard[]>>
}
export function Card({ content, onDeleteCard, setCards }: CardProps) {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isModalOpenCardEdit, setIsModalOpenCardEdit] = useState(false)

  function onCloseModalDelete() {
    setIsModalOpenDelete(false)
  }

  function onCloseModalEditCard() {
    setIsModalOpenCardEdit(false)
  }

  function onOpenModalDelete() {
    setIsModalOpenDelete(true)
  }

  function onOpenModalEditCard() {
    setIsModalOpenCardEdit(true)
  }

  function handleDeleteCard() {
    onDeleteCard(content)
  }

  function handleEditCard(content: ICard) {
    setCards((state) => {
      return state.map((card) => {
        if (card.id === content.id) {
          return {
            ...card,
            description: content.description,
            title: content.title,
            date: content.date,
          }
        }
        return card
      })
    })
    onCloseModalEditCard()
  }

  return (
    <>
      <div className="mt-6 border rounded-2xl ">
        <header className="flex justify-between rounded-t-2xl items-center bg-[#7695EC] h-20 p-7">
          <h1 className="text-white text-xl font-bold">{content.title}</h1>

          <div className="flex gap-6">
            <button onClick={onOpenModalDelete}>
              <img src={Trash} alt="Your SVG" />
            </button>

            <button onClick={onOpenModalEditCard}>
              <img src={Edit} alt="Your SVG" />
            </button>
          </div>
        </header>
        <div className="p-6 ">
          <div className="flex justify-between mb-4">
            <span className="text-[#777777] font-bold text-lg">
              @{content.user}
            </span>
            <span className="text-[#777777] text-lg">
              {formatDistanceToNow(new Date(content.date), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p>{content.description}</p>
        </div>
      </div>

      <DeleteModal
        isModalOpen={isModalOpenDelete}
        onCloseModal={onCloseModalDelete}
        onDeleteCard={handleDeleteCard}
      />

      <EditModal
        content={content}
        isModalOpen={isModalOpenCardEdit}
        onCloseModal={onCloseModalEditCard}
        onEditCard={handleEditCard}
      />
    </>
  )
}

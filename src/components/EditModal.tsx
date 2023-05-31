import ReactDom from 'react-dom'
import { motion } from 'framer-motion'
import { ChangeEvent, FormEvent, useState } from 'react'
import { modalVariants } from '../variants/modalVariants'
import { overlayVariants } from '../variants/overlayVariants'
import { ICard } from '../pages/Home'

interface BackdropProps {
  isModalOpen: boolean
  onCloseModal: () => void
  onEditCard: (content: ICard) => void
  content: ICard
}

export function EditModal({
  isModalOpen,
  onCloseModal,
  content,
  onEditCard,
}: BackdropProps) {
  const [newTitle, setNewTitle] = useState(content.title)
  const [newContent, setNewContent] = useState(content.description)

  function handleAddToBurger() {
    handleCloseModal()
  }

  function handleCloseModal() {
    onCloseModal()
  }

  function handleCreateCard(event: FormEvent) {
    event.preventDefault()

    const updateCard = {
      user: content.user,
      description: newContent,
      title: newTitle,
      id: content.id,
      date: new Date(),
    }

    onEditCard(updateCard)

    setNewTitle('')
    setNewContent('')
  }

  function handleNewTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value)
  }

  function handleNewContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewContent(event.target.value)
  }

  return ReactDom.createPortal(
    <motion.div
      className="fixed hidden items-center justify-center w-full h-full top-0 left-0 bg-[#343A4050]"
      animate={isModalOpen ? 'show' : 'hidden'}
      variants={overlayVariants}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white max-w-[500px] max-h-screen  w-full m-4 rounded-lg overflow-y-auto "
      >
        <form className="p-4" onSubmit={handleCreateCard}>
          <header className="mb-6">
            <h1 className="text-xl font-bold">Edit item</h1>
          </header>
          <label htmlFor="">
            <span>Title</span>
            <input
              type="text"
              className={
                'border border-[#777777] w-full rounded-lg h-8 p-2 mt-2 mb-6'
              }
              value={newTitle}
              onChange={handleNewTitleChange}
              placeholder="Hello world"
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

          <div className="flex items-center gap-5 pt-3 justify-end">
            <button
              type="button"
              className=" flex items-center justify-center gap-3 text-black font-bold border w-28 h-8 rounded-lg"
              onClick={onCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" flex items-center justify-center gap-3 bg-green-500 font-bold text-white w-28 h-8 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}

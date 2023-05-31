import { motion } from 'framer-motion'

import ReactDom from 'react-dom'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'

import { modalVariants } from '../variants/modalVariants'
import { overlayVariants } from '../variants/overlayVariants'

interface BackdropProps {
  isModalOpen: boolean
  onCloseModal: () => void
  setUser: Dispatch<SetStateAction<string>>
}

export function WelcomeModal({
  isModalOpen,
  onCloseModal,
  setUser,
}: BackdropProps) {
  const [newUser, setNewUser] = useState('')

  function handleCreatedUser(event: FormEvent) {
    event.preventDefault()
    setUser(newUser)
    onCloseModal()
  }

  function handleNewContentChange(event: ChangeEvent<HTMLInputElement>) {
    setNewUser(event.target.value)
  }

  return ReactDom.createPortal(
    <motion.div
      className="fixed hidden items-center justify-center w-full h-full top-0 left-0 bg-[#DDDDDD]"
      animate={isModalOpen ? 'show' : 'hidden'}
      variants={overlayVariants}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white max-w-[500px] max-h-screen  w-full m-4 rounded-lg overflow-y-auto "
      >
        <form className="p-4" onSubmit={handleCreatedUser}>
          <header className="mb-6">
            <h1 className="text-xl font-bold">Welcome to CodeLeap network!</h1>
          </header>
          <label htmlFor="" className="text-base text-black">
            Please enter your username
          </label>
          <input
            type="text"
            className={'border border-[#777777] w-full rounded-lg h-8 p-2 mt-2'}
            placeholder="John doe"
            value={newUser}
            onChange={handleNewContentChange}
          />

          <div className="flex items-center pt-3 justify-end">
            <button className=" flex items-center justify-center gap-3 bg-[#7695EC] text-white w-28 h-8 rounded-lg">
              ENTER
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}

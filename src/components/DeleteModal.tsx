import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingCart, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { BurgerProps, CartContext } from '../contexts/CartContext'
import { formatMoney } from '../utils/formatMoney'
import { modalVariants } from '../variants/modalVariants'
import { overlayVariants } from '../variants/overlayVariants'
import classNames from 'classnames'

interface BackdropProps {
  // data: BurgerProps
  isModalOpen: boolean
  onCloseModal: () => void
  onDeleteCard: () => void
}

export function DeleteModal({
  isModalOpen,
  onCloseModal,
  onDeleteCard,
}: BackdropProps) {
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
        <div className="p-4">
          <header className="mb-6">
            <h1 className="text-xl font-bold">
              Are you sure you want to delete this item?
            </h1>
          </header>

          <div className="flex items-center gap-5 pt-3 justify-end">
            <button
              onClick={onCloseModal}
              className=" flex items-center justify-center gap-3 text-black font-bold border w-28 h-8 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onDeleteCard}
              className=" flex items-center justify-center gap-3 bg-red-500 font-bold text-white w-28 h-8 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root') as any,
  )
}

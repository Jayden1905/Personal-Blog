export const pageTransition = {
  initial: {
    y: 30,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export const focusAnimation = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: 'easeOut'
    }
  },

  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: 'easeOut'
    }
  }
}

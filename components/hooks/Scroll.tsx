import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

function useScroll () {
  const control = useAnimation()
  const [element, view] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  if (view) {
    control.start('show')
  } else {
    control.start('hidden')
  }

  return [element, control]
}

export default useScroll

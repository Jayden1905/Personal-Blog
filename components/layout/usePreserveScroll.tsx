import Router, { NextRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export const useScrollRestoration = (router: NextRouter) => {
  const shouldScrollRestore = useRef(true)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('scrollRestoration' in window.history)
    ) {
      return
    }
    // eslint-disable-next-line no-undef
    let timer: NodeJS.Timeout

    const ua = window.navigator.userAgent.toLowerCase()
    const isMobileSafari = /safari/.test(ua) && /iphone|ipod|ipad/.test(ua)
    window.history.scrollRestoration = isMobileSafari ? 'auto' : 'manual'

    const saveScrollPos = (url: string) => {
      sessionStorage.setItem(
        `scrollPos:${url}`,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      )
    }

    const restoreScrollPos = (url: string) => {
      const json = sessionStorage.getItem(`scrollPos:${url}`)
      const scrollPos = json ? JSON.parse(json) : undefined
      if (scrollPos) {
        window.scrollTo(scrollPos.x, scrollPos.y)
      }
    }

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(router.asPath)
      delete event.returnValue
    }

    const onRouteChangeStart = () => {
      saveScrollPos(router.asPath)
    }

    const triggerRestore = (url: string) => {
      if (shouldScrollRestore.current) {
        timer = setTimeout(() => {
          shouldScrollRestore.current = false
          restoreScrollPos(url)
        }, 10)
      }
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', triggerRestore)
    Router.beforePopState(() => {
      shouldScrollRestore.current = true
      return true
    })

    // initial load (e.g. page refresh)
    if (shouldScrollRestore.current) {
      triggerRestore(router.asPath)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('beforeunload', onBeforeUnload)
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', triggerRestore)
      Router.beforePopState(() => true)
    }
  }, [])
}

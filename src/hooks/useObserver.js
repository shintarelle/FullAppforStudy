import { useEffect, useRef } from "react";

export const useObserver = (ref, canLoad, isLoading, callbck) => {

  const observer = useRef()

    useEffect(() => {
    if (isLoading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    var options = {
      root: document,
    }
    var callback = function (entries, observer) {
      // console.log('entries', entries)
      if (entries[0].isIntersecting && canLoad) {
        // console.log('div in view area')
        callbck()

      }
    };
    observer.current = new IntersectionObserver(callback, options);
    observer.current.observe(ref.current)
  }, [isLoading])
}

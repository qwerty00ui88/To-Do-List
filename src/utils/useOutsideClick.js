import { useRef, useCallback, useEffect } from 'react';

const useOutsideClick = (onClickOutside) => {
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      const inside = ref.current.contains?.(event.target);
      if (ref.current && !inside) {
        onClickOutside();
      }
    },
    [onClickOutside, ref]
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useOutsideClick;

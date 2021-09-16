import { useEffect, MutableRefObject, MouseEvent } from "react";

export const useDropIndicator = (
  ref: MutableRefObject<HTMLElement> | MutableRefObject<null>
) => {
  let positions = null;
  let dropIndicatorPosition = null;
  let dropIndex = null;

  const calculatePositions = () => {
    const thisElement = ref.current as HTMLDivElement | null;
    const childElementsCollection = thisElement?.children;
    const childElements = childElementsCollection
      ? (Array.from(childElementsCollection) as HTMLElement[])
      : null;

    positions = childElements?.reduce(
      (carry, childElement) => {
        const start = childElement.offsetLeft;
        const end = start + childElement.offsetWidth;
        carry.children.push({ start, end });
        return carry;
      },
      {
        start: 0,
        end: thisElement?.offsetWidth ?? 0,
        children: [] as { start: number; end: number }[],
      }
    );
  };

  useEffect(() => {
    calculatePositions();
  }, [calculatePositions]);

  let mouseMove = (event: MouseEvent) => {
      
  };

  return { dropIndicatorPosition, dropIndex, mouseMove };
};

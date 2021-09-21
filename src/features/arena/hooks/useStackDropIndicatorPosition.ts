import {
  MouseEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsInAddingMode } from "../../topbar/topbarSlice";

export const useStackDropIndicatorPosition = (
  stackRef: MutableRefObject<HTMLElement> | MutableRefObject<null>,
  dropIndicatorRef: MutableRefObject<HTMLElement> | MutableRefObject<null>,
  stackType: "hStack" | "vStack"
) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<
    number | null
  >(null);
  let [dropIndex, setDropIndex] = useState<number>(0);
  let childrenPositions = useRef<{ start: number; end: number }[]>([]);

  const updateChildrenPositions = useCallback(() => {
    const dropIndicatorElement = dropIndicatorRef.current as HTMLElement | null;
    const stackElement = stackRef.current as HTMLDivElement | null;
    const childElementsCollection = stackElement?.children;
    const childElements = childElementsCollection
      ? (Array.from(childElementsCollection) as HTMLElement[])
      : null;

    if (!childElements) return [];

    return childElements
      .filter((child) => !child.isSameNode(dropIndicatorElement))
      .reduce((carry, childElement) => {
        const start = childElement.offsetLeft;
        const end = start + childElement.offsetWidth;
        carry.push({ start, end });
        return carry;
      }, [] as { start: number; end: number }[]);
  }, [stackRef, dropIndicatorRef]);

  useEffect(() => {
    childrenPositions.current = updateChildrenPositions();
  }, [updateChildrenPositions, isInAddingMode]);

  const updateDropIndicatorValues = (event: MouseEvent) => {
    let stackElementWidth = stackRef.current?.offsetWidth ?? 0;
    const elementDistanceToLeftEdgeOfScreen =
      stackRef?.current?.getBoundingClientRect().left;
    if (!elementDistanceToLeftEdgeOfScreen) return;
    const mouseDistanceToLeftEdgeOfScreen = event.pageX;
    const mousePositionX =
      mouseDistanceToLeftEdgeOfScreen - elementDistanceToLeftEdgeOfScreen;

    setDropIndex(childrenPositions.current.length);
    if (childrenPositions.current.length > 0) {
      setDropIndicatorPosition(
        ((stackElementWidth +
          childrenPositions.current[childrenPositions.current.length - 1].end) /
          2)
      );
    }

    [...childrenPositions.current].reverse().forEach((childPosition, index) => {
      const centerOfChild = (childPosition.end + childPosition.start) / 2;
      if (mousePositionX < centerOfChild) {
        setDropIndex(childrenPositions.current.length - index - 1);
        const previousChildRightEdgePosition =
          index !== childrenPositions.current.length - 1
            ? [...childrenPositions.current].reverse()[index + 1].end
            : 0;
        setDropIndicatorPosition(
          (previousChildRightEdgePosition + childPosition.start) / 2
        );
      }
    });
  };

  let mouseMove = (event: MouseEvent) => {
    if (isInAddingMode) {
      updateDropIndicatorValues(event);
    }
  };

  return { dropIndicatorPosition, dropIndex, mouseMove };
};

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
  stackType: "hStack" | "vStack" = "hStack",
  stackRef: MutableRefObject<HTMLElement> | MutableRefObject<null>,
  dropIndicatorRef: MutableRefObject<HTMLElement> | MutableRefObject<null>,
  placeholderRef?: MutableRefObject<HTMLElement> | MutableRefObject<null>
) => {
  const isInAddingMode = useAppSelector(selectIsInAddingMode);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<
    number | null
  >(null);
  let [dropIndex, setDropIndex] = useState<number>(0);
  let childrenPositions = useRef<{ start: number; end: number }[]>([]);

  const updateChildrenPositions = useCallback(() => {
    const dropIndicatorElement = dropIndicatorRef.current as HTMLElement | null;
    const placeholderElement = placeholderRef?.current as HTMLElement | null;
    const stackElement = stackRef.current as HTMLDivElement | null;
    const childElementsCollection = stackElement?.children;
    const childElements = childElementsCollection
      ? (Array.from(childElementsCollection) as HTMLElement[])
      : null;

    if (!childElements) return [];

    childrenPositions.current = childElements
      .filter((child) => !child.isSameNode(dropIndicatorElement))
      .filter((child) => !child.isSameNode(placeholderElement))
      .reduce((carry, childElement) => {
        let start =
          stackType === "hStack"
            ? childElement.offsetLeft
            : childElement.offsetTop;
        let end =
          stackType === "hStack"
            ? start + childElement.offsetWidth
            : start + childElement.offsetHeight;
        carry.push({ start, end });
        return carry;
      }, [] as { start: number; end: number }[]);
  }, [stackRef, stackType, dropIndicatorRef, placeholderRef]);

  useEffect(() => {
    updateChildrenPositions();
  }, [updateChildrenPositions]);

  useEffect(() => {
    const stackElement = stackRef.current as HTMLDivElement | null;
    stackElement?.addEventListener("transitionend", updateChildrenPositions);
    return () => {
      stackElement?.removeEventListener(
        "transitionend",
        updateChildrenPositions
      );
    };
  }, [stackRef, updateChildrenPositions]);

  const mousePositionFromStart = (event: MouseEvent) => {
    if (!stackRef?.current) return;

    const elementDistanceToStartOfScreen =
      stackType === "hStack"
        ? stackRef?.current?.getBoundingClientRect().left
        : stackRef?.current?.getBoundingClientRect().top;
    const mouseDistanceToStartOfScreen =
      stackType === "hStack" ? event.pageX : event.pageY;
    return mouseDistanceToStartOfScreen - elementDistanceToStartOfScreen;
  };

  const updateDropIndicatorValues = (event: MouseEvent) => {
    let stackElementSize =
      stackType === "hStack"
        ? stackRef.current?.offsetWidth ?? 0
        : stackRef.current?.offsetHeight ?? 0;

    const mousePosition = mousePositionFromStart(event);

    if (!mousePosition) return;

    setDropIndex(childrenPositions.current.length);
    if (childrenPositions.current.length > 0) {
      const betweenLastChildAndStackEndPosition =
        (stackElementSize +
          childrenPositions.current[childrenPositions.current.length - 1].end) /
        2;
      setDropIndicatorPosition(betweenLastChildAndStackEndPosition);
    }

    [...childrenPositions.current].reverse().forEach((childPosition, index) => {
      const centerOfChild = (childPosition.end + childPosition.start) / 2;
      if (mousePosition < centerOfChild) {
        setDropIndex(childrenPositions.current.length - index - 1);
        const previousChildEndPosition =
          index !== childrenPositions.current.length - 1
            ? [...childrenPositions.current].reverse()[index + 1].end
            : 0;
        setDropIndicatorPosition(
          (previousChildEndPosition + childPosition.start) / 2
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

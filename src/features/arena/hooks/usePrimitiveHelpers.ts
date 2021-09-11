import { MouseEvent } from 'react'
import { CSSProperties } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getCssVariable } from '../../../utils/getCssVariable';
import { Definition, select, selectSelectedId } from "../arenaSlice";

export const usePrimitiveHelpers = (definition: Definition) => {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

  const clickHandler = (event: MouseEvent) => {
    dispatch(select(definition.id));
    event.stopPropagation();
  };

  const ekstraStyles: CSSProperties =
    selectedId === definition.id ? { outline: `1px solid ${getCssVariable('--primary-500')}` } : {};

  return { clickHandler, ekstraStyles };
};

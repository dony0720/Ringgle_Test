import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
// 타입이 지정된 dispatch 훅입니다. 액션을 디스패치할 때 타입 체크를 제공합니다.

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//타입이 지정된 selector 훅입니다. 상태를 선택할 때 자동 완성과 타입 체크를 제공합니다.

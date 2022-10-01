import tw, { styled } from "twin.macro";

export const Btn = styled.button(() => [
  tw`w-full mt-2 text-center px-4 py-3 rounded-xl opacity-90 hover:opacity-100 active:bg-blue-600 transition-opacity duration-150 ease-in-out text-white`,
]);

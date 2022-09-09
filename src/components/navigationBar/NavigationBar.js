import tw, { styled } from "twin.macro";

export const NavigationBar = styled.div(() => [
  tw`mb-4 min-h-full flex flex-row justify-between border-b-2 md:flex-col md:justify-start md:border-b-0 md:border-r-2 border-gray-200`,
]);

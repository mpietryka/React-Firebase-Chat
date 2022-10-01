import tw, { styled } from "twin.macro";

export const Avatar = styled.img(() => [
  tw`mx-auto rounded-full object-cover h-64 w-64 lg:h-72 lg:w-72 mask mask-decagon`,
]);

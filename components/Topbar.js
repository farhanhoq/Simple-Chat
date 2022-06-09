import { Flex, Heading, Avatar } from "@chakra-ui/react";

export default function Topbar({ email }) {
  return (
    <Flex h="81px" w="100%" align="center" p={5} bg="#212f45">
      <Avatar src="" marginEnd={3} />
      <Heading size="xl" color="purple">
        {email}
      </Heading>
    </Flex>
  );
}

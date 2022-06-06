import { ArrowLeftIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";
import { LogoutIcon } from "@heroicons/react/solid";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExist = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter email  of chat recipient");

    if (!input) return null;

    if (!chatExist(input) && input !== user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    } else if (input === user.email) {
      alert("Cannot create a chat room with self");
    } else {
      alert("Chat already exists");
    }
  };

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          color="white"
          p={3}
          align="center"
          _hover={{
            color: "black",
            bgGradient: "linear(to-r, #E0EAFC, #CFDEF3)",
            cursor: "pointer",
          }}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

  return (
    <Flex
      bg="#2a2a2a"
      h="100%"
      w="300px"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        // bg="red.100"
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        p={3}
        bg="#212f45"
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text fontSize="2xl" color="white" fontWeight="extrabold">
            {user.displayName}
          </Text>
        </Flex>

        <IconButton
          size="md"
          isRound
          color="white"
          bg="#212f45"
          _hover={{
            bg: "#151e34ff",
          }}
          icon={<LogoutIcon height="25px" />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Button
        m={5}
        p={4}
        bg="gray.400"
        _hover={{ bgGradient: "linear(to-l, #2193b0,#6dd5ed)" }}
        onClick={() => newChat()}
      >
        New Chat
      </Button>
      <Flex
        overflowX="scroll"
        direction="column"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        flex={1}
      >
        {chatList()}
      </Flex>
    </Flex>
  );
}

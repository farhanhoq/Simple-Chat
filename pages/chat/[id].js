import { Flex, Text } from "@chakra-ui/layout";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, orderBy, query } from "firebase/firestore";
import getOtherEmail from "../../utils/getOtherEmail";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";
import { useRef, useEffect } from "react";
import { auth, db } from "../../firebaseConfig";

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-end" : "flex-start"}
          bgGradient={
            sender
              ? "linear(to-l, #11998e, #38ef7d)"
              : "linear(to-l, #457fca , #5691c8)"
          }
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  return (
    <Flex h="100vh" bg="#2a2a2a">
      <Head>
        <title>Chat with {"Me" && getOtherEmail(chat?.users, user)}</title>
      </Head>

      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}

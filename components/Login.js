import Head from "next/head";
import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { auth } from "../firebaseConfig";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

export default function Login() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <>
      <Head>
        <title>Login - Simple Chat</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center h="100vh">
        <Stack
          align="center"
          bg="gray.600"
          p={16}
          rounded="3xl"
          spacing={12}
          boxShadow="lg"
        >
          <Box
            bgGradient="linear(to-l, #2193b0 , #6dd5ed)"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>

          <Button
            boxShadow="md"
            p={4}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bg="gray.500"
            _hover={{
              color: "black",
              bgGradient: "linear(to-r, #E0EAFC, #CFDEF3)",
            }}
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign In with Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}

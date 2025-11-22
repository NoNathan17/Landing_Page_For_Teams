import React from "react";
import { Box, Image, VStack, Heading, Button } from "@chakra-ui/react";

export default function CoverPage({ onClose }) {
  const [fadeOut, setFadeOut] = React.useState(false);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      zIndex="9999"
      overflow="hidden"
      transition="opacity 0.5s ease"
      opacity={fadeOut ? 0 : 1}
    >
      {/* Background Image */}
      <Image
        src="/cover_page_image.png"
        alt="Cover"
        w="100%"
        h="100%"
        objectFit="cover"
        position="absolute"
        top="0"
        left="0"
      />

      {/* Overlay container */}
      <VStack
        position="relative"
        zIndex="10000"
        spacing={6}
        color="white"
        textAlign="center"
        h="100%"
        justifyContent="center"
      >
        <Heading
          fontSize="4xl"
          textShadow="0 0 12px rgba(0,0,0,0.8)"
        >
          Welcome
        </Heading>

        <Button
          size="lg"
          bg="white"
          color="#083A70"
          fontWeight="bold"
          borderRadius="full"
          px={8}
          py={6}
          _hover={{ bg: "#eef2f7" }}
          onClick={() => {
            setFadeOut(true);
            setTimeout(onClose, 500); // removes component after fade
          }}
        >
          Learn More
        </Button>
      </VStack>
    </Box>
  );
}
import React from "react";
import {
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Badge,
  VStack,
  Box,
} from "@chakra-ui/react";

// Receives title (role name) + members (array)
export default function RoleSection({ title, members }) {
  return (
    <Box w="100%">
      <Heading size="lg" mb={4}>
        {title}
      </Heading>

      <SimpleGrid minChildWidth="250px" spacing={5}>
        {members.map((member) => {
          const baseName = `${member.first_name.toLowerCase()}-${member.last_name.toLowerCase()}`;
          const bgImages = `
            url(/assets/${baseName}.jpg),
            url(/assets/${baseName}.png),
            url(/assets/${baseName}.jpeg)
          `;

          return (
            <Card
              key={member.email}
              bgImage={bgImages}
              bgSize="cover"
              bgPos="center"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              h="420px"
              w="300px"
              position="relative"
            >
              <Box
                as="img"
                src={`/assets/${baseName}.jpg`}
                onError={(e) => {
                  e.target.src = `/assets/${baseName}.png`;
                  e.target.onerror = () =>
                    (e.target.src = `/assets/${baseName}.jpeg`);
                }}
                alt={`${member.first_name} ${member.last_name}`}
                width="100%"
                height="100%"
                objectFit="cover" 
                position="absolute"
                top={0}
                left={0}
              />

              {/* Overlay content on top of the image */}
              <CardHeader position="relative" color="white" zIndex={1}>
                <VStack align="start" spacing={1}>
                  <Heading size="md">
                    {member.first_name} {member.last_name}
                  </Heading>
                  <Badge
                    bg="#8CCD77"
                    color="black"
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {title}
                  </Badge>
                </VStack>
              </CardHeader>

              <Box
                position="absolute"
                inset={0}
                bg="linear-gradient(180deg, rgba(0,0,0,0.2), rgba(0,0,0,0.85))"
                zIndex={0}
              />
            </Card>
          );
        })}

        {members.length === 0 && (
          <Text color="gray.500">No members listed yet.</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}

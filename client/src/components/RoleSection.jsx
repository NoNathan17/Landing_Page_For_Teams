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

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
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
              h="100%"
            >
              <CardHeader>
                <VStack align="start" spacing={1}>
                  <Heading size="md">
                    {member.first_name} {member.last_name}
                  </Heading>
                  <Badge color="#8CCD77" px={2} py={1} borderRadius="md">
                    {title}
                  </Badge>
                </VStack>
              </CardHeader>

              <CardBody>
                {member.pronouns && (
                  <Text color="gray.600">{member.pronouns}</Text>
                )}
                {member.year_of_study && (
                  <Text color="gray.600">{member.year_of_study} year</Text>
                )}
                <Text mt={2} fontSize="sm" color="blue.600">
                  {member.email}
                </Text>
              </CardBody>
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

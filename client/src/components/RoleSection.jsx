//You can customize this component to change how each role section looks.
//Feel free to add more Chakra UI components and styles as needed.
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
  Box
} from "@chakra-ui/react";

//This component receives a title and members as props and displays them in a styled section.
//Work on this component to customize how each role section looks!
export default function RoleSection({ title, members }) {
  return (
    <Box w="100%">
      <Heading size="lg" mb={4}>
        {title}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {members.map((member) => (
          <Card key={member.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <CardHeader>
              <VStack align="start" spacing={2}>
                <Heading size="md">{member.name}</Heading>
                <Badge colorScheme="teal">{member.role}</Badge>
              </VStack>
            </CardHeader>
            <CardBody>
              <Text>{member.bio}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
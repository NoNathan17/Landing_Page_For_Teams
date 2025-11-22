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

export default function RoleSection({ title, members }) {
  return (
    <Box py={6}>
      <Heading size="lg" mb={4}>{title}</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {members.map((m) => (
          <Card key={m.email} variant="outline">
            <CardHeader>
              <VStack align="start" spacing={1}>
                <Heading size="md">
                  {m.first_name} {m.last_name}
                </Heading>
                <Badge colorScheme="purple">{title.slice(0, -1)}</Badge>
              </VStack>
            </CardHeader>
            <CardBody>
              {m.pronouns && <Text>Pronouns: {m.pronouns}</Text>}
              {m.year_of_study && <Text>Year: {m.year_of_study}</Text>}
              <Text color="blue.500" mt={2}>{m.email}</Text>
            </CardBody>
          </Card>
        ))}
        {members.length === 0 && (
          <Text color="gray.500">No members listed yet. Seed Neon!</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}
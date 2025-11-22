import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  Divider
} from "@chakra-ui/react";
import api from "./api";
import RoleSection from "./components/RoleSection";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        // TODO: Change team name to YOUR team in Neon
        const res = await api.get("/team/your-team-name");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching team:", err);
      }
    }
    loadTeam();
  }, []);

  if (!data) {
    return (
      <Container py={20}>
        <Heading size="md">Loading team data...</Heading>
        <Text mt={2}>Make sure your server is running and your query is correct.</Text>
      </Container>
    );
  }

  const { team, roles } = data;

  //Work inside of here, make it the way you want!
  return (
    <Container py={10} maxW="7xl">
      <VStack spacing={6} align="start" mb={10}>
        <Heading>{team.name}</Heading>
        <Text fontSize="lg">{team.description}</Text>
        <Button
          as="a"
          href={team.link}
          colorScheme="teal"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Team Page
        </Button>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {roles.map((role) => (
          <RoleSection key={role.name} role={role} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
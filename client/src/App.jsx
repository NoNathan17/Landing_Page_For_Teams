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
        const res = await api.get("/team/Team%20Polaris");
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
        <Text mt={2}>Make sure your server is running and Neon is seeded.</Text>
      </Container>
    );
  }

  const { team, roles } = data;

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="6xl" py={12}>
        {/* HERO */}
        <VStack spacing={4} align="start" py={10}>
          <Heading size="2xl">{team.team_name}</Heading>
          <Text fontSize="lg" color="gray.600">
            {team.description}
          </Text>
          <Button colorScheme="purple">Join Us</Button>
        </VStack>

        <Divider my={8} />

        {/* ABOUT */}
        <VStack align="start" spacing={3} py={6}>
          <Heading size="lg">About Us</Heading>
          <Card w="full">
            <CardBody>
              {/* TODO: Add 2-4 sentences about your team mission */}
              <Text>
                We are a student team focused on building impactful software.
                Add your real mission here.
              </Text>
            </CardBody>
          </Card>
        </VStack>

        {/* PROJECT + GOALS */}
        <VStack align="start" spacing={3} py={6}>
          <Heading size="lg">Project & Goals</Heading>
          <Text>
            {/* TODO: Explain what your team is building in 2–3 sentences */}
            Our project aims to solve a real problem for our community.
          </Text>
          <List spacing={2} pl={4} styleType="disc">
            {/* TODO: List 3 team goals */}
            <ListItem>Ship a working MVP</ListItem>
            <ListItem>Design a clean user experience</ListItem>
            <ListItem>Support our users with documentation</ListItem>
          </List>
        </VStack>

        <Divider my={8} />

        {/* ROLE SECTIONS */}
        <RoleSection title="Tech Leads" members={roles["Tech Lead"] || []} />
        <RoleSection title="Designers" members={roles["Designer"] || []} />
        <RoleSection title="Developers" members={roles["Developer"] || []} />

        {/* FOOTER */}
        <Divider my={8} />
        <Text color="gray.500" fontSize="sm" py={6}>
          © {new Date().getFullYear()} {team.team_name}. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
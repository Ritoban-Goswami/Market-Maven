"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

interface CardProps {
  categoryImageURL: string;
  categoryName: string;
  href: string;
}

const data = {
  categoryImageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
};

const Card = ({ categoryImageURL, categoryName, href }: CardProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      maxW="3xs"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      as="a"
      href={href}
    >
      <Image
        src={categoryImageURL}
        alt={`Picture of ${categoryName}`}
        roundedTop="lg"
      />

      <Box
        p="3"
        fontSize="md"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {categoryName}
      </Box>
    </Box>
  );
};

export default function Categories() {
  return (
    <Box p={4} my={9}>
      <Stack spacing={4} as={Container} maxW={"7xl"}>
        <Heading
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight={"bold"}
          mb={9}
        >
          Shop By Our Categories
        </Heading>

        <Flex flexWrap="wrap" gridGap={6}>
          <Card
            categoryImageURL={data.categoryImageURL}
            categoryName={data.name}
            href={"#"}
          />
          <Card
            categoryImageURL={data.categoryImageURL}
            categoryName={data.name}
            href={"#"}
          />
          <Card
            categoryImageURL={data.categoryImageURL}
            categoryName={data.name}
            href={"#"}
          />
          <Card
            categoryImageURL={data.categoryImageURL}
            categoryName={data.name}
            href={"#"}
          />
          <Card
            categoryImageURL={data.categoryImageURL}
            categoryName={data.name}
            href={"#"}
          />
        </Flex>
      </Stack>
    </Box>
  );
}

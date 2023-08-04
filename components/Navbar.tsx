"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  FormControl,
  Input,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import headerLogo from "@/public/headerLogo.png";
import Image from "next/image";
import { Icon as ChakraIcons } from "@chakra-ui/react";
import { BsCart4 } from "react-icons/bs";
import { FormEvent, ChangeEvent, useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";

export default function Nav() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image src={headerLogo} alt="Market Maven Logo" width={220} />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            <ChakraIcons as={BsCart4} boxSize="1.5rem" />
          </Button>
          {/* <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button> */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"initial" | "submitting" | "success">(
    "initial"
  );
  const [error, setError] = useState(false);

  return (
    <Stack direction={"row"} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
      <Stack
        direction={{ base: "column", md: "row" }}
        as={"form"}
        spacing={"12px"}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setError(false);
          setState("submitting");

          // remove this code and implement your submit logic right here
          setTimeout(() => {
            if (email === "fail@example.com") {
              setError(true);
              setState("initial");
              return;
            }

            setState("success");
          }, 1000);
        }}
      >
        {/* <FormControl>
          <Input
            variant={"solid"}
            borderWidth={1}
            color={"gray.800"}
            _placeholder={{
              color: "gray.400",
            }}
            borderColor={useColorModeValue("gray.300", "gray.700")}
            id={"email"}
            type={"email"}
            required
            placeholder={"Your Email"}
            aria-label={"Your Email"}
            value={email}
            disabled={state !== "initial"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </FormControl>
        <FormControl w={{ base: "100%", md: "40%" }}>
          <Button
            colorScheme={state === "success" ? "green" : "blue"}
            isLoading={state === "submitting"}
            w="100%"
            type={state === "success" ? "button" : "submit"}
          >
            {state === "success" ? <CheckIcon /> : "Submit"}
          </Button>
        </FormControl> */}
      </Stack>
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          {/* <Text fontSize={"sm"}>{subLabel}</Text> */}
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Browse Our Categories",
    children: [
      {
        label: "smartphones",
        subLabel: "Latest models and features",
        href: "#",
      },
      {
        label: "laptops",
        subLabel: "Powerful computing on the go",
        href: "#",
      },
      {
        label: "fragrances",
        subLabel: "Captivating scents for all occasions",
        href: "#",
      },
      {
        label: "skincare",
        subLabel: "Nourish and rejuvenate your skin",
        href: "#",
      },
      {
        label: "groceries",
        subLabel: "Everyday essentials delivered to your door",
        href: "#",
      },
      // {
      //   label: "home-decoration",
      //   subLabel: "Elevate your living spaces",
      //   href: "#",
      // },
      // {
      //   label: "furniture",
      //   subLabel: "Functional and stylish pieces",
      //   href: "#",
      // },
      // {
      //   label: "tops",
      //   subLabel: "Fashionable tops for all occasions",
      //   href: "#",
      // },
      // {
      //   label: "womens-dresses",
      //   subLabel: "Elegant and comfortable dresses",
      //   href: "#",
      // },
      // {
      //   label: "womens-shoes",
      //   subLabel: "Step out in style and comfort",
      //   href: "#",
      // },
      // {
      //   label: "mens-shirts",
      //   subLabel: "Classic and modern shirt designs",
      //   href: "#",
      // },
      // {
      //   label: "mens-shoes",
      //   subLabel: "Quality shoes for men",
      //   href: "#",
      // },
      // {
      //   label: "mens-watches",
      //   subLabel: "Enhance your wrist with precision",
      //   href: "#",
      // },
      // {
      //   label: "womens-watches",
      //   subLabel: "Elegant watches for women",
      //   href: "#",
      // },
      // {
      //   label: "womens-bags",
      //   subLabel: "Stylish and functional bags",
      //   href: "#",
      // },
      // {
      //   label: "womens-jewellery",
      //   subLabel: "Adorn yourself with exquisite jewelry",
      //   href: "#",
      // },
      // {
      //   label: "sunglasses",
      //   subLabel: "Protect your eyes in style",
      //   href: "#",
      // },
      // {
      //   label: "automotive",
      //   subLabel: "Upgrade your vehicle with the latest accessories",
      //   href: "#",
      // },
      // {
      //   label: "motorcycle",
      //   subLabel: "Gear and accessories for motorcycle enthusiasts",
      //   href: "#",
      // },
      // {
      //   label: "lighting",
      //   subLabel: "Illuminate your space with elegance",
      //   href: "#",
      // },
    ],
  },
];

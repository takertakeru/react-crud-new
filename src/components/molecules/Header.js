import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Header() {
  return (
    <Box p="2">
      <h1 className="heading-primary">User Management</h1>
      <InputGroup color="black" w="90" justifyContent="center" m="8">
        <InputLeftElement>
          <Search2Icon />
        </InputLeftElement>
        <Input placeholder="Search Name" />
      </InputGroup>
    </Box>
  );
}

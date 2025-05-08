import React from 'react';
import { Box, Container, Flex, Heading, Link as ChakraLink, Text } from '@chakra-ui/react';
import { Link as RouterLink, LinkProps, To } from 'react-router-dom';
import SearchBar from './search-bar';

interface LayoutProps {
  children: React.ReactNode;
}

// Create a styled version of RouterLink with Chakra UI styles
const StyledRouterLink: React.FC<Omit<LinkProps, 'to'> & { to: To } & { _hover?: any }> = ({ children, to, _hover, ...props }) => (
  <ChakraLink
    as={RouterLink} // Use `as` to cast ChakraLink to RouterLink
    _hover={_hover} // Pass the `_hover` prop for styling
    {...props}
  >
    {children}
  </ChakraLink>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box as="header" bg="teal.500" color="white" py="4" boxShadow="md">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" wrap="wrap" gap="4">
            <Heading as="h1" size="lg">
              <StyledRouterLink to="/" _hover={{ textDecoration: 'none' }}>
                Movie App
              </StyledRouterLink>
            </Heading>
            <Flex gap="4">
              <StyledRouterLink to="/" _hover={{ textDecoration: 'underline' }}>
                Home
              </StyledRouterLink>
              <StyledRouterLink to="/favorites" _hover={{ textDecoration: 'underline' }}>
                Favorites
              </StyledRouterLink>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main" flex="1" py="6">
        <Container maxW="container.xl">
          <Box mb="6" maxW="md" mx="auto">
            <SearchBar />
          </Box>
          {children}
        </Container>
      </Box>

      <Box as="footer" bg="gray.100" py="4" mt="auto">
        <Container maxW="container.xl">
          <Text textAlign="center" color="gray.600">
            © {new Date().getFullYear()} Movie App. All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;